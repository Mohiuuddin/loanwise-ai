import { EmploymentType } from "@/generated/prisma/enums";

import { calculateAffordabilityRisk } from "./loan-affordability";
import { calculateCreditRisk } from "./credit-score";
import { calculateDebtRisk } from "./debt-ratio";
import { calculateEmploymentRisk } from "./employment-risk";
import { calculateSavingsRisk } from "./savings-risk";

interface LoanRiskInput {
  loanAmount: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  existingLoanEmi: number;
  savings: number;
  creditScore: number;
  loanTermMonths: number;
  employmentType: EmploymentType;
}

export function calculateLoanRisk(input: LoanRiskInput) {
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
    input.loanTermMonths,
    input.monthlyIncome,
  );

  const riskScore =
    credit.score +
    employment.score +
    debt.score +
    savings.score +
    affordability.score;

  const eligible = riskScore < 50;

  let confidenceScore = 95;

  if (riskScore >= 20) confidenceScore = 90;
  if (riskScore >= 40) confidenceScore = 80;
  if (riskScore >= 60) confidenceScore = 70;
  if (riskScore >= 80) confidenceScore = 60;

  let recommendedAmount = input.loanAmount;

  if (riskScore >= 20) {
    recommendedAmount *= 0.9;
  }

  if (riskScore >= 40) {
    recommendedAmount *= 0.8;
  }

  if (riskScore >= 60) {
    recommendedAmount *= 0.6;
  }

  if (riskScore >= 80) {
    recommendedAmount *= 0.5;
  }

  const reasoning = [
    credit.reason,
    employment.reason,
    debt.reason,
    savings.reason,
    affordability.reason,
  ].join(" ");

  return {
    eligible,
    riskScore,
    confidenceScore,
    recommendedAmount: Math.round(recommendedAmount),
    reasoning,
  };
}
