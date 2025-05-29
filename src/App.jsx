import React, { useState } from "react";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [genre, setGenre] = useState("Man");
  const [role, setRole] = useState("mid");
  const [lore, setLore] = useState("");

  const handleGenerateLore = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://lambandwolf-lore-app.onrender.com/api/lore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, genre, role }),
      });
      const data = await response.json();
      setLore(data.lore);
    } catch (error) {
      console.error("Error generating lore:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/kindred-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="form-container">
        <h1 className="title">Kindred Lore Generator</h1>

        <input
          className="input"
          type="text"
          placeholder="Enter your pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />

        <select className="select" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option>Man</option>
          <option>Woman</option>
        </select>

        <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
          <option>top</option>
          <option>mid</option>
          <option>jungle</option>
          <option>support</option>
          <option>adc</option>
        </select>

        <button className="generate-button" onClick={handleGenerateLore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Generate my lore"}
        </button>

        {lore && <pre className="lore-box">{lore}</pre>}
      </div>
    </div>
  );
}

export default App;
