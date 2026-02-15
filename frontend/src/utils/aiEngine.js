export function generateAIPlan(data) {
  const {
    destination,
    budget,
    travelType,
    accommodation,
    pace,
    interests,
    foodPreferences,
    startDate,
    endDate
  } = data;

  /* ---- DAYS CALCULATION (SAFE) ---- */
  let days =
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

  if (isNaN(days) || days <= 0) days = 1;

  /* ---- STAY LOGIC ---- */
  const stayType =
    accommodation === "Premium"
      ? "Premium Hotel / Resort"
      : accommodation === "Mid-Range"
      ? "Comfort Hotel"
      : "Budget Stay";

  /* ---- EAT LOGIC ---- */
  const eat = foodPreferences && foodPreferences.length > 0
    ? foodPreferences.map((f) => `${f} restaurants`)
    : ["Local cuisine", "Popular cafés"];

  /* ---- SEE LOGIC ---- */
  let see = [];

  if (interests.includes("Nature"))
    see.push("Nature spots & scenic views");

  if (interests.includes("Adventure"))
    see.push("Adventure activities");

  if (interests.includes("Culture"))
    see.push("Historical & cultural places");

  if (interests.includes("Shopping"))
    see.push("Local markets & shopping areas");

  if (see.length === 0)
    see = ["Top tourist attractions", "City highlights"];

  /* ---- PACK LOGIC (SEASON BASED) ---- */
  const month = new Date(startDate).getMonth();

  const pack =
    month === 11 || month === 0 || month === 1
      ? ["Warm jackets", "Thermal wear", "Gloves"]
      : ["Light clothes", "Comfortable shoes", "Sunscreen"];

  /* ---- BUDGET LOGIC ---- */
  const budgetSplit = {
    Stay: Math.round(budget * 0.45),
    Food: Math.round(budget * 0.25),
    Transport: Math.round(budget * 0.15),
    Activities: Math.round(budget * 0.1),
    Misc: Math.round(budget * 0.05)
  };

  /* ---- AI INSIGHTS ---- */
  const aiInsights = `This travel plan for ${destination} is optimized for a ${travelType} traveler with a ${pace.toLowerCase()} pace. 
A ${stayType.toLowerCase()} was selected to balance comfort and your budget of $${budget}. 
Your interests influenced sightseeing and dining recommendations, while seasonal conditions were considered for packing essentials.`;

  return {
    days,
    stayType,
    eat,
    see,
    pack,
    budgetSplit,
    aiInsights
  };
}
