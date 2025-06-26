import React, { useState } from "react";
import "./App.css";
import KindredImage from "./Kindred.png";

function App() {
  const [pseudo, setPseudo] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [lore, setLore] = useState("");
  const [showOrderButton, setShowOrderButton] = useState(false);

  const handleGenerate = async () => {
    if (!pseudo || !gender || !role) return alert("Please fill in all fields");

    const prompt = `Structure your response as a dialogue between Lamb and Wolf, using their tone and poetic style.\nThe first sentence is always Wolf saying 'Tell me lamb, who is ${pseudo}?' plus a sentence giving a surname in relation with the lore.\nDon't add the description from the narrator between the lines of the dialogues.\nDon't pay attention to the role itself to create the lore.\nDon't add narrator — when Wolf ends his sentence, it's Lamb's turn.\nI don't want to see any description like 'Wolf asked, eyes twinkling with curiosity beneath the veil of the eternal night.'\nEnd with a cryptic line from Lamb that leaves a sense of mystery.\nThe character is a ${gender.toLowerCase()} who plays ${role.toLowerCase()}.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    setLore(data.choices[0].message.content);
    setShowOrderButton(true);
  };

  return (
    <div className="app">
      <div className="background">
        <img src={KindredImage} alt="Kindred Logo" className="background-image" />
      </div>
      <div className="form-container">
        <input
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="Enter your pseudo"
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
        <button onClick={handleGenerate} className="generate-button">
          Generate My Lore
        </button>
        {lore && (
          <div className="lore-box">
            <pre>{lore}</pre>
            {showOrderButton && (
              <button className="order-button">Order My Lore Video</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
