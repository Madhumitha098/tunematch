from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import librosa
import numpy as np
import requests
import base64
import os

# === Spotify API credentials ===
SPOTIFY_CLIENT_ID = 'caeef8d028b74027910db1ff9e07697f'
SPOTIFY_CLIENT_SECRET = '693343522b2c400e84bdb1e7e7f9e59d'

# === Flask Setup ===
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# === Get Spotify Access Token ===
def get_spotify_token():
    auth_url = 'https://accounts.spotify.com/api/token'
    auth_header = base64.b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()).decode()

    headers = {
        'Authorization': f'Basic {auth_header}',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    data = {
        'grant_type': 'client_credentials'
    }

    response = requests.post(auth_url, headers=headers, data=data)

    if response.status_code == 200:
        return response.json()['access_token']
    else:
        raise Exception('Failed to authenticate with Spotify API')

# === File Upload + Basic Analysis (still mock match) ===
@app.route('/match', methods=['POST'])
def match_song():
    print("POST /match recieved")
   
    if 'file' not in request.files:
        print("No file in request")
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    print(f"File recieved: {file.filename}"), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)
    print(f"File saved to {filepath}")

    try:
        y, sr = librosa.load(filepath)
        print("Audio loaded with librosa")

        chroma = librosa.feature.chroma_stft(y=y, sr=sr)
        avg_chroma = np.mean(chroma, axis=1)
        print("Chroma features extracted")

        # Fake logic for now
        if avg_chroma[0] > 0.5:
            match = "Blinding Lights - The Weeknd"
            playlist = ["Save Your Tears", "Starboy", "Can't Feel My Face"]
        else:
            match = "Levitating - Dua Lipa"
            playlist = ["Don't Start Now", "Break My Heart", "Physical"]

        print(f"Match: {match}")

        return jsonify({
            'matched_song': match,
            'playlist': playlist
        })

    except Exception as e:
        print("Error during processing", e)
        return jsonify({'error': str(e)}), 500

# === Real Spotify Integration ===
@app.route('/spotify-match', methods=['GET'])
def spotify_match():
    try:
        token = get_spotify_token()
        query = request.args.get('query', 'pop')  # default fallback

        search_url = 'https://api.spotify.com/v1/search'
        headers = {
            'Authorization': f'Bearer {token}'
        }

        params = {
            'q': query,
            'type': 'track',
            'limit': 5
        }

        response = requests.get(search_url, headers=headers, params=params)
        data = response.json()

        tracks = []
        for item in data['tracks']['items']:
            tracks.append({
                'name': item['name'],
                'artist': item['artists'][0]['name'],
                'url': item['external_urls']['spotify']
            })

        return jsonify({'results': tracks})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# === Run Server ===
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
