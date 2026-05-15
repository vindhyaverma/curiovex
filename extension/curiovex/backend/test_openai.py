from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

print("KEY EXISTS:", bool(api_key))

client = OpenAI(api_key=api_key)

try:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": "Say hello"
            }
        ]
    )

    print(response.choices[0].message.content)

except Exception as e:
    print("OPENAI ERROR:")
    print(type(e))
    print(e)