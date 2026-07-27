import { z } from "zod";

export const loanDetailsSchema = z.object({
  applicantName: z.string().trim().min(2, "Applicant name is required"),

  loanAmount: z.number().min(1000, "Minimum loan amount is 1,000"),

  interestRate: z.number().min(0.1).max(50),

  loanPurpose: z.enum([
    "PERSONAL",
    "HOME",
    "AUTO",
    "BUSINESS",
    "EDUCATION",
    "AGRICULTURE",
    "SME",
    "SOD",
  ]),
});

export type LoanDetailsValues = z.infer<typeof loanDetailsSchema>;
