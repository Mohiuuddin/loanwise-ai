import { z } from "zod";

export const aiPredictionSchema = z.object({
  eligible: z.boolean(),
  riskScore: z.number(),
  confidenceScore: z.number(),
  recommendedAmount: z.number(),
  reasoning: z.string(),
});

export type AIPrediction = z.infer<typeof aiPredictionSchema>;
