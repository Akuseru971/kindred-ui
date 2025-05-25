import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [pseudo, setPseudo] = useState("");
  const [genre, setGenre] = useState("Man");
  const [role, setRole] = useState("mid");
  const [lore, setLore] = useState("");
  const [loading, setLoading] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);
  const audioRef = useRef(null);
  const musicRef = useRef(null);

  async function generateLore() {
    setLoading(true);
    setLore("Summoning Kindred...");
    if (musicRef.current) musicRef.current.play();

    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/lore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pseudo: pseudo || "Unknown",
          genre: genre || "Man",
          role: role || "mid",
        }),
      });
      const data = await response.json();
      typeWriterEffect(data.lore || "No tale was found...");
    } catch (err) {
      setLore("The voices did not answer...");
    } finally {
      setLoading(false);
    }
  }

  function typeWriterEffect(text, i = 0) {
    setLore("");
    function draw() {
      setLore((prev) => prev + text.charAt(i));
      if (i < text.length - 1) setTimeout(() => draw(++i), 25);
    }
    draw();
  }

  async function generatePreview() {
    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/preview-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pseudo: pseudo || "Unknown",
          genre: genre || "Man",
          role: role || "mid",
        }),
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
        setPlayingAudio(true);
      }
    } catch (err) {
      setLore("Wolf's voice could not be summoned.");
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white flex flex-col items-center justify-center px-4">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/bg.mp4"
        autoPlay
        muted
        loop
      />
      <audio ref={musicRef} src="/bg.mp3" />
      <div className="relative z-10 w-full max-w-3xl text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-serif text-purple-300 drop-shadow-lg"
        >
          Kindred's Lore Whisper
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg text-gray-300 max-w-xl mx-auto"
        >
          Enter your summoner name, choose your path... and let the tale begin.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Your Summoner Name"
            className="bg-white text-black px-4 py-2 rounded-xl w-64 text-lg shadow-lg focus:outline-none"
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded-xl w-32 text-lg shadow-lg focus:outline-none"
          >
            <option>Man</option>
            <option>Woman</option>
          </select>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded-xl w-32 text-lg shadow-lg focus:outline-none"
          >
            <option>top</option>
            <option>jungle</option>
            <option>mid</option>
            <option>adc</option>
            <option>support</option>
          </select>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={generateLore}
            disabled={loading || !pseudo.trim()}
            className="bg-purple-600 hover:bg-purple-800 px-6 py-2 rounded-xl text-white font-semibold text-lg shadow-md transition-all"
          >
            Whisper
          </button>
          <button
            onClick={generatePreview}
            disabled={!pseudo.trim() || playingAudio}
            className="bg-purple-900 hover:bg-purple-700 px-6 py-2 rounded-xl text-white font-semibold text-lg shadow-md transition-all"
          >
            Generate Preview Audio
          </button>
        </div>

        {loading && (
          <div className="w-full bg-purple-800 rounded-full h-2.5 mt-4">
            <div className="bg-purple-400 h-2.5 rounded-full animate-pulse w-3/4"></div>
          </div>
        )}

        <pre className="mt-10 bg-black/70 p-6 rounded-2xl text-sm sm:text-base text-gray-100 border border-purple-500 whitespace-pre-wrap shadow-xl max-h-[400px] overflow-y-auto">
          {lore}
        </pre>

        <audio ref={audioRef} onEnded={() => setPlayingAudio(false)} />
      </div>
    </div>
  );
}
