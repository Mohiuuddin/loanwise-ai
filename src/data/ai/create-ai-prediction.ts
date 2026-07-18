import prisma from "@/lib/prisma";

interface CreateAIPredictionInput {
  applicationId: string;
  eligible: boolean;
  riskScore: number;
  confidenceScore: number;
  recommendedAmount: number;
  reasoning: string;

  creditAssessment: string;
  affordability: string;
  employmentRisk: string;
  savingsStrength: string;
  debtRatio: string;
}

export async function createAIPrediction(data: CreateAIPredictionInput) {
  return prisma.aIPrediction.create({
    data,
  });
}
