import os
import json
import re
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)


def extract_json(text):
    """
    Extract JSON object from model response safely
    """
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        return match.group(0)
    return None


def generate_ai_travel_plan(data):
    prompt = f"""
You are an expert AI travel planner.

IMPORTANT:
- Return ONLY valid JSON.
- No explanations.
- No markdown.
- No text before or after JSON.
- Strict JSON only.

User Details:
Destination: {data['destination']}
Budget: {data['budget']}
Travel Type: {data['travelType']}
Pace: {data['pace']}
Interests: {', '.join(data['interests'])}
Food Preferences: {', '.join(data['foodPreferences'])}

Generate:

- 6 stays with:
  name, type, price (numeric), rating (numeric),
  features (array),
  reason (2 lines description)

- 6 restaurants with:
  name,
  cuisine,
  price_level ( $, $$, $$$, $$$$ ),
  meal_type (Breakfast/Lunch/Dinner/Snack),
  description (1–2 lines about ambiance/location),
  reason (why recommended based on user preferences)

- 10 sightseeing items with:
  day,
  title,
  time,
  duration,
  category,
  description

- Full detailed packing breakdown

- Budget breakdown including savingsTips

Return JSON format:

{{
  "days": number,

  "stay": [
    {{
      "name": "",
      "type": "",
      "price": 0,
      "rating": 0,
      "features": [],
      "reason": ""
    }}
  ],

  "eat": [
    {{
      "name": "",
      "cuisine": "",
      "price_level": "",
      "meal_type": "",
      "description": "",
      "reason": ""
    }}
  ],

  "see": [
    {{
      "day": 1,
      "title": "",
      "time": "",
      "duration": "",
      "category": "",
      "description": ""
    }}
  ],

  "pack": {{
    "clothing": [],
    "toiletries": [],
    "electronics": [],
    "documents": [],
    "health": []
  }},

  "budget": {{
    "Accommodation": 0,
    "Food": 0,
    "Transport": 0,
    "Activities": 0,
    "Shopping": 0,
    "Miscellaneous": 0,
    "Total": 0,
    "savingsTips": []
  }},

  "aiInsights": ""
}}
"""


    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        text = response.choices[0].message.content.strip()

        print("🔵 RAW AI RESPONSE:\n", text)

        # Extract only JSON
        clean_json = extract_json(text)

        if not clean_json:
            raise Exception("No JSON found in AI response")

        parsed = json.loads(clean_json)

        print("✅ AI PLAN GENERATED SUCCESSFULLY")

        return parsed

    except Exception as e:
        print("🔥 GROQ ERROR:", e)

        return {
            "days": 0,
            "stay": [],
            "eat": [],
            "see": [],
            "pack": {},
            "budget": {"savingsTips": []},
            "aiInsights": "AI generation failed."
        }
