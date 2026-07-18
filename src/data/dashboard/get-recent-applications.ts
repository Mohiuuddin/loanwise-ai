import prisma from "@/lib/prisma";

export async function getRecentApplications(userId: string) {
  return prisma.loanApplication.findMany({
    where: { userId },
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
