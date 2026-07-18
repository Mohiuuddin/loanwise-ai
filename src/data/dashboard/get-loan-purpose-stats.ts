import prisma from "@/lib/prisma";

export async function getLoanPurposeStats(userId: string) {
  return prisma.loanApplication.groupBy({
    by: ["loanPurpose"],

    where: {
      userId,
    },

    _count: {
      loanPurpose: true,
    },
  });
}
