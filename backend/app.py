from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_engine import generate_ai_travel_plan
from chat_ai import chat_with_trip
import json

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "AI Travel Backend Running"


@app.route("/generate-plan", methods=["POST"])
def generate_plan():

    data = request.json

    print("📩 Incoming Data:", data)

    raw_plan = generate_ai_travel_plan(data)

    formatted_plan = {
        "travelHighlights": raw_plan.get(
            "travelHighlights",
            []
        ),

        "days": raw_plan.get("days", 7),

        "stay": raw_plan.get("stay")
        or raw_plan.get("stays", []),

        "eat": raw_plan.get("eat")
        or raw_plan.get("restaurants", []),

        "see": raw_plan.get("see")
        or raw_plan.get("sightseeing", []),

        "pack": raw_plan.get("pack", {}),

        "budget": raw_plan.get("budget") or {
            **raw_plan.get(
                "budgetBreakdown",
                {}
            ),
            "savingsTips": (
                list(
                    raw_plan.get(
                        "savingsTips",
                        {}
                    ).values()
                )
                if isinstance(
                    raw_plan.get(
                        "savingsTips",
                        {}
                    ),
                    dict
                )
                else raw_plan.get(
                    "savingsTips",
                    []
                )
            )
        },

        "scores": raw_plan.get(
            "scores",
            {
                "budgetMatch": 0,
                "adventure": 0,
                "food": 0,
                "comfort": 0
            }
        ),

        "aiInsights": raw_plan.get(
    "aiInsights"
) or "AI generated personalized travel plan."
    }

    print("📤 Final Plan Sent To Frontend:")
    print(json.dumps(formatted_plan, indent=2))

    return jsonify(formatted_plan)


@app.route("/chat", methods=["POST"])
def chat():

    data = request.json

    message = data.get("message", "")
    trip = data.get("trip", {})

    reply = chat_with_trip(
        message,
        trip
    )

    return jsonify({
        "reply": reply
    })


if __name__ == "__main__":
    print("🔥 Starting AI Travel Backend...")
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )