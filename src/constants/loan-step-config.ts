import { LoanApplicationValues } from "@/schemas/loan-application.schema";

export const loanSteps = [
  "Loan Details",
  "Employment",
  "Financial",
  "Documents",
  "Review",
] as const;

export const stepFields: (keyof LoanApplicationValues)[][] = [
  ["loanAmount", "loanPurpose", "loanTermMonths"],
  ["employmentType", "employerName", "monthlyIncome", "yearsEmployed"],
  ["creditScore", "monthlyExpenses", "existingLoanEmi", "savings"],
  ["salarySlip", "bankStatement", "nationalId"],
  [], // Review
];

export const totalLoanSteps = loanSteps.length;
