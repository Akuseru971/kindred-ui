import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [pseudo, setPseudo] = useState("");
  const [genre, setGenre] = useState("Man");
  const [role, setRole] = useState("mid");
  const [lore, setLore] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  async function generateLore() {
    setLoading(true);
    setLore("Summoning Kindred...");
    setAudioUrl(null);

    // Joue la musique
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

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

  function typeWriterEffect(text, i = 0) {
    setLore("");
    function draw() {
      setLore((prev) => prev + text.charAt(i));
      if (i < text.length - 1) setTimeout(() => draw(++i), 25);
    }
    draw();
  }

  async function generatePreviewAudio() {
    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/audio-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo }),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      console.error("Preview audio failed", err);
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Vidéo de fond */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Audio de fond */}
      <audio ref={audioRef} src="/kindred-theme.mp3" preload="auto" />

      {/* Contenu */}
      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center">
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
          className="text-lg text-gray-300 mb-8 max-w-xl"
        >
          Enter your summoner name, choose your essence, and let Lamb and Wolf tell your tale...
        </motion.p>

        {/* Formulaire */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Your Summoner Name"
            className="bg-white text-black px-4 py-2 rounded-xl w-64 text-lg shadow-lg focus:outline-none"
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="bg-white text-black px-3 py-2 rounded-xl shadow"
          >
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>
          </select>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-white text-black px-3 py-2 rounded-xl shadow"
          >
            <option value="top">Top</option>
            <option value="jungle">Jungle</option>
            <option value="mid">Mid</option>
            <option value="adc">ADC</option>
            <option value="support">Support</option>
          </select>
          <button
            onClick={generateLore}
            disabled={loading || !pseudo.trim()}
            className="bg-purple-600 hover:bg-purple-800 px-6 py-2 rounded-xl text-white font-semibold text-lg shadow-md transition-all"
          >
            Whisper
          </button>
        </div>

        {/* Barre de chargement */}
        {loading && (
          <div className="w-full h-1 bg-purple-900 mt-2 mb-6 rounded overflow-hidden">
            <motion.div
              className="h-full bg-purple-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* Lore affiché */}
        <pre className="mt-6 max-w-3xl w-full bg-black/70 p-6 rounded-2xl text-sm sm:text-base text-gray-100 border border-purple-500 whitespace-pre-wrap shadow-xl">
          {lore}
        </pre>

        {/* Audio preview */}
        {lore && !loading && (
          <div className="mt-6 flex flex-col items-center gap-2">
            <button
              onClick={generatePreviewAudio}
              className="bg-purple-700 hover:bg-purple-900 px-5 py-2 rounded-xl text-white font-medium shadow-md transition"
            >
              Generate Preview Audio
            </button>
            {audioUrl && (
              <audio controls src={audioUrl} className="mt-2" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
