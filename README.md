🎧 TuneMatch
Find your favorite songs by humming a tune!
TuneMatch is an AI-powered music identifier and playlist generator built with React, Flask, and Librosa.

🚀 Features
🎤 Upload a .wav or .mp3 recording of your voice or music

🎶 Real-time audio analysis using librosa

🎯 Match your tune to a popular song (simulated matching)

📜 Get personalized playlist recommendations

🖥️ Full-stack project: React frontend + Flask backend

☁️ Future: Deploy to Render/Vercel and integrate Spotify API

🛠 Tech Stack

Frontend	Backend	Audio Analysis	Deployment
React, JavaScript, HTML5, CSS3	Flask (Python)	Librosa, NumPy	(Coming soon) Render + Vercel
📂 Project Structure
bash
Copy
Edit
tunematch/
├── client/         # React frontend (upload UI)
├── server/         # Flask backend (audio analysis API)
├── uploads/        # Temporary uploaded audio files
├── README.md       # Project overview
📸 Screenshots


⚙️ How to Run Locally
Clone the repo
bash
Copy
Edit
git clone https://github.com/Madhumitha098/tunematch.git
cd tunematch

Backend Setup
bash
Copy
Edit
cd server
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install flask flask-cors librosa numpy soundfile
python app.py

Frontend Setup
bash
Copy
Edit
cd ../client
npm install
npm start
Open

Frontend: http://localhost:3000

Backend: http://127.0.0.1:5000

📜 Future Enhancements
Improve song matching with real ML models

Integrate Spotify API for live playlist generation

Add real-time microphone recording

Deploy frontend (Vercel) and backend (Render)

🙌 Author
Madhumitha Bascarane 
