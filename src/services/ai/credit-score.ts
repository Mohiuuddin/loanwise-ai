export function calculateCreditRisk(creditScore: number) {
  if (creditScore >= 800) {
    return {
      score: 0,
      reason: "Excellent credit score.",
    };
  }

  if (creditScore >= 750) {
    return {
      score: 10,
      reason: "Very good credit score.",
    };
  }

  if (creditScore >= 700) {
    return {
      score: 20,
      reason: "Good credit score.",
    };
  }

  if (creditScore >= 650) {
    return {
      score: 35,
      reason: "Fair credit score.",
    };
  }

  if (creditScore >= 600) {
    return {
      score: 50,
      reason: "Poor credit score.",
    };
  }

  return {
    score: 70,
    reason: "Very poor credit score.",
  };
}
