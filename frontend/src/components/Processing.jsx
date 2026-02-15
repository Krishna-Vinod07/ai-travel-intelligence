import { useEffect, useState } from "react";
import "../styles/Processing.css";

const STEPS = [
  "Analyzing your preferences...",
  "Scoring accommodations...",
  "Optimizing food recommendations...",
  "Building sightseeing timeline...",
  "Generating packing list...",
  "Calculating budget breakdown..."
];

export default function Processing({ onComplete }) {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSteps((prev) => {
        if (prev < STEPS.length) return prev + 1;
        clearInterval(interval);
        setTimeout(onComplete, 1000);
        return prev;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="processing-page">
      <div className="processing-container">

        {/*  ROTATING ICON */}
        <div className="spinner">
          <CompassIcon />
        </div>

        <h1>Crafting Your Perfect Trip</h1>
        <p className="subtitle">
          Our AI is optimizing thousands of possibilities...
        </p>

        <ul className="steps">
          {STEPS.slice(0, visibleSteps).map((step, i) => (
            <li key={i}>✨ {step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}


function CompassIcon() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1f8a8a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16 8 14 14 8 16 10 10 16 8" />
    </svg>
  );
}
