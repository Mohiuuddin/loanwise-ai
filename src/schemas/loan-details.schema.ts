import { z } from "zod";

export const loanDetailsSchema = z.object({
  loanAmount: z.number().min(1000, "Minimum loan amount is 1,000"),

  loanPurpose: z.enum(["PERSONAL", "HOME", "AUTO", "BUSINESS", "EDUCATION"]),

  loanTermMonths: z
    .number()
    .min(6, "Minimum loan term is 6 months")
    .max(360, "Maximum loan term is 360 months"),
});

export type LoanDetailsValues = z.infer<typeof loanDetailsSchema>;
