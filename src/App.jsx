import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./App.css";

function App() {
  const [pseudo, setPseudo] = useState("");
  const [role, setRole] = useState("mid");
  const [genre, setGenre] = useState("Man");
  const [generatedLore, setGeneratedLore] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    const music = new Audio("/bg.mp3");
    music.loop = true;
    music.volume = 0.5;
    setAudio(music);
  }, []);

  const handleGenerate = async () => {
    if (!pseudo.trim()) return;

    setIsLoading(true);
    setGeneratedLore("");
    try {
      const response = await fetch(
        "https://lambandwolf-lore-app.onrender.com/api/lore",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pseudo, role, genre }),
        }
      );

      const data = await response.json();
      setGeneratedLore(data.lore || "Something went wrong.");
      setIsPlaying(true);
      if (audio) audio.play();
    } catch (error) {
      setGeneratedLore("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviewAudio = async () => {
    if (!generatedLore) return;
    const firstWolfLine = generatedLore
      .split("\n")
      .find((line) => line.startsWith("Wolf:"));
    if (!firstWolfLine) return;

    setPreviewLoading(true);

    try {
      const response = await fetch(
        "https://lambandwolf-lore-app.onrender.com/api/preview",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: firstWolfLine }),
        }
      );

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const preview = new Audio(audioUrl);
      preview.play();
    } catch (err) {
      alert("Wolf voice could not be summoned.");
    } finally {
      setPreviewLoading(false);
    }
  };

  return (
    <div className="App">
      <video autoPlay muted loop id="bg-video">
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <h1>KINDRED LORE</h1>
        <input
          type="text"
          placeholder="Your Summoner Name"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="top">Top</option>
          <option value="jungle">Jungle</option>
          <option value="mid">Mid</option>
          <option value="adc">ADC</option>
          <option value="support">Support</option>
        </select>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>

        <button onClick={handleGenerate} disabled={isLoading}>
          {isLoading ? "Summoning..." : "Generate my lore"}
        </button>

        {generatedLore && (
          <>
            <pre className="lore">{generatedLore}</pre>
            <button
              onClick={handlePreviewAudio}
              disabled={previewLoading || !generatedLore}
              style={{ marginTop: "10px" }}
            >
              {previewLoading ? "Calling Wolf..." : "Generate Preview Audio"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
