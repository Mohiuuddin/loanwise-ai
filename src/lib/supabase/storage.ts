import { randomUUID } from "crypto";

import { supabaseServer } from "./server";

export async function uploadDocument(applicationId: string, file: File) {
  const extension = file.name.split(".").pop();

  const filePath = `${applicationId}/${randomUUID()}.${extension}`;

  const { error } = await supabaseServer.storage
    .from("loan-documents")
    .upload(filePath, file, {
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabaseServer.storage.from("loan-documents").getPublicUrl(filePath);

  return {
    filePath,
    publicUrl,
  };
}
