import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [pseudo, setPseudo] = useState("");
  const [genre, setGenre] = useState("Man");
  const [role, setRole] = useState("top");
  const [lore, setLore] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [audioReady, setAudioReady] = useState(false);

  const music = new Audio("/Kindred.mp3");
  music.volume = 0.4;

  async function generateLore() {
    setLoading(true);
    setLore("Summoning Kindred...");
    setAudioReady(false);

    music.currentTime = 0;
    music.play();

    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/lore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, genre, role }),
      });

      const data = await response.json();
      setPreview(data.preview);
      typeWriterEffect(data.lore);
      playAudioPreview(data.preview);
    } catch (err) {
      setLore("The voices did not answer...");
    }
  }

  async function playAudioPreview(text) {
    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/preview-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      setAudioReady(true);
    } catch (err) {
      console.error("Audio preview error:", err);
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
    <div className="relative min-h-screen text-white overflow-hidden flex flex-col items-center justify-center p-8">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover z-0"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content */}
      <div className="z-10 w-full max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-serif mb-6 text-purple-300 drop-shadow-lg"
        >
          Kindred's Lore Whisper
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg text-gray-300 mb-8 max-w-xl mx-auto"
        >
          Enter your summoner name, select your path, and let Lamb and Wolf whisper your fate...
        </motion.p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 items-center mb-4">
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Your Summoner Name"
            className="bg-white text-black px-4 py-2 rounded-xl w-72 text-lg shadow-lg focus:outline-none"
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded-xl w-36 text-lg shadow-lg"
          >
            <option>Man</option>
            <option>Woman</option>
          </select>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded-xl w-36 text-lg shadow-lg"
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

        <pre className="mt-6 max-w-3xl w-full bg-black/70 p-6 rounded-2xl text-sm sm:text-base text-gray-100 border border-purple-500 whitespace-pre-wrap shadow-xl mx-auto">
          {lore}
        </pre>

        {/* Generate full audio (preview only for now) */}
        {audioReady && (
          <button
            onClick={() => playAudioPreview(preview)}
            className="mt-6 bg-purple-700 hover:bg-purple-900 px-6 py-2 rounded-xl text-white font-medium text-lg shadow-lg"
          >
            🔊 Generate my audio
          </button>
        )}
      </div>
    </div>
  );
}
