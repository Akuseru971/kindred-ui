import React, { useState } from "react";
import ReactPlayer from "react-player";

const App = () => {
  const [pseudo, setPseudo] = useState("");
  const [role, setRole] = useState("mid");
  const [genre, setGenre] = useState("Man");
  const [loading, setLoading] = useState(false);
  const [lore, setLore] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleLoreGeneration = async () => {
    setLoading(true);
    setLore("");
    setAudioUrl(null);
    setError(null);

    try {
      const response = await fetch(
        "https://lambandwolf-lore-app.onrender.com/api/lore",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pseudo, role, genre })
        }
      );
      const data = await response.json();
      setLore(data.lore);
    } catch (err) {
      console.error(err);
      setError("Failed to generate lore.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewAudio = async () => {
    setLoading(true);
    setAudioUrl(null);
    setError(null);

    try {
      const response = await fetch(
        "https://lambandwolf-lore-app.onrender.com/api/preview",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pseudo })
        }
      );
      const data = await response.json();
      setAudioUrl(data.audioUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to load preview audio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <ReactPlayer
        url="/kindred-bg.mp4"
        playing
        loop
        muted
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />

      <div className="flex flex-col items-center justify-center h-full text-white bg-black bg-opacity-40 px-4">
        <h1 className="text-3xl font-bold mb-6">Kindred Lore Generator</h1>

        <div className="mb-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Your Summoner Name"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="w-full p-2 rounded text-black"
          />
        </div>

        <div className="flex space-x-4 mb-4">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="p-2 rounded text-black"
          >
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>
          </select>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 rounded text-black"
          >
            <option value="top">Top</option>
            <option value="jungle">Jungle</option>
            <option value="mid">Mid</option>
            <option value="adc">ADC</option>
            <option value="support">Support</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleLoreGeneration}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-800"
          >
            Generate Lore
          </button>
          <button
            onClick={handlePreviewAudio}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-800"
          >
            Generate Preview Audio
          </button>
        </div>

        {loading && <div className="mt-4">Generating... please wait ⏳</div>}
        {error && <div className="mt-4 text-red-400">{error}</div>}

        {lore && (
          <div className="mt-6 max-w-2xl bg-black bg-opacity-60 p-4 rounded shadow-md whitespace-pre-wrap text-sm">
            {lore}
          </div>
        )}

        {audioUrl && (
          <audio controls className="mt-4">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default App;
