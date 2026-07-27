/*
  Warnings:

  - Added the required column `interestRate` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoanApplication" ADD COLUMN     "interestRate" DECIMAL(5,2) NOT NULL;
