import prisma from "@/lib/prisma";

interface CreateAIPredictionInput {
  applicationId: string;
  eligible: boolean;
  riskScore: number;
  confidenceScore: number;
  recommendedAmount: number;
  reasoning: string;
}

export async function createAIPrediction(data: CreateAIPredictionInput) {
  return prisma.aIPrediction.create({
    data,
  });
}
