import { z } from "zod";

import { loanDetailsSchema } from "./loan-details.schema";

export const loanApplicationSchema = loanDetailsSchema.extend({});

export type LoanApplicationValues = z.infer<typeof loanApplicationSchema>;
