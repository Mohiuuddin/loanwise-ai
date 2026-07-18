import prisma from "@/lib/prisma";

export async function getAuditLogs() {
  return prisma.auditLog.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}
