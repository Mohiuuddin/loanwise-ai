import prisma from "@/lib/prisma";

const PAGE_SIZE = 5;

export async function getUserLoans(userId: string, page = 1) {
  const skip = (page - 1) * PAGE_SIZE;

  const [loans, total] = await Promise.all([
    prisma.loanApplication.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: PAGE_SIZE,
    }),

    prisma.loanApplication.count({
      where: {
        userId,
      },
    }),
  ]);

  return {
    loans,
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };

  // return prisma.loanApplication.findMany({
  //   where: {
  //     userId,
  //   },
  //   select: {
  //     id: true,
  //     applicantName: true,
  //     loanAmount: true,
  //     loanPurpose: true,
  //     status: true,
  //     createdAt: true,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });
}

export async function getAllLoans(page = 1) {
  const skip = (page - 1) * PAGE_SIZE;

  const [loans, total] = await Promise.all([
    prisma.loanApplication.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: PAGE_SIZE,
    }),

    prisma.loanApplication.count(),
  ]);

  return {
    loans,
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };

  // return prisma.loanApplication.findMany({
  //   select: {
  //     id: true,
  //     applicantName: true,
  //     loanAmount: true,
  //     loanPurpose: true,
  //     status: true,
  //     createdAt: true,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });
}
