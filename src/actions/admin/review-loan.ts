"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

import { getCurrentSession } from "@/lib/auth/auth";
import { createAuditLog } from "@/lib/audit-log";

import { ApplicationStatus, AuditAction } from "@/generated/prisma/enums";

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
  const session = await getCurrentSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

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

  await createAuditLog({
    userId: session.user.id,
    action: approved
      ? AuditAction.APPROVE_APPLICATION
      : AuditAction.REJECT_APPLICATION,
    entity: "LoanApplication",
    entityId: applicationId,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${applicationId}`);
}
