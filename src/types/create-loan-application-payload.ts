import { LoanApplicationValues } from "@/schemas/loan-application.schema";

export interface CreateLoanApplicationPayload {
  application: LoanApplicationValues;
}
