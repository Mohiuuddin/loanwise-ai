/*
  Warnings:

  - Added the required column `applicantName` to the `LoanApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoanApplication" ADD COLUMN     "applicantName" TEXT NOT NULL;
