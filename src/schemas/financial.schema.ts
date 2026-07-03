import { z } from "zod";

export const financialSchema = z.object({
  creditScore: z
    .number()
    .min(300, "Minimum credit score is 300")
    .max(900, "Maximum credit score is 900"),

  monthlyExpenses: z.number().min(0, "Monthly expenses cannot be negative"),

  existingLoanEmi: z.number().min(0, "Existing EMI cannot be negative"),

  savings: z.number().min(0, "Savings cannot be negative"),
});

export type FinancialValues = z.infer<typeof financialSchema>;
