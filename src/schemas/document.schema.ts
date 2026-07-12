import { z } from "zod";

export const documentSchema = z.object({
  nationalId: z.instanceof(File).optional(),

  salarySlip: z.instanceof(File).optional(),

  bankStatement: z.instanceof(File).optional(),
});

export type DocumentValues = z.infer<typeof documentSchema>;
