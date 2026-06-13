import { useState } from "react";

/* Pages */
import Hero from "./components/Hero";
import Destination from "./components/Destination";
import Dates from "./components/Dates";
import Preferences from "./components/Preferences";
import Interests from "./components/Interests";
import Processing from "./components/Processing";
import AIInsights from "./components/AIInsights";

function App() {
  const [page, setPage] = useState("hero");

  const [tripData, setTripData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: 2000,
    travelType: "Couple",
    accommodation: "Mid-Range",
    pace: "Moderate",
    interests: [],
    foodPreferences: [],
  });

  const [aiPlan, setAiPlan] = useState(null);

  const updateTripData = (updates) => {
    setTripData((prev) => ({ ...prev, ...updates }));
  };

  // ✅ CALL BACKEND GEMINI
  const generateAIPlan = async () => {
    try {
      const res = await fetch("https://ai-travel-intelligence-krishna.onrender.com/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData),
      });

      const result = await res.json();
      setAiPlan(result);
      setPage("ai");
    } catch (err) {
      console.error("AI fetch failed", err);
    }
  };

  return (
    <>
      {page === "hero" && <Hero onStart={() => setPage("destination")} />}

      {page === "destination" && (
        <Destination
          value={tripData.destination}
          onChange={(v) => updateTripData({ destination: v })}
          onNext={() => setPage("dates")}
        />
      )}

      {page === "dates" && (
        <Dates
          onChange={updateTripData}
          onNext={() => setPage("preferences")}
          onBack={() => setPage("destination")}
        />
      )}

      {page === "preferences" && (
        <Preferences
          onChange={updateTripData}
          onNext={() => setPage("interests")}
          onBack={() => setPage("dates")}
        />
      )}

      {page === "interests" && (
        <Interests
          onChange={updateTripData}
          onNext={() => setPage("processing")}
          onBack={() => setPage("preferences")}
        />
      )}

      {page === "processing" && (
        <Processing onComplete={generateAIPlan} />
      )}

      {page === "ai" && (
        <AIInsights
          plan={aiPlan}
          onBack={() => setPage("hero")}
        />
      )}
    </>
  );
}

export default App;
