"use server";

import { loanApplicationSchema } from "@/schemas/loan-application.schema";

import { createLoan } from "@/data/loan/create-loan";
import { createDocument } from "@/data/document/create-document";

import { getCurrentSession } from "@/lib/auth/auth";
import { uploadDocument } from "@/lib/supabase/storage";

import { createAuditLog } from "@/lib/audit-log";

import { CreateLoanApplicationPayload } from "@/types/create-loan-application-payload";

import { AuditAction, DocumentType } from "@/generated/prisma/enums";

export async function createLoanApplication(
  payload: CreateLoanApplicationPayload,
) {
  const validatedData = loanApplicationSchema.parse(payload.application);

  const session = await getCurrentSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const loan = await createLoan(session.user.id, validatedData);

  const documents = [
    {
      file: validatedData.nationalId,
      type: DocumentType.NID,
    },
    {
      file: validatedData.salarySlip,
      type: DocumentType.SALARY_SLIP,
    },
    {
      file: validatedData.bankStatement,
      type: DocumentType.BANK_STATEMENT,
    },
  ];

  for (const document of documents) {
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
