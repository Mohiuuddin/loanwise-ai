import prisma from "@/lib/prisma";
import { DocumentType } from "@/generated/prisma/enums";

interface CreateDocumentInput {
  applicationId: string;
  type: DocumentType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}

export async function createDocument(data: CreateDocumentInput) {
  return prisma.uploadedDocument.create({
    data,
  });
}
