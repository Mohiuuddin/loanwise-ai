import { LoanPurpose } from "@/generated/prisma/enums";

export const loanPurposeOptions = [
  { value: LoanPurpose.PERSONAL, label: "Personal" },
  { value: LoanPurpose.HOME, label: "Home Loan" },
  { value: LoanPurpose.AUTO, label: "Auto Loan" },
  { value: LoanPurpose.BUSINESS, label: "Business Loan" },
  { value: LoanPurpose.EDUCATION, label: "Education Loan" },
  { value: LoanPurpose.AGRICULTURE, label: "Agriculture Loan" },
  { value: LoanPurpose.SME, label: "SME Loan" },
  { value: LoanPurpose.SOD, label: "SOD (Secured Overdraft)" },
] as const;
