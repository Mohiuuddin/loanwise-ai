"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { ApplicationStatus } from "@/generated/prisma/enums";

interface UpdateApplicationStatusProps {
  applicationId: string;
  status: ApplicationStatus;
}

export async function updateApplicationStatus({
  applicationId,
  status,
}: UpdateApplicationStatusProps) {
  await prisma.loanApplication.update({
    where: {
      id: applicationId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${applicationId}`);
}
