import { useEffect, useState } from "react";
import "../styles/Preferences.css";

export default function Preferences({ onNext, onBack, onChange }) {
  const [show, setShow] = useState(false);

  //  LOCAL STATE (no data prop)
  const [travelType, setTravelType] = useState("Couple");
  const [accommodation, setAccommodation] = useState("Mid-Range");
  const [pace, setPace] = useState("Moderate");

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleNext = () => {
    // SEND DATA UP TO APP
    onChange({
      travelType,
      accommodation,
      pace,
    });

    onNext();
  };

  return (
    <div className="wizard-page">
      {/* Stepper */}
      <div className="stepper">
        <div className="step done"><LocationIcon /></div>
        <div className="step-line active-line" />
        <div className="step done"><CalendarIcon /></div>
        <div className="step-line active-line" />
        <div className="step active"><UserIcon /></div>
        <div className="step-line" />
        <div className="step"><HeartIcon /></div>
      </div>

      {/* Card */}
      <div className={`form-card slide ${show ? "show" : ""}`}>
        <h1>Travel Style</h1>
        <p className="subtitle">How do you like to travel?</p>

        <Section title="Travel Type">
          <OptionRow
            options={["Solo", "Couple", "Group"]}
            value={travelType}
            onChange={setTravelType}
          />
        </Section>

        <Section title="Accommodation">
          <OptionRow
            options={["Budget", "Mid-Range", "Premium"]}
            value={accommodation}
            onChange={setAccommodation}
          />
        </Section>

        <Section title="Pace">
          <OptionRow
            options={["Relaxed", "Moderate", "Fast"]}
            value={pace}
            onChange={setPace}
          />
        </Section>

        <div className="divider" />

        <div className="actions">
          <button className="back" onClick={onBack}>← Back</button>
          <button className="next" onClick={handleNext}>Next →</button>
        </div>
      </div>
    </div>
  );
}

/* ===== UI HELPERS (UNCHANGED) ===== */

function Section({ title, children }) {
  return (
    <div className="section">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function OptionRow({ options, value, onChange }) {
  return (
    <div className="option-row">
      {options.map((opt) => (
        <button
          key={opt}
          className={`option ${value === opt ? "active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ===== ICONS (UNCHANGED) ===== */

function LocationIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2">
      <path d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0113 0" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="#9ca3af" strokeWidth="2">
      <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
    </svg>
  );
}
