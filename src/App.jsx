import React, { useState } from "react";
import "./App.css";

function App() {
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [summonerName, setSummonerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ gender, role, summonerName });
  };

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url("/Kindred.png")` }}
    >
      <form onSubmit={handleSubmit}>
        <h2>Kindred Lore Generator</h2>

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="top">Top</option>
          <option value="jungle">Jungle</option>
          <option value="mid">Mid</option>
          <option value="adc">ADC</option>
          <option value="support">Support</option>
        </select>

        <input
          type="text"
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
          placeholder="Enter your summoner name"
        />

        <button type="submit">Generate My Lore</button>
      </form>
    </div>
  );
}

export default App;
