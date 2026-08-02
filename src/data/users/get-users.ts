import prisma from "@/lib/prisma";
import { UserRole, UserStatus } from "@/generated/prisma/enums";
const PAGE_SIZE = 10;

interface GetUsersParams {
  page?: number;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
}

export async function getUsers({
  page = 1,
  search = "",
  role,
  status,
}: GetUsersParams) {
  const skip = (page - 1) * PAGE_SIZE;

  const where = {
    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    }),

    ...(role && { role }),

    ...(status && { status }),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: PAGE_SIZE,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
      },
    }),

    prisma.user.count({
      where,
    }),
  ]);

  return {
    users,
    page,
    total,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
}
