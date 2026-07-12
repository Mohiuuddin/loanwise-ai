import { randomUUID } from "crypto";

import { supabaseServer } from "@/lib/supabase/server";

interface UploadDocumentResult {
  filePath: string;
}

export async function uploadDocument(
  applicationId: string,
  file: File,
): Promise<UploadDocumentResult> {
  const extension = file.name.split(".").pop();

  const filePath = `${applicationId}/${randomUUID()}.${extension}`;

  const { error } = await supabaseServer.storage
    .from("loan-documents")
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  return {
    filePath,
  };
}
