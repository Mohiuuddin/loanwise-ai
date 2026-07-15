export function calculateDebtRisk(
  monthlyIncome: number,
  monthlyExpenses: number,
  existingLoanEmi: number,
) {
  const ratio = (monthlyExpenses + existingLoanEmi) / monthlyIncome;

  if (ratio < 0.3) {
    return {
      score: 0,
      reason: "Low debt-to-income ratio.",
    };
  }

  if (ratio < 0.5) {
    return {
      score: 10,
      reason: "Healthy debt-to-income ratio.",
    };
  }

  if (ratio < 0.7) {
    return {
      score: 25,
      reason: "Moderate debt-to-income ratio.",
    };
  }

  return {
    score: 40,
    reason: "High debt-to-income ratio.",
  };
}
