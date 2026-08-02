"use server";

import prisma from "@/lib/prisma";
import { UserStatus } from "@/generated/prisma/enums";

export async function validateLogin(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      status: true,
    },
  });

  if (!user) {
    return {
      success: true,
    };
  }

  if (user.status === UserStatus.INACTIVE) {
    return {
      success: false,
      message:
        "Your account has been deactivated. Please contact your administrator.",
    };
  }

  return {
    success: true,
  };
}
