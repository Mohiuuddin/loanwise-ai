import prisma from "@/lib/prisma";
import { ApplicationStatus } from "@/generated/prisma/enums";

export async function getDashboardStats(userId: string, isAdmin = false) {
  const applicationWhere = isAdmin ? {} : { userId };

  const predictionWhere = isAdmin
    ? {}
    : {
        application: {
          userId,
        },
      };

  const [
    total,
    pending,
    approved,
    rejected,
    averageRisk,
    averageConfidence,
    totalRequested,
    totalRecommended,
  ] = await Promise.all([
    prisma.loanApplication.count({
      where: applicationWhere,
    }),

    prisma.loanApplication.count({
      where: {
        ...applicationWhere,
        status: ApplicationStatus.PENDING,
      },
    }),

    prisma.loanApplication.count({
      where: {
        ...applicationWhere,
        status: ApplicationStatus.APPROVED,
      },
    }),

    prisma.loanApplication.count({
      where: {
        ...applicationWhere,
        status: ApplicationStatus.REJECTED,
      },
    }),

    prisma.aIPrediction.aggregate({
      where: predictionWhere,
      _avg: {
        riskScore: true,
      },
    }),

    prisma.aIPrediction.aggregate({
      where: predictionWhere,
      _avg: {
        confidenceScore: true,
      },
    }),

    prisma.loanApplication.aggregate({
      where: applicationWhere,
      _sum: {
        loanAmount: true,
      },
    }),

    prisma.aIPrediction.aggregate({
      where: predictionWhere,
      _sum: {
        recommendedAmount: true,
      },
    }),
  ]);

  return {
    total,
    pending,
    approved,
    rejected,

    averageRisk: Number(averageRisk._avg.riskScore ?? 0).toFixed(1),

    averageConfidence: Number(
      averageConfidence._avg.confidenceScore ?? 0,
    ).toFixed(1),

    totalRequested: Number(totalRequested._sum.loanAmount ?? 0),

    totalRecommended: Number(totalRecommended._sum.recommendedAmount ?? 0),
  };
}
