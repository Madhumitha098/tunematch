import React, { useState } from 'react';

function App() {
  const [audioURL, setAudioURL] = useState(null);
  const [result, setResult] = useState(null);

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    setAudioURL(URL.createObjectURL(file));
  };

  const searchSong = async () => {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (!file) {
      alert('Please upload an audio file!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://127.0.0.1:5000/match', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🎧 TuneMatch</h1>
      <p>Hum a tune or upload an audio file to find a song</p>

      <input type="file" accept="audio/*" onChange={handleAudioUpload} />
      {audioURL && <audio controls src={audioURL} />}

      <button style={{ marginTop: '20px' }} onClick={searchSong}>
        Search Song
      </button>

      {result && (
        <div style={{ marginTop: '30px' }}>
          <h2>🎵 Matched Song:</h2>
          <p>{result.matched_song}</p>

          <h3>Recommended Playlist:</h3>
          <ul>
            {result.playlist.map((song, idx) => (
              <li key={idx}>{song}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
