import { useEffect, useState } from "react";
import "../styles/Interests.css";

export default function Interests({ onBack, onNext, onChange }) {
  const [show, setShow] = useState(false);

  //  LOCAL STATE (NO data prop)
  const [interests, setInterests] = useState([]);
  const [foodPreferences, setFoodPreferences] = useState([]);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const toggle = (value, list, setList) => {
    setList(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
    );
  };

  const handleGenerate = () => {
    //  SEND DATA UP TO APP
    onChange({
      interests,
      foodPreferences,
    });

    onNext();
  };

  return (
    <div className="wizard-page">
      {/* Stepper */}
      <div className="stepper">
        <div className="step done"><Icon /></div>
        <div className="step-line active-line" />
        <div className="step done"><Icon /></div>
        <div className="step-line active-line" />
        <div className="step done"><Icon /></div>
        <div className="step-line active-line" />
        <div className="step active"><Icon /></div>
      </div>

      {/* Card */}
      <div className={`form-card slide ${show ? "show" : ""}`}>
        <h1>Your Interests</h1>
        <p className="subtitle">What excites you most?</p>

        <Section title="Interests">
          <TagRow
            options={[
              "Nature", "Culture", "Adventure", "Shopping",
              "Nightlife", "History", "Beach", "Food Tour",
              "Photography", "Wildlife",
            ]}
            selected={interests}
            onToggle={(v) => toggle(v, interests, setInterests)}
          />
        </Section>

        <Section title="Food Preferences">
          <TagRow
            options={[
              "Street Food", "Cafés", "Local Cuisine",
              "Fine Dining", "Vegetarian", "Seafood",
            ]}
            selected={foodPreferences}
            onToggle={(v) =>
              toggle(v, foodPreferences, setFoodPreferences)
            }
          />
        </Section>

        <div className="divider" />

        <div className="actions">
          <button className="back" onClick={onBack}>
            ← Back
          </button>

          <button className="generate" onClick={handleGenerate}>
            ✈ Generate Plan
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== HELPERS (UNCHANGED) ===== */

function Section({ title, children }) {
  return (
    <div className="section">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function TagRow({ options, selected, onToggle }) {
  return (
    <div className="tag-row">
      {options.map((opt) => (
        <button
          key={opt}
          className={`tag ${selected.includes(opt) ? "active" : ""}`}
          onClick={() => onToggle(opt)}
          type="button"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Icon() {
  return (
    <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2">
      <circle cx="9" cy="9" r="7" />
    </svg>
  );
}
