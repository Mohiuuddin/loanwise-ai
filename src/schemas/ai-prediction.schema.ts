import { z } from "zod";

export const aiPredictionSchema = z.object({
  eligible: z.boolean(),
  riskScore: z.number(),
  confidenceScore: z.number(),
  recommendedAmount: z.number(),
  reasoning: z.string(),
  creditAssessment: z.string(),

  affordability: z.string(),

  employmentRisk: z.string(),

  savingsStrength: z.string(),

  debtRatio: z.string(),
});

export type AIPrediction = z.infer<typeof aiPredictionSchema>;
