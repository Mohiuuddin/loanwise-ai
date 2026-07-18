import prisma from "@/lib/prisma";

export async function getAdminApplications() {
  return prisma.loanApplication.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },

      aiPrediction: {
        select: {
          riskScore: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}
