import { useState } from "react";
import "./App.css";

function App() {
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [pseudo, setPseudo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gender || !role || !pseudo) return;

    // Your lore generation logic here
    console.log("Generating lore for:", { gender, role, pseudo });
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url("/Kindred.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "30px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          minWidth: "300px",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Kindred Lore Generator</h2>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Gender</option>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
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
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#ffffffcc",
            color: "#000",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Generate My Lore
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  fontSize: "14px",
  outline: "none",
};

export default App;
import { useState } from "react";
import "./App.css";

function App() {
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [pseudo, setPseudo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gender || !role || !pseudo) return;

    // Your lore generation logic here
    console.log("Generating lore for:", { gender, role, pseudo });
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url("/Kindred.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "30px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          minWidth: "300px",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Kindred Lore Generator</h2>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Gender</option>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
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
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#ffffffcc",
            color: "#000",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Generate My Lore
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  fontSize: "14px",
  outline: "none",
};

export default App;
