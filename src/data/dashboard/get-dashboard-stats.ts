import prisma from "@/lib/prisma";
import { ApplicationStatus } from "@/generated/prisma/enums";

export async function getDashboardStats(userId: string) {
  const [total, pending, approved, rejected] = await Promise.all([
    prisma.loanApplication.count({
      where: { userId },
    }),

    prisma.loanApplication.count({
      where: {
        userId,
        status: ApplicationStatus.PENDING,
      },
    }),

    prisma.loanApplication.count({
      where: {
        userId,
        status: ApplicationStatus.APPROVED,
      },
    }),

    prisma.loanApplication.count({
      where: {
        userId,
        status: ApplicationStatus.REJECTED,
      },
    }),
  ]);

  return {
    total,
    pending,
    approved,
    rejected,
  };
}
