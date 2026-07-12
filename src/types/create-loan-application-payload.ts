import { CreateLoanApplicationInput } from "@/schemas/create-loan-application.schema";

export interface CreateLoanApplicationPayload {
  application: CreateLoanApplicationInput;

  documents: {
    nationalId?: File;
    salarySlip?: File;
    bankStatement?: File;
  };
}
