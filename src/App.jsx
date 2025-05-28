import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./App.css";
import LoadingBar from "./components/LoadingBar";
import { Button } from "./components/Button";

const App = () => {
  const [pseudo, setPseudo] = useState("");
  const [role, setRole] = useState("mid");
  const [gender, setGender] = useState("Man");
  const [loading, setLoading] = useState(false);
  const [lore, setLore] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const generateLore = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://lambandwolf-lore-app.onrender.com/api/lore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, role, genre: gender }),
      });
      const data = await res.json();
      setLore(data.lore);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const generatePreviewAudio = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://lambandwolf-lore-app.onrender.com/api/preview-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: lore }),
      });
      const data = await res.json();
      setAudioUrl(data.audio);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <ReactPlayer
        url="/kindred-bg.mp4"
        playing
        loop
        muted
        width="100%"
        height="100%"
        className="background-video"
      />
      <div className="overlay">
        <h1 className="title">Kindred Lore Generator</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="input"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="input">
          <option value="top">Top</option>
          <option value="jungle">Jungle</option>
          <option value="mid">Mid</option>
          <option value="adc">ADC</option>
          <option value="support">Support</option>
        </select>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="input">
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>
        <Button onClick={generateLore} disabled={loading}>Generate Lore</Button>
        <Button onClick={generatePreviewAudio} disabled={loading || !lore}>Generate Preview Audio</Button>
        {loading && <LoadingBar />}
        <div className="lore-box">
          <pre>{lore}</pre>
        </div>
        {audioUrl && (
          <audio controls src={audioUrl} className="audio-player" />
        )}
      </div>
    </div>
  );
};

export default App;
