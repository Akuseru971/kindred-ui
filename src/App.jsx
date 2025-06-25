import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import OrderPopup from './OrderPopup';

function App() {
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [lore, setLore] = useState('');
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateLore = async () => {
    if (!gender || !role || !pseudo) return;
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/generate-lore', {
        gender,
        role,
        pseudo,
      });
      setLore(response.data.lore);
    } catch (error) {
      console.error('Error generating lore:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderClick = () => {
    setShowOrderPopup(true);
  };

  return (
    <div className="app">
      {/* Fond vidéo */}

<div className="background"></div>


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
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
      />

      <button onClick={handleGenerateLore} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate My Lore'}
      </button>

      {lore && (
        <>
          <button onClick={handleOrderClick} className="order-button">
            Generate my video
          </button>
          <textarea value={lore} readOnly rows={10} />
        </>
      )}

      {showOrderPopup && <OrderPopup onClose={() => setShowOrderPopup(false)} />}
    </div>
  );
}

export default App;
