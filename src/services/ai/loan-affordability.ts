export function calculateAffordabilityRisk(
  loanAmount: number,
  loanTermMonths: number,
  monthlyIncome: number,
) {
  const monthlyInstallment = loanAmount / loanTermMonths;

  const ratio = monthlyInstallment / monthlyIncome;

  if (ratio < 0.2) {
    return {
      score: 0,
      reason: "Loan is easily affordable.",
    };
  }

  if (ratio < 0.35) {
    return {
      score: 10,
      reason: "Loan is affordable.",
    };
  }

  if (ratio < 0.5) {
    return {
      score: 25,
      reason: "Loan affordability is moderate.",
    };
  }

  return {
    score: 45,
    reason: "Loan affordability is poor.",
  };
}
