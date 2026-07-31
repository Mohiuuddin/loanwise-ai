import prisma from "@/lib/prisma";
import { ApplicationStatus } from "@/generated/prisma/enums";

export async function getApprovalRate(userId: string, isAdmin = false) {
  const where = isAdmin ? {} : { userId };

  const approved = await prisma.loanApplication.count({
    where: {
      ...where,
      status: ApplicationStatus.APPROVED,
    },
  });

  const rejected = await prisma.loanApplication.count({
    where: {
      ...where,
      status: ApplicationStatus.REJECTED,
    },
  });

  return [
    {
      name: "Approved",
      value: approved,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];
}
