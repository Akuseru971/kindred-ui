import React, { useState } from 'react';
import './App.css';

function App() {
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [summonerName, setSummonerName] = useState('');
  const [lore, setLore] = useState('');

  const generateLore = async () => {
    if (!summonerName || !role || !gender) return;

    const response = await fetch('https://kindred-api.onrender.com/api/lore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo: summonerName, role, genre: gender }),
    });

    const data = await response.json();
    setLore(data.lore);
  };

  return (
    <div className="app">
      <img src="/Kindred.png" alt="Background" className="background" />
      <h1>Kindred Lore Generator</h1>

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
        placeholder="Enter your summoner name"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
      />

      <button onClick={generateLore}>Generate My Lore</button>

      {lore && <textarea rows="12" readOnly value={lore} />}
    </div>
  );
}

export default App;
