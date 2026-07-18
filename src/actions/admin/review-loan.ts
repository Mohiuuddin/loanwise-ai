"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { ApplicationStatus } from "@/generated/prisma/enums";

interface ReviewLoanProps {
  applicationId: string;
  status: ApplicationStatus;
  remarks: string;
}

export async function reviewLoan({
  applicationId,
  status,
  remarks,
}: ReviewLoanProps) {
  const approved = status === ApplicationStatus.APPROVED;

  await prisma.$transaction(async (tx) => {
    await tx.loanDecision.upsert({
      where: {
        applicationId,
      },
      update: {
        approved,
        remarks,
      },
      create: {
        applicationId,
        approved,
        remarks,
      },
    });

    await tx.loanApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        status,
      },
    });
  });

  revalidatePath("/admin");
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${applicationId}`);
}
