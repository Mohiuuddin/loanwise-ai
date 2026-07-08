import { z } from "zod";

export const createLoanApplicationSchema = z.object({
  loanAmount: z.number(),
  loanPurpose: z.enum(["PERSONAL", "HOME", "AUTO", "BUSINESS", "EDUCATION"]),
  loanTermMonths: z.number(),

  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "SELF_EMPLOYED",
    "BUSINESS",
    "UNEMPLOYED",
    "STUDENT",
    "RETIRED",
  ]),
  employerName: z.string(),
  monthlyIncome: z.number(),
  yearsEmployed: z.number(),

  creditScore: z.number(),
  monthlyExpenses: z.number(),
  existingLoanEmi: z.number(),
  savings: z.number(),
});

export type CreateLoanApplicationInput = z.infer<
  typeof createLoanApplicationSchema
>;
