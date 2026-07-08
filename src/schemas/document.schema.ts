import { z } from "zod";

export const documentSchema = z.object({
  salarySlip: z.any().optional(),

  bankStatement: z.any().optional(),

  nationalId: z.any().optional(),
});

export type DocumentValues = z.infer<typeof documentSchema>;
