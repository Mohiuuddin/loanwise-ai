import prisma from "@/lib/prisma";

import { AuditAction } from "@/generated/prisma/enums";

interface CreateAuditLogProps {
  userId: string;
  action: AuditAction;
  entity: string;
  entityId: string;
}

export async function createAuditLog({
  userId,
  action,
  entity,
  entityId,
}: CreateAuditLogProps) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      entity,
      entityId,
    },
  });
}
