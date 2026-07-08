import { z } from "zod";

import { loanDetailsSchema } from "./loan-details.schema";
import { employmentSchema } from "./employment.schema";
import { financialSchema } from "./financial.schema";
import { documentSchema } from "./document.schema";

export const loanApplicationSchema = loanDetailsSchema
  .merge(employmentSchema)
  .merge(financialSchema)
  .merge(documentSchema);

export type LoanApplicationValues = z.infer<typeof loanApplicationSchema>;
