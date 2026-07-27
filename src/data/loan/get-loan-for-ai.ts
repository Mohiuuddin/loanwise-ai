import prisma from "@/lib/prisma";

export async function getLoanForAI(applicationId: string) {
  return prisma.loanApplication.findUnique({
    where: {
      id: applicationId,
    },
    include: {
      employment: true,
      financialProfile: true,
      collateral: true,
    },
  });
}
