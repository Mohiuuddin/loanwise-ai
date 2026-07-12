import prisma from "@/lib/prisma";

import { CreateLoanApplicationInput } from "@/schemas/create-loan-application.schema";

export async function createLoan(
  userId: string,
  data: CreateLoanApplicationInput,
) {
  return prisma.$transaction(async (tx) => {
    const application = await tx.loanApplication.create({
      data: {
        userId,
        loanAmount: data.loanAmount,
        loanPurpose: data.loanPurpose,
        loanTermMonths: data.loanTermMonths,
      },
    });

    await tx.employment.create({
      data: {
        applicationId: application.id,
        employmentType: data.employmentType,
        companyName: data.employerName,
        employmentYears: data.yearsEmployed,
        monthlySalary: data.monthlyIncome,
      },
    });

    await tx.financialProfile.create({
      data: {
        applicationId: application.id,
        creditScore: data.creditScore,
        monthlyExpense: data.monthlyExpenses,
        existingLoanAmount: data.existingLoanEmi,
        bankBalance: data.savings,
      },
    });

    return {
      applicationId: application.id,
    };
  });
}
