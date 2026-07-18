import prisma from "@/lib/prisma";

export async function getMonthlyApplications(userId: string) {
  const loans = await prisma.loanApplication.findMany({
    where: {
      userId,
    },

    select: {
      createdAt: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  });

  const monthly = new Map<string, number>();

  loans.forEach((loan) => {
    const month = loan.createdAt.toLocaleString("default", {
      month: "short",
    });

    monthly.set(month, (monthly.get(month) ?? 0) + 1);
  });

  return Array.from(monthly.entries()).map(([month, applications]) => ({
    month,
    applications,
  }));
}
