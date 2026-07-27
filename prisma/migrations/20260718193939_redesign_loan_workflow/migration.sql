/*
  Warnings:

  - The values [PASSPORT,UTILITY_BILL] on the enum `DocumentType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `loanTermMonths` on the `LoanApplication` table. All the data in the column will be lost.
  - Added the required column `disposableIncome` to the `AIPrediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedMonthlyEMI` to the `AIPrediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maximumAffordableEMI` to the `AIPrediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendedRepaymentTermMonths` to the `AIPrediction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "CollateralType" AS ENUM ('LAND', 'FLAT', 'BUILDING', 'VEHICLE', 'FDR_DPS_SAVINGS', 'BUSINESS_INVENTORY', 'GOVERNMENT_BOND', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "DocumentType_new" AS ENUM ('NID', 'BANK_STATEMENT', 'SALARY_SLIP');
ALTER TABLE "UploadedDocument" ALTER COLUMN "type" TYPE "DocumentType_new" USING ("type"::text::"DocumentType_new");
ALTER TYPE "DocumentType" RENAME TO "DocumentType_old";
ALTER TYPE "DocumentType_new" RENAME TO "DocumentType";
DROP TYPE "public"."DocumentType_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EmploymentType" ADD VALUE 'STUDENT';
ALTER TYPE "EmploymentType" ADD VALUE 'RETIRED';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LoanPurpose" ADD VALUE 'AGRICULTURE';
ALTER TYPE "LoanPurpose" ADD VALUE 'SME';
ALTER TYPE "LoanPurpose" ADD VALUE 'SOD';

-- AlterTable
ALTER TABLE "AIPrediction" ADD COLUMN     "affordability" TEXT,
ADD COLUMN     "creditAssessment" TEXT,
ADD COLUMN     "debtRatio" TEXT,
ADD COLUMN     "disposableIncome" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "employmentRisk" TEXT,
ADD COLUMN     "estimatedMonthlyEMI" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "maximumAffordableEMI" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "overallRecommendation" TEXT,
ADD COLUMN     "recommendedRepaymentTermMonths" INTEGER NOT NULL,
ADD COLUMN     "savingsStrength" TEXT;

-- AlterTable
ALTER TABLE "LoanApplication" DROP COLUMN "loanTermMonths";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Collateral" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "type" "CollateralType" NOT NULL,
    "customType" TEXT,
    "estimatedValue" DECIMAL(12,2) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collateral_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "LoanApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
