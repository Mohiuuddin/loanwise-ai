"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

import { getCurrentSession } from "@/lib/auth/auth";
import { createAuditLog } from "@/lib/audit-log";

import { ApplicationStatus, AuditAction } from "@/generated/prisma/enums";

interface UpdateApplicationStatusProps {
  applicationId: string;
  status: ApplicationStatus;
}

export async function updateApplicationStatus({
  applicationId,
  status,
}: UpdateApplicationStatusProps) {
  const session = await getCurrentSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await prisma.loanApplication.update({
    where: {
      id: applicationId,
    },
    data: {
      status,
    },
  });

  await createAuditLog({
    userId: session.user.id,
    action: AuditAction.UPDATE_APPLICATION,
    entity: "LoanApplication",
    entityId: applicationId,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${applicationId}`);
}
