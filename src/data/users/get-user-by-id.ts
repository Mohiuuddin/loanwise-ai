import prisma from "@/lib/prisma";

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      status: true,
      createdAt: true,

      loanApplications: {
        orderBy: {
          createdAt: "desc",
        },

        take: 5,

        select: {
          id: true,
          applicantName: true,
          loanAmount: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });
}
