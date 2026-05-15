from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from youtube_transcript_api import YouTubeTranscriptApi
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(req: dict):
    try:
        video_id = req.get("videoId")

        api = YouTubeTranscriptApi()
        tl = api.list(video_id)
        try:
            t = tl.find_transcript(['en', 'hi', 'en-US', 'en-GB'])
        except Exception:
            t = list(tl)[0]
        transcript = t.fetch()

        text = " ".join([x.text for x in transcript])

        text = text[:1500]

        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": f"""Analyze this transcript and return a JSON object with the following keys. IMPORTANT: Ensure the entire JSON response is in English, regardless of the transcript's original language.
- "summary": A brief summary of the video in English.
- "tags": Array of 3-4 topic strings in English.
- "key_insights": Array of 3-4 key insights (strings) in English.
- "action_items": Array of 3-4 action items (strings) in English.
- "difficulty": The difficulty level (Beginner, Intermediate, Advanced).
- "learning_value": Learning value (Low, Medium, High).
- "suitable_for": Who this video is recommended for in English.

Transcript:
{text}"""
                }
            ],
            response_format={"type": "json_object"}
        )

        import json
        result = json.loads(completion.choices[0].message.content)

        return {
            "success": True,
            "summary": result.get("summary", ""),
            "tags": result.get("tags", []),
            "key_insights": result.get("key_insights", []),
            "action_items": result.get("action_items", []),
            "difficulty": result.get("difficulty", "N/A"),
            "learning_value": result.get("learning_value", "N/A"),
            "suitable_for": result.get("suitable_for", "N/A")
        }

    except Exception as e:
        return {
            "success": False,
            "error_message": str(e),
            "key_insights": ["Could not process video transcript."],
            "action_items": ["Verify video availability and API quota."]
        }