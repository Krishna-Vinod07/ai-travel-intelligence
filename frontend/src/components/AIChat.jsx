import { useState } from "react";

export default function AIChat({ plan }) {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message.trim()) return;

    setLoading(true);

    try {

      const res = await fetch(
        "http://127.0.0.1:5000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            trip: plan,
          }),
        }
      );

      const data = await res.json();

      setReply(data.reply);

    } catch (err) {
      console.error(err);
      setReply("Failed to contact AI assistant.");
    }

    setLoading(false);
  };

  return (
    <div className="lux-card">

      <h3 className="section-title">
        🤖 AI Travel Assistant
      </h3>

      <div className="quick-actions">
        <button onClick={() => setMessage("Suggest cheaper restaurants")}>
          💰 Cheaper Restaurants
        </button>

        <button onClick={() => setMessage("Add adventure activities")}>
          🏔 Adventure
        </button>

        <button onClick={() => setMessage("Suggest hidden gems")}>
          💎 Hidden Gems
        </button>

        <button onClick={() => setMessage("Suggest nightlife")}>
          🌙 Nightlife
        </button>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about your trip..."
      />

      <button
        className="send-btn"
        onClick={sendMessage}
      >
        Ask AI
      </button>

      {loading && <p>Thinking...</p>}

      {reply && (
        <div className="chat-reply">
          <strong>AI:</strong>
          <p>{reply}</p>
        </div>
      )}

    </div>
  );
}