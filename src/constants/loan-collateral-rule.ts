import { CollateralType, LoanPurpose } from "@/generated/prisma/enums";

export type CollateralRequirement = "required" | "optional" | "none";

export interface LoanCollateralRule {
  collateral: CollateralRequirement;
  allowedCollateral: CollateralType[];
}

export const loanCollateralRules: Record<LoanPurpose, LoanCollateralRule> = {
  PERSONAL: {
    collateral: "none",
    allowedCollateral: [],
  },

  EDUCATION: {
    collateral: "none",
    allowedCollateral: [],
  },

  HOME: {
    collateral: "required",
    allowedCollateral: [
      CollateralType.LAND,
      CollateralType.FLAT,
      CollateralType.BUILDING,
      CollateralType.FDR_DPS_SAVINGS,
      CollateralType.GOVERNMENT_BOND,
      CollateralType.OTHER,
    ],
  },

  AUTO: {
    collateral: "required",
    allowedCollateral: [
      CollateralType.VEHICLE,
      CollateralType.FDR_DPS_SAVINGS,
      CollateralType.GOVERNMENT_BOND,
      CollateralType.OTHER,
    ],
  },

  BUSINESS: {
    collateral: "required",
    allowedCollateral: [
      CollateralType.LAND,
      CollateralType.BUILDING,
      CollateralType.BUSINESS_INVENTORY,
      CollateralType.VEHICLE,
      CollateralType.FDR_DPS_SAVINGS,
      CollateralType.GOVERNMENT_BOND,
      CollateralType.OTHER,
    ],
  },

  SME: {
    collateral: "optional",
    allowedCollateral: [
      CollateralType.BUSINESS_INVENTORY,
      CollateralType.LAND,
      CollateralType.BUILDING,
      CollateralType.FDR_DPS_SAVINGS,
      CollateralType.GOVERNMENT_BOND,
      CollateralType.OTHER,
    ],
  },

  AGRICULTURE: {
    collateral: "optional",
    allowedCollateral: [
      CollateralType.LAND,
      CollateralType.VEHICLE,
      CollateralType.FDR_DPS_SAVINGS,
      CollateralType.OTHER,
    ],
  },

  SOD: {
    collateral: "required",
    allowedCollateral: [
      CollateralType.FDR_DPS_SAVINGS,
      CollateralType.GOVERNMENT_BOND,
    ],
  },
};
