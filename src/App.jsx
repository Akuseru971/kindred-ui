import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./App.css";

const App = () => {
  const [pseudo, setPseudo] = useState("");
  const [genre, setGenre] = useState("Man");
  const [role, setRole] = useState("top");
  const [lore, setLore] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const handleGenerateLore = async () => {
    setIsLoading(true);
    setLore("");
    setAudioUrl(null);
    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/lore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, genre, role })
      });
      const data = await response.json();
      setLore(data.lore);
    } catch (error) {
      console.error("Error generating lore:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviewAudio = async () => {
    setIsPreviewing(true);
    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/preview-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo })
      });
      const data = await response.json();
      setAudioUrl(data.audioUrl);
    } catch (error) {
      console.error("Error generating preview audio:", error);
    } finally {
      setIsPreviewing(false);
    }
  };

  return (
    <div className="app-container">
      <ReactPlayer
        url="/kindred-bg.mp4"
        playing
        loop
        muted
        width="100%"
        height="100%"
        className="background-video"
      />
      <div className="content">
        <h1 className="title">Kindred Lore Generator</h1>
        <input
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="Enter your pseudo"
          className="input"
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="select">
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="select">
          <option value="top">Top</option>
          <option value="mid">Mid</option>
          <option value="jungle">Jungle</option>
          <option value="adc">ADC</option>
          <option value="support">Support</option>
        </select>
        <button onClick={handleGenerateLore} className="button" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Lore"}
        </button>
        {lore && (
          <>
            <pre className="lore-text">{lore}</pre>
            <button onClick={handlePreviewAudio} className="button preview-button" disabled={isPreviewing}>
              {isPreviewing ? "Loading Preview..." : "Generate Preview Audio"}
            </button>
          </>
        )}
        {audioUrl && <audio controls src={audioUrl} className="audio-player" />}
      </div>
    </div>
  );
};

export default App;
