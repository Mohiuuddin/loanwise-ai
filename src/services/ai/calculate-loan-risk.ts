import { EmploymentType, LoanPurpose } from "@/generated/prisma/enums";

import { calculateAffordabilityRisk } from "./loan-affordability";
import { calculateCreditRisk } from "./credit-score";
import { calculateDebtRisk } from "./debt-ratio";
import { calculateEmploymentRisk } from "./employment-risk";
import { calculateSavingsRisk } from "./savings-risk";

import { AIPrediction } from "@/schemas/ai-prediction.schema";

interface LoanRiskInput {
  loanAmount: number;
  interestRate: number;
  loanPurpose: LoanPurpose;

  monthlyIncome: number;
  monthlyExpenses: number;
  existingLoanEmi: number;

  savings: number;
  collateralValue: number;

  creditScore: number;

  employmentType: EmploymentType;
}

export function calculateLoanRisk(input: LoanRiskInput): AIPrediction {
  const credit = calculateCreditRisk(input.creditScore);

  const employment = calculateEmploymentRisk(input.employmentType);

  const debt = calculateDebtRisk(
    input.monthlyIncome,
    input.monthlyExpenses,
    input.existingLoanEmi,
  );

  const savings = calculateSavingsRisk(input.savings, input.loanAmount);

  const affordability = calculateAffordabilityRisk(
    input.loanAmount,
    60,
    input.monthlyIncome,
  );

  let collateralScore = 0;

  if (input.collateralValue >= input.loanAmount) {
    collateralScore = -5;
  } else if (input.collateralValue >= input.loanAmount * 0.5) {
    collateralScore = 0;
  } else {
    collateralScore = 5;
  }

  const riskScore =
    credit.score +
    employment.score +
    debt.score +
    savings.score +
    affordability.score +
    collateralScore;

  const eligible = riskScore < 50;

  let confidenceScore = 95;

  if (riskScore >= 20) confidenceScore = 90;
  if (riskScore >= 40) confidenceScore = 80;
  if (riskScore >= 60) confidenceScore = 70;
  if (riskScore >= 80) confidenceScore = 60;

  let recommendedAmount = input.loanAmount;

  if (riskScore >= 20) recommendedAmount *= 0.9;

  if (riskScore >= 40) recommendedAmount *= 0.8;

  if (riskScore >= 60) recommendedAmount *= 0.6;

  if (riskScore >= 80) recommendedAmount *= 0.5;

  const disposableIncome =
    input.monthlyIncome - input.monthlyExpenses - input.existingLoanEmi;

  const estimatedMonthlyEMI = recommendedAmount / 60;

  const maximumAffordableEMI = disposableIncome * 0.4;

  let recommendedRepaymentTermMonths = 60;

  if (riskScore <= 20) recommendedRepaymentTermMonths = 36;
  else if (riskScore <= 40) recommendedRepaymentTermMonths = 48;
  else if (riskScore <= 60) recommendedRepaymentTermMonths = 60;
  else recommendedRepaymentTermMonths = 72;

  const reasoning = [
    credit.reason,
    employment.reason,
    debt.reason,
    savings.reason,
    affordability.reason,
  ].join(" ");

  const debtRatio = (
    ((input.monthlyExpenses + input.existingLoanEmi) / input.monthlyIncome) *
    100
  ).toFixed(0);

  return {
    eligible,

    riskScore,

    confidenceScore,

    recommendedAmount: Math.round(recommendedAmount),

    recommendedRepaymentTermMonths,

    estimatedMonthlyEMI: Math.round(estimatedMonthlyEMI),

    maximumAffordableEMI: Math.round(maximumAffordableEMI),

    disposableIncome: Math.round(disposableIncome),

    overallRecommendation: eligible ? "Approve" : "Reject",

    reasoning,

    creditAssessment:
      input.creditScore >= 750
        ? "Excellent"
        : input.creditScore >= 650
          ? "Good"
          : input.creditScore >= 550
            ? "Fair"
            : "Poor",

    affordability:
      affordability.score <= 5
        ? "Excellent"
        : affordability.score <= 10
          ? "Good"
          : affordability.score <= 15
            ? "Moderate"
            : "Poor",

    employmentRisk:
      employment.score <= 5
        ? "Low"
        : employment.score <= 10
          ? "Medium"
          : "High",

    savingsStrength:
      savings.score <= 5 ? "Strong" : savings.score <= 10 ? "Moderate" : "Weak",

    debtRatio: `${debtRatio}%`,
  };
}
