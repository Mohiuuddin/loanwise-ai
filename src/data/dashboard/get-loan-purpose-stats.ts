import prisma from "@/lib/prisma";

export async function getLoanPurposeStats(userId: string, isAdmin = false) {
  return prisma.loanApplication.groupBy({
    by: ["loanPurpose"],

    where: isAdmin ? {} : { userId },

    _count: {
      loanPurpose: true,
    },
  });
}
