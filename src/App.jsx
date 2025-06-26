import React, { useState } from "react";
import backgroundImage from "./Kindred.png";
import "./App.css";

function App() {
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [lore, setLore] = useState("");
  const [animatedLoreHTML, setAnimatedLoreHTML] = useState("");
  const [showOrderButton, setShowOrderButton] = useState(false);

  const handleGenerate = async () => {
    if (!pseudo || !gender || !role) return;
    setLore("");
    setAnimatedLoreHTML("");
    setShowOrderButton(false);
    try {
      const res = await fetch("https://kindred-api.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, gender, role })
      });
      const data = await res.json();
      animateLore(data.lore);
      setShowOrderButton(true);
    } catch (error) {
      console.error("Error generating lore:", error);
    }
  };

  const animateLore = (text) => {
    const chars = text.split("").map((char, i) => (
      `<span class="lore-char" style="--delay:${i * 0.02}s">${char}</span>`
    ));
    setAnimatedLoreHTML(chars.join(""));
  };

  return (
    <div className="app">
      <div className="background">
        <img src={backgroundImage} alt="Background" className="background-image" />
      </div>
      <div className="form-container">
        <input
          className="form-input"
          placeholder="Your name"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <select
          className="form-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" disabled>Choose gender</option>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>
        <select
          className="form-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>Choose role</option>
          <option value="top">Top</option>
          <option value="mid">Mid</option>
          <option value="jungle">Jungle</option>
          <option value="adc">ADC</option>
          <option value="support">Support</option>
        </select>
        <button className="generate-button" onClick={handleGenerate}>
          Generate my lore
        </button>
        <div
          id="lore-box"
          className="lore-box"
          dangerouslySetInnerHTML={{ __html: animatedLoreHTML }}
        ></div>
        {showOrderButton && (
          <button className="order-button">
            Order my Lore video
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
