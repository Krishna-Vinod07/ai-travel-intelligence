import { useState } from "react";
import html2pdf from "html2pdf.js";   
import "../styles/AIInsights.css";
import AIChat from "./AIChat";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AIInsights({ plan, onBack }) {
  const [activeTab, setActiveTab] = useState("Stay");

  if (!plan) return null;
  const budgetData = [
    
  {
    name: "Accommodation",
    value: plan.budget?.Accommodation || 0,
  },
  {
    name: "Food",
    value: plan.budget?.Food || 0,
  },
  {
    name: "Transport",
    value: plan.budget?.Transport || 0,
  },
  {
    name: "Activities",
    value: plan.budget?.Activities || 0,
  },
  {
    name: "Shopping",
    value: plan.budget?.Shopping || 0,
  },
  {
    name: "Miscellaneous",
    value: plan.budget?.Miscellaneous || 0,
  },
];
const groupedItinerary = {};

(plan.see || []).forEach((item) => {
  if (!groupedItinerary[item.day]) {
    groupedItinerary[item.day] = [];
  }

  groupedItinerary[item.day].push(item);
});

const COLORS = [
  "#4F46E5",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

  // ✅ DOWNLOAD FUNCTION
  const downloadPDF = () => {
    const element = document.querySelector(".ai-content");

    const options = {
      margin: 0.5,
      filename: "AI-Travel-Plan.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="ai-page">
      <div className="ai-header">
        <button className="back-link" onClick={onBack}>
          ← Plan Another Trip
        </button>

        <h1>Your AI Travel Plan</h1>
        <p className="ai-summary">
          A {plan.days}-day personalized exploration of{" "}
          {plan.destination || "your destination"}.
        </p>

        {/*  DOWNLOAD BUTTON */}
        <button className="download-btn" onClick={downloadPDF}>
          ⬇ Download AI Plan
        </button>
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


        {/* ===================== SCORES ===================== */}
<div className="scores-grid">
  <div className="score-card">
    <span className="score-label">Budget Match</span>
    <h2>{plan.scores?.budgetMatch || 0}%</h2>
  </div>

  <div className="score-card">
    <span className="score-label">Adventure</span>
    <h2>{plan.scores?.adventure || 0}%</h2>
  </div>

  <div className="score-card">
    <span className="score-label">Food</span>
    <h2>{plan.scores?.food || 0}%</h2>
  </div>

  <div className="score-card">
    <span className="score-label">Comfort</span>
    <h2>{plan.scores?.comfort || 0}%</h2>
  </div>
</div>

{plan.travelHighlights?.length > 0 && (
  <div className="lux-card highlights-card">
    <h3 className="section-title">
      ✨ Trip Highlights
    </h3>

    <ul className="tips">
      {plan.travelHighlights.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
)}
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
                    <span key={idx} className="pill">
                      {f}
                    </span>
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
  <div className="itinerary-wrapper">

    {Object.entries(groupedItinerary).map(
      ([day, activities]) => (
        <div key={day} className="day-section">

          <div className="day-header">
            Day {day}
          </div>

          <div className="day-timeline">

            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="timeline-card"
              >
                <div className="timeline-time">
                  {activity.time}
                </div>

                <div className="timeline-content">
                  <h3 className="title">
                    {activity.title}
                  </h3>

                  <p className="muted">
                    {activity.duration} •{" "}
                    {activity.category}
                  </p>

                  <p className="description">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>
      )
    )}

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
                  {items?.map((item, idx) =>
                    typeof item === "string" ? (
                      <div key={idx} className="pack-row">
                        <div className="check">✓</div>
                        <strong>{item}</strong>
                      </div>
                    ) : (
                      <div key={idx} className="pack-row">
                        <div className="check">✓</div>
                        <div>
                          <strong>{item.item}</strong>
                          {item.reason && (
                            <p className="muted small">{item.reason}</p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===================== BUDGET ===================== */}
        {activeTab === "Budget" && (
  <div className="budget-layout">

    <div className="lux-card">
      <h3 className="section-title">
        Budget Distribution
      </h3>

      <div className="chart-container">
        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <PieChart>
            <Pie
              data={budgetData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {budgetData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="lux-card">
      <h3 className="section-title">
        Cost Breakdown
      </h3>

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
      <h3 className="section-title">
        Savings Tips
      </h3>

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
  <>
    <div className="lux-card">
      <h3 className="section-title">
        AI Decision Reasoning
      </h3>

      <p className="description">
        {plan.aiInsights}
      </p>
    </div>

    <AIChat plan={plan} />
  </>
)}
      </div>
    </div>
  );
}