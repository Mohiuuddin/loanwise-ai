export function calculateSavingsRisk(savings: number, loanAmount: number) {
  const ratio = savings / loanAmount;

  if (ratio >= 1) {
    return {
      score: -15,
      reason: "Excellent savings coverage.",
    };
  }

  if (ratio >= 0.5) {
    return {
      score: -5,
      reason: "Good savings coverage.",
    };
  }

  if (ratio >= 0.2) {
    return {
      score: 10,
      reason: "Average savings coverage.",
    };
  }

  return {
    score: 25,
    reason: "Low savings coverage.",
  };
}
