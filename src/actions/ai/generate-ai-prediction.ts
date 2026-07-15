"use server";

import { getCurrentSession } from "@/lib/auth/auth";

import { getLoanForAI } from "@/data/loan/get-loan-for-ai";
import { createAIPrediction } from "@/data/ai/create-ai-prediction";

import { calculateLoanRisk } from "@/services/ai/calculate-loan-risk";

export async function generateAIPrediction(applicationId: string) {
  console.log("generateAIPrediction called");
  const session = await getCurrentSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const loan = await getLoanForAI(applicationId);

  if (!loan) {
    throw new Error("Loan application not found.");
  }

  if (!loan.employment || !loan.financialProfile) {
    throw new Error("Loan application is incomplete.");
  }

  const prediction = calculateLoanRisk({
    loanAmount: Number(loan.loanAmount),
    monthlyIncome: Number(loan.employment.monthlySalary),
    monthlyExpenses: Number(loan.financialProfile.monthlyExpense),
    existingLoanEmi: Number(loan.financialProfile.existingLoanAmount),
    savings: Number(loan.financialProfile.bankBalance ?? 0),
    creditScore: loan.financialProfile.creditScore ?? 0,
    loanTermMonths: loan.loanTermMonths,
    employmentType: loan.employment.employmentType,
  });

  await createAIPrediction({
    applicationId,
    eligible: prediction.eligible,
    riskScore: prediction.riskScore,
    confidenceScore: prediction.confidenceScore,
    recommendedAmount: prediction.recommendedAmount,
    reasoning: prediction.reasoning,
  });

  return prediction;
}
