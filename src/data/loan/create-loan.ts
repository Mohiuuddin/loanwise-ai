import prisma from "@/lib/prisma";

import { LoanApplicationValues } from "@/schemas/loan-application.schema";

export async function createLoan(userId: string, data: LoanApplicationValues) {
  return prisma.$transaction(async (tx) => {
    // Loan Application
    const application = await tx.loanApplication.create({
      data: {
        userId,
        applicantName: data.applicantName,
        loanAmount: data.loanAmount,
        loanPurpose: data.loanPurpose,
        interestRate: data.interestRate,
      },
    });

    // Employment
    await tx.employment.create({
      data: {
        applicationId: application.id,
        employmentType: data.employmentType,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        employmentYears: data.employmentYears,
        monthlySalary: data.monthlySalary,
      },
    });

    // Financial Profile
    await tx.financialProfile.create({
      data: {
        applicationId: application.id,
        creditScore: data.creditScore,
        monthlyExpense: data.monthlyExpenses,
        existingLoanAmount: data.existingLoanEmi,
        bankBalance: data.bankBalance,
      },
    });

    // Collateral (only if any exists)
    if (data.collaterals.length > 0) {
      await tx.collateral.createMany({
        data: data.collaterals.map((collateral) => ({
          applicationId: application.id,

          // safe because schema already validates required loan types
          type: collateral.type!,

          estimatedValue: collateral.estimatedValue!,

          customType:
            collateral.type === "OTHER" ? collateral.customType : null,

          description:
            collateral.description.trim() === ""
              ? null
              : collateral.description,
        })),
      });
    }

    return {
      applicationId: application.id,
    };
  });
}
