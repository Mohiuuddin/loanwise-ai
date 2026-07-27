import { z } from "zod";

import { loanDetailsSchema } from "./loan-details.schema";
import { collateralSchema } from "./collateral.schema";
import { employmentSchema } from "./employment.schema";
import { financialSchema } from "./financial.schema";
import { documentSchema } from "./document.schema";

export const loanApplicationSchema = loanDetailsSchema
  .merge(collateralSchema)
  .merge(employmentSchema)
  .merge(financialSchema)
  .merge(documentSchema)
  .superRefine((data, ctx) => {
    switch (data.loanPurpose) {
      // ===============================
      // Collateral NOT Allowed
      // ===============================
      case "PERSONAL":
      case "EDUCATION": {
        if (data.collaterals.length > 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["collaterals"],
            message: "Collateral is not allowed for this loan type.",
          });
        }

        break;
      }

      // ===============================
      // Collateral REQUIRED
      // ===============================
      case "HOME":
      case "AUTO":
      case "BUSINESS":
      case "SOD": {
        if (data.collaterals.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["collaterals"],
            message: "At least one collateral is required.",
          });

          return;
        }

        data.collaterals.forEach((item, index) => {
          if (!item.type) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["collaterals", index, "type"],
              message: "Collateral type is required.",
            });
          }

          if (item.estimatedValue == null) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["collaterals", index, "estimatedValue"],
              message: "Estimated value is required.",
            });
          }

          if (item.type === "OTHER" && item.customType.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["collaterals", index, "customType"],
              message: "Please specify the collateral type.",
            });
          }
        });

        break;
      }

      // ===============================
      // Optional Collateral
      // ===============================
      case "SME":
      case "AGRICULTURE": {
        data.collaterals.forEach((item, index) => {
          if (!item.type) return;

          if (item.estimatedValue == null) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["collaterals", index, "estimatedValue"],
              message: "Estimated value is required.",
            });
          }

          if (item.type === "OTHER" && item.customType.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["collaterals", index, "customType"],
              message: "Please specify the collateral type.",
            });
          }
        });

        break;
      }
    }
  });

// export const loanDocumentSchema = documentSchema;

// export type LoanDocumentValues = z.infer<typeof loanDocumentSchema>;
export type LoanApplicationValues = z.infer<typeof loanApplicationSchema>;
