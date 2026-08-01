"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth/auth";

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export async function changePassword({
  currentPassword,
  newPassword,
}: ChangePasswordInput) {
  const result = await auth.api.changePassword({
    headers: await headers(),
    body: {
      currentPassword,
      newPassword,
    },
  });

  return result;
}
