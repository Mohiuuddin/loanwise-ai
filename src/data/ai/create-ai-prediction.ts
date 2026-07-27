import prisma from "@/lib/prisma";

interface CreateAIPredictionInput {
  applicationId: string;

  eligible: boolean;

  riskScore: number;

  confidenceScore: number;

  recommendedAmount: number;

  recommendedRepaymentTermMonths: number;

  estimatedMonthlyEMI: number;

  maximumAffordableEMI: number;

  disposableIncome: number;

  overallRecommendation: string;

  reasoning: string;

  creditAssessment: string;

  affordability: string;

  employmentRisk: string;

  savingsStrength: string;

  debtRatio: string;
}

export async function createAIPrediction(data: CreateAIPredictionInput) {
  return prisma.aIPrediction.create({
    data: {
      applicationId: data.applicationId,

      eligible: data.eligible,

      riskScore: data.riskScore,

      confidenceScore: data.confidenceScore,

      recommendedAmount: data.recommendedAmount,

      recommendedRepaymentTermMonths: data.recommendedRepaymentTermMonths,

      estimatedMonthlyEMI: data.estimatedMonthlyEMI,

      maximumAffordableEMI: data.maximumAffordableEMI,

      disposableIncome: data.disposableIncome,

      overallRecommendation: data.overallRecommendation,

      reasoning: data.reasoning,

      creditAssessment: data.creditAssessment,

      affordability: data.affordability,

      employmentRisk: data.employmentRisk,

      savingsStrength: data.savingsStrength,

      debtRatio: data.debtRatio,
    },
  });
}
