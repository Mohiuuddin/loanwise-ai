import prisma from "@/lib/prisma";

export async function getLoanById(
  applicationId: string,
  userId?: string,
  isAdmin = false,
) {
  return prisma.loanApplication.findFirst({
    where: {
      id: applicationId,

      ...(isAdmin ? {} : { userId }),
    },

    include: {
      employment: true,
      collateral: true,
      financialProfile: true,
      documents: true,
      aiPrediction: true,
      loanDecision: true,
      user: true,
    },
  });
}
