import prisma from "@/lib/prisma";
import { ApplicationStatus } from "@/generated/prisma/enums";

export async function getAdminDashboardStats() {
  const [total, pending, underReview, approved, rejected] = await Promise.all([
    prisma.loanApplication.count(),

    prisma.loanApplication.count({
      where: {
        status: ApplicationStatus.PENDING,
      },
    }),

    prisma.loanApplication.count({
      where: {
        status: ApplicationStatus.UNDER_REVIEW,
      },
    }),

    prisma.loanApplication.count({
      where: {
        status: ApplicationStatus.APPROVED,
      },
    }),

    prisma.loanApplication.count({
      where: {
        status: ApplicationStatus.REJECTED,
      },
    }),
  ]);

  return {
    total,
    pending,
    underReview,
    approved,
    rejected,
  };
}
