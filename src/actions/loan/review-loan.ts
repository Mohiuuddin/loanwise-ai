"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/admin";

import { ApplicationStatus } from "@/generated/prisma/enums";

interface ReviewLoanInput {
  applicationId: string;
  status: ApplicationStatus;
  remarks: string;
}

export async function reviewLoan({
  applicationId,
  status,
  remarks,
}: ReviewLoanInput) {
  await requireAdmin();

  // Under Review should NOT create a final decision
  if (status === ApplicationStatus.UNDER_REVIEW) {
    await prisma.loanApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        status,
      },
    });

    revalidatePath(`/dashboard/loan/${applicationId}`);
    revalidatePath("/dashboard/loan");

    return;
  }

  // Final decision
  const approved = status === ApplicationStatus.APPROVED;

  await prisma.loanApplication.update({
    where: {
      id: applicationId,
    },
    data: {
      status,

      loanDecision: {
        upsert: {
          create: {
            approved,
            remarks,
          },
          update: {
            approved,
            remarks,
          },
        },
      },
    },
  });

  revalidatePath(`/dashboard/loan/${applicationId}`);
  revalidatePath("/dashboard/loan");
}
