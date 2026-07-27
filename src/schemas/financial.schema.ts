import { z } from "zod";

export const financialSchema = z.object({
  creditScore: z.number(),

  monthlyExpenses: z.number(),

  existingLoanEmi: z.number().min(0),

  bankBalance: z.number(),
});

export type FinancialValues = z.infer<typeof financialSchema>;
