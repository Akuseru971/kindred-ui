import React, { useState } from "react";
import { Button } from "./components/ui/button";
import LoadingBar from "./components/LoadingBar";
import "./App.css";

const App = () => {
  const [pseudo, setPseudo] = useState("");
  const [role, setRole] = useState("mid");
  const [genre, setGenre] = useState("Man");
  const [loading, setLoading] = useState(false);
  const [lore, setLore] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);

  const generateLore = async () => {
    setLoading(true);
    setAudioUrl("");
    const res = await fetch("https://lambandwolf-lore-app.onrender.com/api/lore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo, role, genre }),
    });

    const data = await res.json();
    setLore(data.lore || "No tale was found.");
    setLoading(false);
  };

  const generatePreview = async () => {
    setPreviewLoading(true);
    setAudioUrl("");

    const res = await fetch("https://lambandwolf-lore-app.onrender.com/api/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo, role, genre }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
    setPreviewLoading(false);
  };

  return (
    <div className="app">
      <video autoPlay muted loop id="bgVideo">
        <source src="/kindred-bg.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <h1 className="title">Kindred Lore Generator</h1>

        <div className="form">
          <input
            type="text"
            placeholder="Enter your summoner name"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />

          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>
          </select>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="top">Top</option>
            <option value="jungle">Jungle</option>
            <option value="mid">Mid</option>
            <option value="adc">ADC</option>
            <option value="support">Support</option>
          </select>

          <div className="buttons">
            <Button onClick={generateLore} disabled={loading}>
              {loading ? "Loading..." : "Generate my story"}
            </Button>

            <Button onClick={generatePreview} disabled={previewLoading}>
              {previewLoading ? "Loading audio..." : "Generate preview audio"}
            </Button>
          </div>
        </div>

        {loading && <LoadingBar />}

        <div className="lore">
          {lore && (
            <pre>
              {lore}
            </pre>
          )}
        </div>

        {audioUrl && (
          <audio controls autoPlay>
            <source src={audioUrl} type="audio/mpeg" />
          </audio>
        )}
      </div>
    </div>
  );
};

export default App;
