import React, { useState } from "react";
import "./App.css";
import KindredImage from "./Kindred.png";

function App() {
  const [pseudo, setPseudo] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [lore, setLore] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOrderButton, setShowOrderButton] = useState(false);

  const handleGenerateLore = async () => {
    if (!pseudo || !gender || !role) return;

    setIsGenerating(true);
    setLore("");
    setShowOrderButton(false);

    try {
      const response = await fetch("https://kindred-generator-server.onrender.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, gender, role }),
      });

      const data = await response.json();
      animateText(data.lore);
    } catch (error) {
      console.error("Error generating lore:", error);
      setIsGenerating(false);
    }
  };

  const animateText = (text) => {
    const container = document.getElementById("lore-text");
    if (!container) return;

    container.innerHTML = "";
    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.setProperty("--delay", `${index * 0.01}s`);
      span.classList.add("lore-char");
      container.appendChild(span);
    });

    setTimeout(() => {
      setShowOrderButton(true);
      setIsGenerating(false);
    }, text.length * 10);
  };

  return (
    <div className="app">
      <div className="background">
        <img src={KindredImage} alt="Kindred" className="background-image" />
      </div>

      <div className="form-container">
        <input
          className="form-input"
          type="text"
          placeholder="Enter your pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <select
          className="form-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select your gender</option>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>
        <select
          className="form-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select your role</option>
          <option value="top">Top</option>
          <option value="mid">Mid</option>
          <option value="jungle">Jungle</option>
          <option value="adc">ADC</option>
          <option value="support">Support</option>
        </select>

        <button className="generate-button" onClick={handleGenerateLore} disabled={isGenerating}>
          {isGenerating ? "Generating..." : "Generate my Lore"}
        </button>

        <div id="lore-text" className="lore-box"></div>

        {showOrderButton && (
          <button className="order-button">Order my Lore video</button>
        )}
      </div>
    </div>
  );
}

export default App;
