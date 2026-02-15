import { useEffect, useState } from "react";
import "../styles/Hero.css";

export default function Hero({ onStart }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 150);
  }, []);

  return (
    <section className="hero">
      <div className="overlay"></div>

      <div className="hero-content">
        <span className={`badge ${show ? "show" : ""}`}>
          ✨ AI-Powered Travel Intelligence
        </span>

        <h1 className="title">
          <span className={`fade-item ${show ? "show delay-1" : ""}`}>
            Plan Smarter.
          </span>
          <br />
          <span className={`highlight fade-item ${show ? "show delay-2" : ""}`}>
            Travel Better.
          </span>
        </h1>

        <p className={`subtitle fade-item ${show ? "show delay-3" : ""}`}>
          Our AI engine optimizes your budget, curates experiences,
          and builds the perfect itinerary — all tailored to how
          you love to explore.
        </p>

       
        <button
          className={`cta fade-item ${show ? "show delay-4" : ""}`}
          onClick={onStart}
        >
          ⦿ Start Planning
        </button>
      </div>

      <div className={`scroll-indicator fade-item ${show ? "show delay-5" : ""}`}>
        ⌄
      </div>
    </section>
  );
}

