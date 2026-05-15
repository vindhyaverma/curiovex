<div align="center">
  <img src="assets/icon.png" width="104" height="104" alt="Curiovex logo" />

  <h1>Curiovex AI</h1>

  <p>
    <strong>An AI-powered YouTube intelligence layer for fast summaries, deep insights, and action-ready learning notes.</strong>
  </p>

  <p>
    <a href="https://www.plasmo.com/"><img alt="Plasmo" src="https://img.shields.io/badge/Plasmo-0.90.5-111111?style=for-the-badge" /></a>
    <a href="https://react.dev/"><img alt="React" src="https://img.shields.io/badge/React-18.2-149ECA?style=for-the-badge&logo=react&logoColor=white" /></a>
    <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /></a>
    <a href="https://fastapi.tiangolo.com/"><img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white" /></a>
    <a href="https://groq.com/"><img alt="Groq" src="https://img.shields.io/badge/Groq-Llama_3.1-F55036?style=for-the-badge" /></a>
  </p>
</div>

---

## Overview

Curiovex AI is a Chrome extension that adds an intelligent analysis panel directly to YouTube. Open a video, let the extension read its transcript through the local backend, and get a focused breakdown of what matters: summary, topic tags, key insights, action items, difficulty level, learning value, and the audience the video is best suited for.

The project combines a lightweight Plasmo extension with a FastAPI backend powered by Groq's `llama-3.1-8b-instant` model. It is built for people who learn from videos but do not want to lose the signal inside long content.

## What It Does

- Summarizes YouTube videos from their transcripts.
- Extracts practical key insights and action items.
- Adds topic tags for quick scanning.
- Scores the video's difficulty as Beginner, Intermediate, or Advanced.
- Estimates learning value as Low, Medium, or High.
- Recommends who the video is suitable for.
- Renders everything in a polished floating panel on the YouTube watch page.
- Handles transcript or API failures with a readable fallback state.

## Preview

The extension appears as a dark intelligence panel on YouTube, positioned over the current video page.

```text
Curiovex AI

Brief summary of the video...

[Topic] [Learning] [Strategy]

Key Insights
- Insight one
- Insight two
- Insight three

Action Items
- Action one
- Action two
- Action three

Difficulty: Intermediate
Learning Value: High
```

## Tech Stack

| Layer | Tools |
| --- | --- |
| Browser extension | Plasmo, Chrome Manifest V3 |
| UI | React, TypeScript |
| Content script | YouTube page extraction and panel injection |
| Backend | FastAPI, Python |
| Transcript source | `youtube-transcript-api` |
| AI model | Groq `llama-3.1-8b-instant` |

## Architecture

```mermaid
flowchart LR
  A["YouTube watch page"] --> B["Plasmo content script"]
  B --> C["Video metadata + video ID"]
  C --> D["FastAPI /analyze endpoint"]
  D --> E["YouTube transcript fetch"]
  E --> F["Groq Llama 3.1 analysis"]
  F --> G["Structured JSON response"]
  G --> H["Curiovex AI floating panel"]
```

## Project Structure

```text
curiovex/
├── assets/
│   └── icon.png
├── backend/
│   ├── main.py
│   └── requirements.txt
├── contents/
│   └── youtube.ts
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have:

- Node.js installed
- Python 3.9 or newer
- Google Chrome or a Chromium-based browser
- A Groq API key

### 1. Install Extension Dependencies

```bash
npm install
```

### 2. Configure The Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Start The Backend Server

Run this from the `backend/` directory:

```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

The extension expects the API to be available at:

```text
http://127.0.0.1:8000/analyze
```

### 4. Run The Extension In Development

From the project root:

```bash
npm run dev
```

Plasmo will generate a development build that can be loaded into Chrome.

### 5. Build For Production

```bash
npm run build
```

Then load this folder in Chrome:

```text
build/chrome-mv3-prod
```

## Loading In Chrome

1. Open `chrome://extensions/`.
2. Enable Developer mode.
3. Click Load unpacked.
4. Select the generated extension folder.
5. Open any YouTube video and wait for the Curiovex AI panel to appear.

## API Response Shape

The backend returns structured analysis data like this:

```json
{
  "success": true,
  "summary": "Short English summary of the video.",
  "tags": ["AI", "Learning", "Productivity"],
  "key_insights": [
    "Important idea from the video.",
    "Another useful insight."
  ],
  "action_items": [
    "A practical next step.",
    "Another action to take."
  ],
  "difficulty": "Intermediate",
  "learning_value": "High",
  "suitable_for": "Students, founders, researchers, and curious learners."
}
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Plasmo development server. |
| `npm run build` | Build the Chrome MV3 extension. |
| `npm run package` | Package the extension for distribution. |

## Notes

- The backend currently analyzes the first transcript it can fetch, preferring English and Hindi transcripts when available.
- The transcript is trimmed before being sent to the model to keep requests fast.
- The extension calls a local backend, so the FastAPI server must be running before opening a YouTube video.

## Roadmap

- Add an options page for API endpoint configuration.
- Add a loading state while analysis is running.
- Add transcript language and model selection.
- Cache recent analyses locally.
- Add screenshot assets for the GitHub README.

## Author

Built by **Vindhya Verma - IITJ**.

<div align="center">
  <strong>Curiovex AI turns passive watching into active understanding.</strong>
</div>
