"use server";

import { revalidatePath } from "next/cache";

import { UserStatus } from "@/generated/prisma/enums";

import prisma from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth/auth";

export async function toggleUserStatus(userId: string) {
  const session = await getCurrentSession();

  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const newStatus =
    user.status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: newStatus,
    },
  });

  revalidatePath("/dashboard/users");
  revalidatePath(`/dashboard/users/${userId}`);

  return {
    success: true,
  };
}
