import { z } from "zod";

export const aiPredictionSchema = z.object({
  eligible: z.boolean(),

  riskScore: z.number().min(0).max(100),

  confidenceScore: z.number().min(0).max(100),

  recommendedAmount: z.number(),

  // AI predicts repayment period
  recommendedRepaymentTermMonths: z.number().int().positive(),

  // Calculated values
  estimatedMonthlyEMI: z.number(),

  maximumAffordableEMI: z.number(),

  disposableIncome: z.number(),

  reasoning: z.string(),

  overallRecommendation: z.string(),

  creditAssessment: z.string(),

  affordability: z.string(),

  employmentRisk: z.string(),

  savingsStrength: z.string(),

  debtRatio: z.string(),
});

export type AIPrediction = z.infer<typeof aiPredictionSchema>;
