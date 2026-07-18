"use server";

import { createLoanApplicationSchema } from "@/schemas/create-loan-application.schema";

import { createLoan } from "@/data/loan/create-loan";

import { getCurrentSession } from "@/lib/auth/auth";
import { CreateLoanApplicationPayload } from "@/types/create-loan-application-payload";

import { uploadDocument } from "@/lib/supabase/storage";
import { createDocument } from "@/data/document/create-document";

import { AuditAction, DocumentType } from "@/generated/prisma/enums";

import { createAuditLog } from "@/lib/audit-log";

export async function createLoanApplication(
  payload: CreateLoanApplicationPayload,
) {
  const validatedData = createLoanApplicationSchema.parse(payload.application);

  const session = await getCurrentSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const loan = await createLoan(session.user.id, validatedData);

  const documents = [
    {
      file: payload.documents.nationalId,
      type: DocumentType.NID,
    },
    {
      file: payload.documents.salarySlip,
      type: DocumentType.SALARY_SLIP,
    },
    {
      file: payload.documents.bankStatement,
      type: DocumentType.BANK_STATEMENT,
    },
  ];

  for (const document of documents) {
    if (!document.file) continue;

    const uploaded = await uploadDocument(loan.applicationId, document.file);

    await createDocument({
      applicationId: loan.applicationId,
      type: document.type,
      fileName: document.file.name,
      fileUrl: uploaded.publicUrl,
      fileSize: document.file.size,
      mimeType: document.file.type,
    });
  }

  await createAuditLog({
    userId: session.user.id,
    action: AuditAction.CREATE_APPLICATION,
    entity: "LoanApplication",
    entityId: loan.applicationId,
  });

  return loan;
}
