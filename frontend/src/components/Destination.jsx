import { useEffect, useState } from "react";
import "../styles/Destination.css";

export default function Destination({ value, onChange, onNext }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleNext = () => {
    if (!value.trim()) {
      alert("Please enter a destination");
      return;
    }
    onNext();
  };

  return (
    <div className="wizard-page">
      {/* Stepper – UNCHANGED */}
      <div className="stepper">
        <div className="step active"><span className="icon">📍</span></div>
        <div className="step-line" />
        <div className="step"><span className="icon">📅</span></div>
        <div className="step-line" />
        <div className="step"><span className="icon">👤</span></div>
        <div className="step-line" />
        <div className="step"><span className="icon">❤</span></div>
      </div>

      {/* Card – UNCHANGED */}
      <div className={`form-card slide ${show ? "show" : ""}`}>
        <h1>Where to?</h1>
        <p className="subtitle">Tell us your dream destination</p>

        <div className="field">
          <label>Destination</label>
          <input
            placeholder="e.g. Bali, Indonesia"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        <div className="divider" />

        <div className="actions">
          <button className="back" disabled>← Back</button>
          <button className="next" onClick={handleNext}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
