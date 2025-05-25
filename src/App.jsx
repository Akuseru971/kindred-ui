import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [pseudo, setPseudo] = useState("");
  const [lore, setLore] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateLore() {
    setLoading(true);
    setLore("Summoning Kindred...");
    try {
      const response = await fetch("/api/lore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo }),
      });
      const data = await response.json();
      typeWriterEffect(data.lore);
    } catch (err) {
      setLore("The voices did not answer...");
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center p-8">
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
        Enter your summoner name, and let Lamb and Wolf reveal your tale...
      </motion.p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="Your Summoner Name"
          className="bg-white text-black px-4 py-2 rounded-xl w-72 text-lg shadow-lg focus:outline-none"
        />
        <button
          onClick={generateLore}
          disabled={loading || !pseudo.trim()}
          className="bg-purple-600 hover:bg-purple-800 px-6 py-2 rounded-xl text-white font-semibold text-lg shadow-md transition-all"
        >
          Whisper
        </button>
      </div>

      <pre className="mt-10 max-w-3xl w-full bg-black/70 p-6 rounded-2xl text-sm sm:text-base text-gray-100 border border-purple-500 whitespace-pre-wrap shadow-xl">
        {lore}
      </pre>
    </div>
  );
}
