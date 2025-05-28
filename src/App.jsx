import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactPlayer from "react-player";
import LoadingBar from "./components/LoadingBar";
import "./App.css";

export default function App() {
  const [pseudo, setPseudo] = useState("");
  const [genre, setGenre] = useState("Man");
  const [role, setRole] = useState("mid");
  const [isLoading, setIsLoading] = useState(false);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);
  const audioRef = useRef(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setAudioPreviewUrl(null);

    try {
      const res = await fetch("https://lambandwolf-lore-app.onrender.com/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, genre, role })
      });
      const data = await res.json();
      if (data.audioUrl) setAudioPreviewUrl(data.audioUrl);
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <ReactPlayer
        url="/kindred-bg.mp4"
        playing
        loop
        muted
        width="100%"
        height="100%"
        className="background-video"
      />
      <div className="overlay" />

      <div className="form-container">
        <h1 className="title">Kindred Lore Generator</h1>

        <Label htmlFor="pseudo">Pseudo</Label>
        <Input id="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />

        <Label htmlFor="genre">Genre</Label>
        <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option>Man</option>
          <option>Woman</option>
        </select>

        <Label htmlFor="role">Role</Label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="top">Top</option>
          <option value="jungle">Jungle</option>
          <option value="mid">Mid</option>
          <option value="adc">ADC</option>
          <option value="support">Support</option>
        </select>

        <Button onClick={handleGenerate} disabled={isLoading} className="generate-btn">
          Generate Preview Audio
        </Button>

        {isLoading && <LoadingBar />}

        {audioPreviewUrl && (
          <div className="audio-preview">
            <audio controls ref={audioRef} src={audioPreviewUrl} />
          </div>
        )}
      </div>
    </div>
  );
}
