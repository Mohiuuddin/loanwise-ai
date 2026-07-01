import { EmploymentType, LoanPurpose } from "@/generated/prisma/enums";

export interface LoanFormData {
  loanAmount: number;
  loanPurpose: LoanPurpose;
  loanTermMonths: number;

  employmentType: EmploymentType;
  companyName: string;
  jobTitle: string;
  employmentYears: number;
  monthlySalary: number;

  monthlyExpense: number;
  otherIncome: number;
  existingLoanAmount: number;
  bankBalance: number;
}
