/* App.css */
body, html, #root, .app-container {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: 'Georgia', serif;
  color: white;
  overflow: hidden;
}

.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  margin-top: 5vh;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.input {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  background-color: #1c1c1c;
  color: white;
  border: 1px solid #444;
  border-radius: 8px;
  font-size: 1rem;
}

.generate-button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #4a00e0;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.generate-button:hover {
  background-color: #7b2ff7;
}

.error {
  color: red;
  margin-top: 1rem;
  text-align: center;
}

.lore-box {
  margin-top: 2rem;
  background-color: #121212;
  padding: 1rem;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #555;
}

.lore-text {
  white-space: pre-wrap;
  font-size: 1rem;
}
