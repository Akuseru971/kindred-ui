import React, { useState } from "react";
import "./App.css";
import KindredImage from "./Kindred.png";

function App() {
  const [pseudo, setPseudo] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [lore, setLore] = useState("");

  const handleSubmit = async () => {
    if (!pseudo || !gender || !role) return;

    try {
      const response = await fetch("https://ton-backend.com/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, gender, role }),
      });

      const data = await response.json();
      setLore(data.lore || "No lore received");
    } catch (error) {
      console.error("Erreur lors de la génération :", error);
      setLore("Une erreur est survenue.");
    }
  };

  return (
    <div className="container">
      <img src={KindredImage} alt="Kindred" className="background-image" />

      <div className="form">
        <input
          type="text"
          placeholder="Enter your pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          className="form-input"
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="form-input"
        >
          <option value="">Select your gender</option>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-input"
        >
          <option value="">Select your role</option>
          <option value="top">Top</option>
          <option value="mid">Mid</option>
          <option value="jungle">Jungle</option>
          <option value="adc">ADC</option>
          <option value="support">Support</option>
        </select>

        <button onClick={handleSubmit} className="submit-button">
          Generate my lore
        </button>

        {lore && <div className="lore-box">{lore}</div>}
      </div>
    </div>
  );
}

export default App;
