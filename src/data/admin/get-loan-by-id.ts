import prisma from "@/lib/prisma";

export async function getLoanById(id: string) {
  return prisma.loanApplication.findUnique({
    where: {
      id,
    },

    include: {
      user: true,
      employment: true,
      financialProfile: true,
      documents: true,
      aiPrediction: true,
      loanDecision: true,
    },
  });
}
