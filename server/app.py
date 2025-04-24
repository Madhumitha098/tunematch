from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import librosa
import numpy as np

app = Flask(__name__)
CORS(app)

# Folder to save uploaded files
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/match', methods=['POST'])
def match_song():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    try:
        # Load and analyze the audio file using librosa
        y, sr = librosa.load(filepath)
        chroma = librosa.feature.chroma_stft(y=y, sr=sr)
        avg_chroma = np.mean(chroma, axis=1)

        # Simple simulated match logic based on chroma features
        if avg_chroma[0] > 0.5:
            match = "Blinding Lights - The Weeknd"
            playlist = ["Save Your Tears", "Starboy", "Can't Feel My Face"]
        else:
            match = "Levitating - Dua Lipa"
            playlist = ["Don't Start Now", "Break My Heart", "Physical"]

        return jsonify({
            'matched_song': match,
            'playlist': playlist
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
