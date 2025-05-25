import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function App() {
  const [pseudo, setPseudo] = useState("");
  const [genre, setGenre] = useState("Man");
  const [role, setRole] = useState("mid");
  const [lore, setLore] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const musicRef = useRef(null);

  async function generateLore() {
    setLoading(true);
    setLore("Summoning Kindred...");
    setAudioUrl(null);
    if (musicRef.current) {
      musicRef.current.currentTime = 0;
      musicRef.current.play();
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
    }
    setLoading(false);
  }

  async function generatePreviewAudio() {
    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/preview-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo }),
      });
      const data = await response.json();
      setAudioUrl(data.audioUrl);
    } catch (err) {
      setLore("Wolf voice could not be summoned");
    }
  }

  function typeWriterEffect(text, i = 0) {
    if (typeof text !== 'string') {
      setLore("The voices did not answer...");
      return;
    }
    setLore("");
    function draw() {
      setLore((prev) => prev + text.charAt(i));
      if (i < text.length - 1) setTimeout(() => draw(++i), 25);
    }
    draw();
  }

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover z-0"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <audio ref={musicRef} src="/bg.mp3" preload="auto" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black/70 p-8">
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
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>
          </select>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded-xl text-lg shadow-lg focus:outline-none"
          >
            <option value="top">Top</option>
            <option value="jungle">Jungle</option>
            <option value="mid">Mid</option>
            <option value="adc">ADC</option>
            <option value="support">Support</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            onClick={generateLore}
            disabled={loading || !pseudo.trim()}
            className="bg-purple-600 hover:bg-purple-800 px-6 py-2 rounded-xl text-white font-semibold text-lg shadow-md transition-all"
          >
            Whisper
          </button>

          {lore && (
            <button
              onClick={generatePreviewAudio}
              className="bg-purple-400 hover:bg-purple-600 px-6 py-2 rounded-xl text-white font-semibold text-lg shadow-md transition-all"
            >
              Generate Preview Audio
            </button>
          )}
        </div>

        <pre className="mt-10 max-w-3xl w-full bg-black/70 p-6 rounded-2xl text-sm sm:text-base text-gray-100 border border-purple-500 whitespace-pre-wrap shadow-xl">
          {lore}
        </pre>

        {audioUrl && (
          <audio ref={audioRef} controls className="mt-4">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
}
