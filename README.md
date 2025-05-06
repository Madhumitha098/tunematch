# 🎶 TuneMatch – Hum-to-Find Music Identifier

**TuneMatch** is a full-stack music identification web app that lets users **upload an audio clip** (like a song or a hum) and discover relevant tracks using the **Spotify API**. Built with **React**, **Flask**, and audio analysis tools like **Librosa**, it blends creativity, AI, and real-time music search.

---

## 🌐 Live Demo

👉 [Try TuneMatch Live](https://tunematch.vercel.app)

---

## ✨ Features

- 🎤 Upload a song or hum snippet to search
- 🔍 Enter keywords like “tamil love” or “bollywood sad” to get Spotify recommendations
- 🎧 Get real-time results from Spotify’s live music catalog
- ⚡ Fast and interactive React-based UI
- 🌍 Live deployed with Vercel (frontend) and Render (backend)

---

## 🛠 Tech Stack

| Frontend | Backend | Tools & APIs | Hosting |
|----------|---------|--------------|---------|
| React    | Flask   | Spotify Web API | Vercel (React) |
| HTML/CSS | Python  | Librosa, Flask-CORS | Render (Flask) |

---

## 🧪 How It Works

1. Upload an `.mp3` or `.wav` file (song or hum)
2. The backend extracts audio features using `librosa`
3. Or, enter a search query and get Spotify matches
4. The frontend shows a curated playlist from Spotify

---

## 📸 Screenshots

> *Coming soon — add a few images of the app UI, file upload area, and result list*

---



## 🚀 Getting Started Locally

```bash
# Clone the repo
git clone https://github.com/Madhumitha098/tunematch.git
cd tunematch

# Run backend
cd server
pip install -r requirements.txt
python app.py

# Run frontend
cd ../client
npm install
npm start
```
🧠 Future Improvements
🎼 Match hummed audio to real songs using a fingerprint database

🔁 AI-based matching using vector embeddings

🎨 Improved UI with animations and theme options

📱 Mobile responsiveness

🙋‍♀️ Built By
Madhumitha Bascarane
🌐 LinkedIn ・ 💻 GitHub
