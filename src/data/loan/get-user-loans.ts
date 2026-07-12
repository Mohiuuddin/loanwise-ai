import prisma from "@/lib/prisma";

export async function getUserLoans(userId: string) {
  return prisma.loanApplication.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      loanAmount: true,
      loanPurpose: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
