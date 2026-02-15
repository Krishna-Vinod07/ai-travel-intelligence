import { useState } from "react";
import "../styles/AIInsights.css";

export default function AIInsights({ plan, onBack }) {
  const [activeTab, setActiveTab] = useState("Stay");

  if (!plan) return null;

  return (
    <div className="ai-page">
      <div className="ai-header">
        <button className="back-link" onClick={onBack}>
          ← Plan Another Trip
        </button>

        <h1>Your AI Travel Plan</h1>
        <p className="ai-summary">
          A {plan.days}-day personalized exploration of {plan.destination || "your destination"}.
        </p>
      </div>

      {/* Tabs */}
      <div className="ai-tabs">
        {["Stay", "Eat", "See", "Pack", "Budget", "AI Insights"].map((tab) => (
          <button
            key={tab}
            className={`ai-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="ai-content">

        {/* ===================== STAY ===================== */}
        {activeTab === "Stay" && (
          <div className="grid-2">
            {plan.stay?.map((s, i) => (
              <div key={i} className="lux-card">
                <div className="card-header">
                  <div>
                    <h3 className="title">{s.name}</h3>
                    <p className="muted">{s.type}</p>
                  </div>
                  <div className="rating">⭐ {s.rating}</div>
                </div>

                <div className="price">${s.price}/night</div>

                <p className="description">{s.reason}</p>

                <div className="pill-row">
                  {s.features?.map((f, idx) => (
                    <span key={idx} className="pill">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===================== EAT ===================== */}
        {activeTab === "Eat" && (
          <div className="grid-2">
            {plan.eat?.map((r, i) => (
              <div key={i} className="lux-card">
                <h3 className="title">{r.name}</h3>

                <p className="muted">
                  {r.cuisine} • {r.price_level} • {r.meal_type}
                </p>

                <p className="description">{r.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* ===================== SEE ===================== */}
        {activeTab === "See" && (
          <div className="vertical-list">
            {plan.see?.map((s, i) => (
              <div key={i} className="timeline-card">
                <div className="day-badge">Day {s.day}</div>
                <div>
                  <h3 className="title">{s.title}</h3>
                  <p className="muted">
                    {s.time} • {s.duration} • {s.category}
                  </p>
                  <p className="description">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===================== PACK ===================== */}
        {activeTab === "Pack" && (
  <div className="vertical-list">
    {Object.entries(plan.pack || {}).map(([category, items]) => (
      <div key={category} className="lux-section">
        <h3 className="section-title" style={{ textTransform: "capitalize" }}>
          {category}
        </h3>

        <div className="pack-grid">
          {items?.map((item, idx) => {
            // If backend sends STRING
            if (typeof item === "string") {
              return (
                <div key={idx} className="pack-row">
                  <div className="check">✓</div>
                  <div>
                    <strong>{item}</strong>
                  </div>
                </div>
              );
            }

            // If backend sends OBJECT
            return (
              <div key={idx} className="pack-row">
                <div className="check">✓</div>
                <div>
                  <strong>{item.item}</strong>
                  {item.reason && (
                    <p className="muted small">{item.reason}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
)}

        {/* ===================== BUDGET ===================== */}
        {activeTab === "Budget" && (
          <div className="budget-layout">
            <div className="lux-card">
              <h3 className="section-title">Cost Breakdown</h3>
              {Object.entries(plan.budget || {})
                .filter(([k]) => k !== "savingsTips")
                .map(([k, v]) => (
                  <div key={k} className="budget-row">
                    <span>{k}</span>
                    <span>${v}</span>
                  </div>
                ))}
            </div>

            <div className="lux-card">
              <h3 className="section-title">Savings Tips</h3>
              <ul className="tips">
                {plan.budget?.savingsTips?.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ===================== AI INSIGHTS ===================== */}
        {activeTab === "AI Insights" && (
          <div className="lux-card">
            <h3 className="section-title">AI Decision Reasoning</h3>
            <p className="description">{plan.aiInsights}</p>
          </div>
        )}

      </div>
    </div>
  );
}
