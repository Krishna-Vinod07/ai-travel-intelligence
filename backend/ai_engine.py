import os
import json
import re
from datetime import datetime
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

    try:
        # Calculate trip duration
        start = datetime.strptime(data["startDate"], "%Y-%m-%d")
        end = datetime.strptime(data["endDate"], "%Y-%m-%d")

        trip_days = (end - start).days + 1

        if trip_days <= 0:
            trip_days = 1

    except Exception:
        trip_days = 7

    print(f"📅 Trip Duration: {trip_days} days")

    prompt = f"""
You are an expert AI travel planner.

IMPORTANT:
- Return ONLY valid JSON.
- No explanations.
- No markdown.
- No text before or after JSON.
- Strict JSON only.

TRIP RULES:
- Generate EXACTLY {trip_days} days.
- The value of "days" MUST be {trip_days}.
- Do NOT generate more days.
- Do NOT generate fewer days.
- Do NOT default to 7 days.
- Distribute sightseeing activities across all {trip_days} days.

User Details:
Destination: {data.get('destination', '')}
Start Date: {data.get('startDate', '')}
End Date: {data.get('endDate', '')}
Trip Duration: {trip_days} days
Budget: {data.get('budget', 0)}
Travel Type: {data.get('travelType', '')}
Accommodation Preference: {data.get('accommodation', '')}
Pace: {data.get('pace', '')}
Interests: {', '.join(data.get('interests', []))}
Food Preferences: {', '.join(data.get('foodPreferences', []))}

Generate:

1. SIX stay recommendations:
- name
- type
- price (numeric)
- rating (numeric)
- features (array)
- reason

2. SIX restaurant recommendations:
- name
- cuisine
- price_level
- meal_type
- description
- reason

3. Sightseeing itinerary:
- Cover EXACTLY {trip_days} days
- Include 3 to 5 activities per day
- Each activity must contain:
  - day
  - title
  - time
  - duration
  - category
  - description

4. Detailed packing list

5. Budget breakdown

6. Travel scores (0-100):
- budgetMatch
- adventure
- food
- comfort

7. Travel Highlights:
Generate exactly 5 highlights:
- Best photo spot
- Best sunset location
- Must-try local food
- Hidden gem
- Local travel tip
8. AI Insights

Generate a detailed paragraph explaining:

- Why these hotels were selected
- Why these restaurants match the user
- How the itinerary matches the selected pace
- How the budget was allocated
- Why the activities fit the user's interests

Minimum 4 sentences.

Return ONLY this JSON structure:

{{
  "days": {trip_days},

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

"scores": {{
  "budgetMatch": 0,
  "adventure": 0,
  "food": 0,
  "comfort": 0
}},

"travelHighlights": [
  "Best photo spot: ...",
  "Best sunset location: ...",
  "Must-try food: ...",
  "Hidden gem: ...",
  "Local travel tip: ..."
]

"aiInsights": ""

  "aiInsights": ""
}}
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
            temperature=0.5
        )

        text = response.choices[0].message.content.strip()

        print("\n🔵 RAW AI RESPONSE:")
        print(text)

        clean_json = extract_json(text)

        if not clean_json:
            raise Exception("No JSON found in AI response")

        parsed = json.loads(clean_json)

        print(f"\n✅ Requested Days: {trip_days}")
        print(f"✅ Returned Days: {parsed.get('days')}")

        return parsed

    except Exception as e:
        print("🔥 GROQ ERROR:", e)

        return {
            "days": trip_days,
            "stay": [],
            "eat": [],
            "see": [],
            "pack": {
                "clothing": [],
                "toiletries": [],
                "electronics": [],
                "documents": [],
                "health": []
            },
            "budget": {
                "Accommodation": 0,
                "Food": 0,
                "Transport": 0,
                "Activities": 0,
                "Shopping": 0,
                "Miscellaneous": 0,
                "Total": 0,
                "savingsTips": []
            },
            "scores": {
    "budgetMatch": 0,
    "adventure": 0,
    "food": 0,
    "comfort": 0
},
            "aiInsights": "AI generation failed."
        }