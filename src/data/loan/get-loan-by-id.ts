import prisma from "@/lib/prisma";

export async function getLoanById(applicationId: string, userId: string) {
  return prisma.loanApplication.findFirst({
    where: {
      id: applicationId,
      userId,
    },
    include: {
      employment: true,
      financialProfile: true,
      documents: true,
      aiPrediction: true,
      loanDecision: true,
    },
  });
}
