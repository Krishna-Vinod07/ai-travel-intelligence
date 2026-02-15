import { useEffect, useState } from "react";
import "../styles/Dates.css";

export default function Dates({ onNext, onBack, onChange }) {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState(2000);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleNext = () => {
    if (!startDate || !endDate) {
      alert("Please select travel dates");
      return;
    }

    // send data to App.jsx
    onChange({
      startDate,
      endDate,
      budget,
    });

    onNext();
  };

  return (
    <div className="wizard-page">
      {/* Stepper */}
      <div className="stepper">
        <div className="step done"><LocationIcon /></div>
        <div className="step-line active-line" />
        <div className="step active"><CalendarIcon /></div>
        <div className="step-line" />
        <div className="step"><UserIcon /></div>
        <div className="step-line" />
        <div className="step"><HeartIcon /></div>
      </div>

      {/* Card */}
      <div className={`form-card slide ${show ? "show" : ""}`}>
        <h1>When & Budget</h1>
        <p className="subtitle">Set your dates and spending range</p>

        <div className="date-grid">
          <div className="field">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="field">
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="budget-section">
          <div className="budget-label">
            Budget: <strong>${budget.toLocaleString()}</strong>
          </div>

          <input
            type="range"
            min="200"
            max="20000"
            step="100"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="slider"
          />

          <div className="budget-range">
            <span>$200</span>
            <span>$20,000</span>
          </div>
        </div>

        <div className="divider" />

        <div className="actions">
          <button className="back" onClick={onBack}>← Back</button>
          <button className="next" onClick={handleNext}>Next →</button>
        </div>
      </div>
    </div>
  );
}

/* === ICONS (UNCHANGED) === */
function LocationIcon() { return (<svg width="20" height="20" fill="none" stroke="white" strokeWidth="2"><path d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" /><circle cx="12" cy="11" r="2" /></svg>); }
function CalendarIcon() { return (<svg width="20" height="20" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /></svg>); }
function UserIcon() { return (<svg width="20" height="20" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a6.5 6.5 0 0113 0" /></svg>); }
function HeartIcon() { return (<svg width="20" height="20" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" /></svg>); }
