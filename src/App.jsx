// === App.jsx ===
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [pseudo, setPseudo] = useState("");
  const [genre, setGenre] = useState("Man");
  const [role, setRole] = useState("mid");
  const [lore, setLore] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const audioRef = useRef(null);
  const musicRef = useRef(null);

  async function generateLore() {
    setLoading(true);
    setLore("Summoning Kindred...");
    musicRef.current?.play();
    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/lore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, genre, role }),
      });
      const data = await response.json();
      typeWriterEffect(data.lore);
    } catch (err) {
      setLore("The voices did not answer...");
    } finally {
      setLoading(false);
    }
  }

  async function generatePreview() {
    if (!lore) return;
    const firstLine = lore.split("\n").find(line => line.startsWith("Wolf:"))?.replace("Wolf:", "").trim();
    if (!firstLine) return;

    setAudioLoading(true);
    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: firstLine }),
      });
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    } catch (err) {
      console.error("Preview audio failed", err);
    } finally {
      setAudioLoading(false);
    }
  }

  function typeWriterEffect(text, i = 0) {
    setLore("");
    function draw() {
      setLore(prev => prev + text.charAt(i));
      if (i < text.length - 1) setTimeout(() => draw(++i), 25);
    }
    draw();
  }

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center justify-center px-4">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/bg.mp4"
        autoPlay
        muted
        loop
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="z-20 max-w-3xl w-full flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-serif text-center mb-6 text-purple-300 drop-shadow-lg"
        >
          Kindred's Lore Whisper
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg text-center text-gray-300 mb-8 max-w-xl"
        >
          Enter your summoner name, select your role and gender, and let Kindred speak...
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Your Summoner Name"
            className="bg-white text-black px-4 py-2 rounded-xl w-72 text-lg shadow-lg focus:outline-none"
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded-xl text-lg shadow-lg focus:outline-none"
          >
            <option>Man</option>
            <option>Woman</option>
          </select>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded-xl text-lg shadow-lg focus:outline-none"
          >
            <option>top</option>
            <option>jungle</option>
            <option>mid</option>
            <option>adc</option>
            <option>support</option>
          </select>
          <button
            onClick={generateLore}
            disabled={loading || !pseudo.trim()}
            className="bg-purple-600 hover:bg-purple-800 px-6 py-2 rounded-xl text-white font-semibold text-lg shadow-md transition-all"
          >
            Whisper
          </button>
        </div>

        {loading && (
          <div className="w-full bg-purple-900 h-2 rounded-full overflow-hidden mb-4">
            <div className="bg-purple-400 h-full animate-pulse w-full" />
          </div>
        )}

        <pre className="mt-6 max-w-3xl w-full bg-black/70 p-6 rounded-2xl text-sm sm:text-base text-gray-100 border border-purple-500 whitespace-pre-wrap shadow-xl">
          {lore}
        </pre>

        {lore && (
          <>
            <button
              onClick={generatePreview}
              disabled={audioLoading}
              className="mt-4 px-4 py-2 bg-purple-800 hover:bg-purple-900 text-white rounded-lg transition"
            >
              Generate Preview Audio
            </button>
            <audio ref={audioRef} className="hidden" />
          </>
        )}
      </div>

      <audio ref={musicRef} src="/bg.mp3" loop />
    </div>
  );
}
