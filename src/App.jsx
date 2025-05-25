import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [pseudo, setPseudo] = useState("");
  const [genre, setGenre] = useState("Man");
  const [role, setRole] = useState("mid");
  const [lore, setLore] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const musicRef = useRef(null);

  async function generateLore() {
    setLoading(true);
    setLore("Summoning Kindred...");
    setAudioUrl(null);

    if (musicRef.current) {
      musicRef.current.currentTime = 0;
      musicRef.current.play().catch(() => {});
    }

    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/lore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, genre, role }),
      });

      const data = await response.json();
      if (!data || !data.lore) {
        setLore("Kindred remained silent...");
        setLoading(false);
        return;
      }

      typeWriterEffect(data.lore);
    } catch (err) {
      console.error(err);
      setLore("The voices did not answer...");
      setLoading(false);
    }
  }

  async function generatePreview() {
    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo }),
      });

      const data = await response.json();
      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
      } else {
        alert("Wolf voice could not be summoned.");
      }
    } catch (err) {
      console.error(err);
      alert("Wolf voice could not be summoned.");
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

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-white font-serif overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-3xl w-full flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl text-purple-300 mb-6 drop-shadow-lg text-center"
        >
          Kindred's Lore Whisper
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center text-gray-300 mb-8 max-w-xl"
        >
          Enter your summoner name, and let Lamb and Wolf reveal your tale...
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Your Summoner Name"
            className="bg-white text-black px-4 py-2 rounded-xl w-64 text-lg shadow focus:outline-none"
          />
          <select value={genre} onChange={(e) => setGenre(e.target.value)} className="bg-white text-black px-4 py-2 rounded-xl shadow">
            <option>Man</option>
            <option>Woman</option>
          </select>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="bg-white text-black px-4 py-2 rounded-xl shadow">
            <option>top</option>
            <option>jungle</option>
            <option>mid</option>
            <option>adc</option>
            <option>support</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={generateLore}
            disabled={loading || !pseudo.trim()}
            className="bg-purple-600 hover:bg-purple-800 px-6 py-2 rounded-xl text-white font-semibold text-lg shadow transition-all"
          >
            Whisper
          </button>
          <button
            onClick={generatePreview}
            disabled={!pseudo.trim()}
            className="bg-purple-400 hover:bg-purple-600 px-6 py-2 rounded-xl text-white font-semibold text-lg shadow transition-all"
          >
            Generate Preview Audio
          </button>
        </div>

        {loading && <div className="mt-4 w-1/2 h-2 bg-purple-800 rounded-full animate-pulse" />}

        <pre className="mt-8 bg-black/70 p-6 rounded-xl text-sm sm:text-base text-gray-100 border border-purple-500 whitespace-pre-wrap shadow max-w-3xl w-full">
          {lore}
        </pre>

        {audioUrl && (
          <audio className="mt-6" controls autoPlay>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>

      {/* Music */}
      <audio ref={musicRef} src="/bg.mp3" loop />
    </div>
  );
}
