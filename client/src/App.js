import React, { useState } from 'react';

function App() {
  const [audioURL, setAudioURL] = useState(null);
  const [result, setResult] = useState(null);
  const [searchInput, setSearchInput] = useState('');

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

    try {
      const response = await fetch('https://tunematch-backend.onrender.com/match', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        alert("Server error: " + data.error);
      } else {
        setResult(data);
      }
    } catch (error) {
      alert("Error reaching server: " + error.message);
      console.error('Request failed:', error);
    }
  };

  const fetchSpotifySongs = async () => {
    if (!searchInput.trim()) {
      alert('Please enter a search term!');
      return;
    }
  
    try {
      const response = await fetch(`https://tunematch-backend.onrender.com/spotify-match?query=${encodeURIComponent(searchInput)}`);
      const data = await response.json();
  
      if (data.error) {
        alert("Spotify error: " + data.error);
      } else {
        setResult({
          matched_song: `🎧 Spotify Results for "${searchInput}"`,
          playlist: data.results.map(track => `${track.name} - ${track.artist}`)
        });
      }
    } catch (error) {
      alert("Failed to fetch Spotify songs: " + error.message);
    }
  };
  

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#ffffff' }}>🎧 TuneMatch</h1>
      <p style={{ fontSize: '1.2rem', color: '#f0f0f0', marginBottom: '30px' }}>
        Hum a tune or upload an audio file to find a matching song!
      </p>

      <div style={{
        background: '#ffffff',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '300px'
      }}>
        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioUpload}
          style={{ marginBottom: '20px' }}
        />
        {audioURL && <audio controls src={audioURL} style={{ marginBottom: '20px', width: '100%' }} />}
        <br />

        <button
          onClick={searchSong}
          style={{
            backgroundColor: '#c471f5',
            border: 'none',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '30px',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: '10px',
            transition: 'background 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#a051d1'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#c471f5'}
        >
          🎵 Search Song
        </button>

        <br />

        <input
          type="text"
          placeholder="Enter artist, mood, or song..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{
          marginBottom: '10px',
          padding: '10px',
          borderRadius: '20px',
          border: '1px solid #ccc',
          width: '90%',
          fontSize: '1rem'
          }}
        />
        <br />

        <button
          onClick={fetchSpotifySongs}
          style={{
            backgroundColor: '#6b5b95',
            border: 'none',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '30px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#59477d'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6b5b95'}
        >
          🎶 Get Spotify Songs
        </button>
      </div>

      {result && result.matched_song && (
        <div style={{
          background: '#ffffff',
          marginTop: '40px',
          padding: '20px',
          borderRadius: '20px',
          boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
          width: '300px',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '10px', color: '#333' }}>{result.matched_song}</h2>

          <h3 style={{ marginBottom: '10px', color: '#666' }}>Recommended Playlist:</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {result.playlist && result.playlist.map((song, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>🎵 {song}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
