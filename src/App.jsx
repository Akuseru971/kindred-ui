import React, { useState } from 'react';
import './App.css';
const background = '/Kindred.png';

function App() {
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [lore, setLore] = useState('');

  const handleSubmit = async () => {
    if (!gender || !role || !pseudo) return alert('Please fill out all fields.');

    const prompt = `Structure your response as a dialogue between Lamb and Wolf, using their tone and poetic style.
The first sentence is always Wolf saying 'Tell me lamb, who is ${pseudo}?' plus a sentence giving a surname in relation with the lore.
Don't add any narration. Don't pay attention to the role to create the lore.
I don't want any narrator in the dialogue, only Lamb and Wolf.
The response must contain exactly 12 lines of dialogue.`;

    const response = await fetch('https://your-api-endpoint.com/lore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    setLore(data.text);
  };

  return (
    <div className="app">
      <img src={backgroundImage} alt="background" className="background" />

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

      <button onClick={handleSubmit}>Generate My Lore</button>

      {lore && <textarea rows="12" readOnly value={lore} />}
    </div>
  );
}

export default App;
