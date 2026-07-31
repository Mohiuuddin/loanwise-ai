import prisma from "@/lib/prisma";

export async function getRecentApplications(userId: string, isAdmin = false) {
  return prisma.loanApplication.findMany({
    where: isAdmin ? {} : { userId },

    include: {
      aiPrediction: true,
      loanDecision: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 5,
  });
}
