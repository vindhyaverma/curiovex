<div align="center">
  <img src="assets/icon.png" width="100" height="100" alt="Curiovex AI Icon" />
  <h1>⚡ Curiovex AI</h1>
  <p><b>YouTube Intelligence Layer & Elite Analyst Engine</b></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=FastAPI&logoColor=white)](https://fastapi.tiangolo.com/)
  [![Plasmo](https://img.shields.io/badge/Plasmo-Extension-black?style=flat)](https://www.plasmo.com/)
</div>

<br />

Curiovex AI is a cutting-edge Chrome extension that injects a powerful **Intelligence Layer** directly into your YouTube viewing experience. Using advanced Large Language Models, it instantly analyzes video transcripts in any language and extracts high-value insights, actionable items, and learning metadata, presenting it all in a sleek, premium dark-themed UI.

---

## ✨ Features

- **Universal Language Support**: Automatically analyzes and translates transcripts from any language natively.
- **Deep Insights Extraction**: Generates a concise summary, key insights, and actionable items.
- **Smart Metadata**: Rates the video's learning value, difficulty, and identifies the target audience.
- **Premium UI**: Injects a beautifully designed, non-intrusive dark mode analytics panel right onto the YouTube page.
- **Robust Error Handling**: Gracefully handles API limits and transcript unavailability with a dedicated error UI state.

## 🛠 Tech Stack

- **Frontend / Extension**: Plasmo Framework, React, TypeScript
- **Backend API**: FastAPI, Python
- **AI Engine**: Groq (Llama 3.1 8B Instant)
- **Data Processing**: YouTube Transcript API

## 🚀 Getting Started

### 1. Set up the Backend
Navigate to the backend directory and set up your Python environment:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend` folder and add your Groq API key:
```env
GROQ_API_KEY=your_groq_api_key_here
```

Start the FastAPI server:
```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

### 2. Build the Extension
In the root directory of the extension, install dependencies and build:
```bash
npm install
npm run build
```

### 3. Load the Extension in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked** and select the `build/chrome-mv3-prod` directory.

## 💡 How to Use
Simply navigate to any YouTube video! Curiovex AI will automatically detect the video, analyze the transcript via the backend API, and slide in a beautiful intelligence panel with your insights.

---

<div align="center">
  <i>Built for intellectual exploration and elite analysis.</i>
</div>
