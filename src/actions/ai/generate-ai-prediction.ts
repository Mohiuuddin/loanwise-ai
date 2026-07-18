"use server";

import { getCurrentSession } from "@/lib/auth/auth";

import { getLoanForAI } from "@/data/loan/get-loan-for-ai";
import { createAIPrediction } from "@/data/ai/create-ai-prediction";

import { calculateLoanRisk } from "@/services/ai/calculate-loan-risk";
import { generateLoanAnalysis } from "@/services/ai/generate-loan-analysis";

import { createAuditLog } from "@/lib/audit-log";

import { AuditAction } from "@/generated/prisma/enums";

export async function generateAIPrediction(applicationId: string) {
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

  let prediction;

  try {
    prediction = await generateLoanAnalysis({
      loanAmount: Number(loan.loanAmount),
      loanTermMonths: loan.loanTermMonths,
      monthlyIncome: Number(loan.employment.monthlySalary),
      monthlyExpenses: Number(loan.financialProfile.monthlyExpense),
      existingLoanEmi: Number(loan.financialProfile.existingLoanAmount),
      savings: Number(loan.financialProfile.bankBalance ?? 0),
      creditScore: loan.financialProfile.creditScore ?? 0,
      employmentType: loan.employment.employmentType,
    });
  } catch (error) {
    console.error("Groq AI failed. Falling back to rule engine.", error);

    prediction = calculateLoanRisk({
      loanAmount: Number(loan.loanAmount),
      loanTermMonths: loan.loanTermMonths,
      monthlyIncome: Number(loan.employment.monthlySalary),
      monthlyExpenses: Number(loan.financialProfile.monthlyExpense),
      existingLoanEmi: Number(loan.financialProfile.existingLoanAmount),
      savings: Number(loan.financialProfile.bankBalance ?? 0),
      creditScore: loan.financialProfile.creditScore ?? 0,
      employmentType: loan.employment.employmentType,
    });
  }

  await createAIPrediction({
    applicationId,
    eligible: prediction.eligible,
    riskScore: prediction.riskScore,
    confidenceScore: prediction.confidenceScore,
    recommendedAmount: prediction.recommendedAmount,
    reasoning: prediction.reasoning,

    creditAssessment: prediction.creditAssessment,
    affordability: prediction.affordability,
    employmentRisk: prediction.employmentRisk,
    savingsStrength: prediction.savingsStrength,
    debtRatio: prediction.debtRatio,
  });

  await createAuditLog({
    userId: session.user.id,
    action: AuditAction.GENERATE_AI_RESULT,
    entity: "LoanApplication",
    entityId: applicationId,
  });

  return prediction;
}
