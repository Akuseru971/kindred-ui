import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [pseudo, setPseudo] = useState("");
  const [genre, setGenre] = useState("Man");
  const [role, setRole] = useState("top");
  const [lore, setLore] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
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
        body: JSON.stringify({ pseudo, genre, role }),
      });

      const data = await response.json();
      typeWriterEffect(data.lore);
    } catch {
      setLore("The voices did not answer...");
    }
  }

  function typeWriterEffect(text, i = 0) {
    setLore("");
    function draw() {
      setLore((prev) => prev + text.charAt(i));
      if (i < text.length - 1) setTimeout(() => draw(++i), 25);
      else setLoading(false);
    }
    draw();
  }

  async function generatePreview() {
    setAudioLoading(true);
    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: lore }),
      });

      if (!response.ok) throw new Error("Audio failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    } catch {
      alert("Wolf voice could not be summoned.");
    } finally {
      setAudioLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover z-0"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <audio ref={musicRef} src="/Kindred-theme.mp3" preload="auto" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-serif text-purple-300 mb-6 drop-shadow-lg text-center"
        >
          Kindred's Lore Whisper
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg text-center text-gray-300 mb-6 max-w-xl"
        >
          Enter your summoner name, choose your essence and hear the first whisper...
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Your Summoner Name"
            className="bg-white text-black px-4 py-2 rounded-xl w-72 text-lg shadow-lg focus:outline-none"
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="bg-white text-black px-3 py-2 rounded-xl shadow-lg"
          >
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>
          </select>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-white text-black px-3 py-2 rounded-xl shadow-lg"
          >
            <option value="top">Top</option>
            <option value="mid">Mid</option>
            <option value="jungle">Jungle</option>
            <option value="adc">ADC</option>
            <option value="support">Support</option>
          </select>
        </div>

        <button
          onClick={generateLore}
          disabled={loading || !pseudo.trim()}
          className="bg-purple-600 hover:bg-purple-800 px-6 py-2 rounded-xl text-white font-semibold text-lg shadow-md transition-all"
        >
          {loading ? "Summoning..." : "Whisper"}
        </button>

        <pre className="mt-10 max-w-3xl w-full bg-black/70 p-6 rounded-2xl text-sm sm:text-base text-gray-100 border border-purple-500 whitespace-pre-wrap shadow-xl">
          {lore}
        </pre>

        {lore && !loading && (
          <button
            onClick={generatePreview}
            disabled={audioLoading}
            className="mt-6 bg-white/10 border border-purple-500 px-4 py-2 rounded-xl hover:bg-white/20 transition-all"
          >
            {audioLoading ? "Summoning Wolf’s voice..." : "🔊 Generate Preview Audio"}
          </button>
        )}
        <audio ref={audioRef} className="hidden" />
      </div>
    </div>
  );
}
