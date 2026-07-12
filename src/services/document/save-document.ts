import prisma from "@/lib/prisma";
import { DocumentType } from "@/generated/prisma/enums";

interface SaveDocumentInput {
  applicationId: string;
  type: DocumentType;
  filePath: string;
  file: File;
}

export async function saveDocument({
  applicationId,
  type,
  filePath,
  file,
}: SaveDocumentInput) {
  return prisma.uploadedDocument.create({
    data: {
      applicationId,
      type,
      fileName: file.name,
      fileUrl: filePath,
      fileSize: file.size,
      mimeType: file.type,
    },
  });
}
