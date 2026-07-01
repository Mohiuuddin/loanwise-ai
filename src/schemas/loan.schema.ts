import { z } from "zod";

export const loanSchema = z.object({
  loanAmount: z.number().min(1000, "Minimum loan amount is 1000"),

  loanPurpose: z.enum(["PERSONAL", "HOME", "AUTO", "BUSINESS", "EDUCATION"]),

  loanTermMonths: z.number().min(6).max(360),

  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "SELF_EMPLOYED",
    "BUSINESS",
    "UNEMPLOYED",
  ]),

  companyName: z.string(),

  jobTitle: z.string(),

  employmentYears: z.number(),

  monthlySalary: z.number(),

  monthlyExpense: z.number(),

  otherIncome: z.number(),

  existingLoanAmount: z.number(),

  bankBalance: z.number(),
});

export type LoanFormValues = z.infer<typeof loanSchema>;
