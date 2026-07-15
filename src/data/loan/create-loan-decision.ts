import prisma from "@/lib/prisma";
import { ApplicationStatus } from "@/generated/prisma/enums";

interface Input {
  applicationId: string;
  approved: boolean;
  remarks?: string;
}

export async function createLoanDecision(data: Input) {
  return prisma.$transaction(async (tx) => {
    const decision = await tx.loanDecision.create({
      data: {
        applicationId: data.applicationId,
        approved: data.approved,
        remarks: data.remarks,
      },
    });

    await tx.loanApplication.update({
      where: {
        id: data.applicationId,
      },
      data: {
        status: data.approved
          ? ApplicationStatus.APPROVED
          : ApplicationStatus.REJECTED,
      },
    });

    return decision;
  });
}
