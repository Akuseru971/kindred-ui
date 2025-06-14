import React, { useState } from "react";
import "./App.css";
import OrderPopup from "./OrderPopup"; // Assure-toi d’avoir ce fichier créé

function App() {
  const [pseudo, setPseudo] = useState("");
  const [role, setRole] = useState("");
  const [genre, setGenre] = useState("");
  const [lore, setLore] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  const generateLore = async () => {
    if (!pseudo || !role || !genre) return;
    setLoading(true);
    setLore("");

    try {
      const res = await fetch("https://lambandwolf-lore-app.onrender.com/api/lore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, role, genre }),
      });

      const data = await res.json();
      setLore(data.lore || "No lore received.");
    } catch (error) {
      setLore("An error occurred while generating the lore.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewAudio = async () => {
    if (!pseudo || !role || !genre) return;
    setLoading(true);

    try {
      const res = await fetch("https://lambandwolf-lore-app.onrender.com/api/preview-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, role, genre }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate audio preview");
      }

      const blob = await res.blob();
      const audioUrl = window.URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.play();

      // Quand l'audio est terminé, ouvrir la popup
      audio.onended = () => {
        setShowOrderPopup(true);
      };
    } catch (error) {
      alert("An error occurred while generating the audio preview.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseOrderPopup = () => {
    setShowOrderPopup(false);
  };

  const handleOrder = () => {
    alert("Fonction de paiement à venir ! 🎉");
    setShowOrderPopup(false);
  };

  return (
    <div className="app-container">
      <video autoPlay loop muted className="background-video">
        <source src="/kindred-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <h1 className="title">Kindred Lore Generator</h1>

        <div className="input-group">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="dropdown"
          >
            <option value="">Select Gender</option>
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>
          </select>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="dropdown"
          >
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
            className="input"
          />

          <button onClick={generateLore} disabled={loading} className="button">
            {loading ? "Generating..." : "Generate My Lore"}
          </button>

          <button onClick={handlePreviewAudio} disabled={loading} className="button">
            {loading ? "Loading..." : "Preview Audio"}
          </button>
        </div>

        {showOrderPopup && (
          <OrderPopup onClose={handleCloseOrderPopup} onOrder={handleOrder} />
        )}

        {loading && <div className="loading-bar"></div>}

        <div className="lore-box">
          <pre>{lore}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
