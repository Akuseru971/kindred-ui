import React, { useState } from 'react';
import './App.css';

function App() {
  const [pseudo, setPseudo] = useState('');
  const [role, setRole] = useState('');
  const [genre, setGenre] = useState('');
  const [lore, setLore] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!pseudo || !role || !genre) return;
    setLoading(true);
    setLore('');
    try {
      const response = await fetch('https://lambandwolf-lore-app.onrender.com/api/lore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo, role, genre })
      });
      const data = await response.json();
      setLore(data.lore);
    } catch (error) {
      setLore('Failed to generate lore.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <video autoPlay loop muted className="background-video">
        <source src="/kindred-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <h1 className="title">Kindred Lore Generator</h1>
        <div className="form">
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
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
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <button onClick={handleGenerate}>Generate My Lore</button>
        </div>
        {loading && <div className="loading-bar"><div className="progress"></div></div>}
        <div className="lore-box">
          <pre>{lore}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
