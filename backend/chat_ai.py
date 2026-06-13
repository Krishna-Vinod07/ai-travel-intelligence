import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)


def chat_with_trip(user_message, trip_data):

    prompt = f"""
You are an AI Travel Assistant.

Current Trip Details:
{trip_data}

User Request:
{user_message}

Rules:
- Give practical travel advice.
- Be concise.
- If user asks for cheaper options, suggest budget alternatives.
- If user asks for adventure activities, suggest relevant activities.
- If user asks for food, suggest restaurants and dishes.
- If user asks about itinerary improvements, provide day-wise suggestions.

Respond in plain text.
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7
        )

        return response.choices[0].message.content

    except Exception as e:
        print("CHAT ERROR:", e)
        return "Sorry, I couldn't generate a response."