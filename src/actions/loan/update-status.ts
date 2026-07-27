"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/admin";

import { ApplicationStatus } from "@/generated/prisma/enums";

interface UpdateLoanStatusInput {
  applicationId: string;
  status: ApplicationStatus;
}

export async function updateLoanStatus({
  applicationId,
  status,
}: UpdateLoanStatusInput) {
  await requireAdmin();

  await prisma.loanApplication.update({
    where: {
      id: applicationId,
    },
    data: {
      status,
    },
  });

  revalidatePath(`/dashboard/loan/${applicationId}`);
}
