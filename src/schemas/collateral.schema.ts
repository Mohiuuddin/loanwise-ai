import { z } from "zod";

export const collateralItemSchema = z.object({
  type: z
    .enum([
      "LAND",
      "FLAT",
      "BUILDING",
      "VEHICLE",
      "FDR_DPS_SAVINGS",
      "BUSINESS_INVENTORY",
      "GOVERNMENT_BOND",
      "OTHER",
    ])
    .optional(),

  customType: z.string(),

  estimatedValue: z.number().positive().optional(),

  description: z.string(),
});

export const collateralSchema = z.object({
  collaterals: z.array(collateralItemSchema),
});

export type CollateralItemValues = z.infer<typeof collateralItemSchema>;
export type CollateralValues = z.infer<typeof collateralSchema>;
