"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth/auth";
import { supabaseServer } from "@/lib/supabase/server";

export async function updateProfilePhoto(file: File) {
  const session = await getCurrentSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const extension = file.name.split(".").pop();

  const filePath = `${session.user.id}/${Date.now()}.${extension}`;

  const { error } = await supabaseServer.storage
    .from("profile-images")
    .upload(filePath, file, {
      upsert: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabaseServer.storage.from("profile-images").getPublicUrl(filePath);

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      image: publicUrl,
    },
  });

  revalidatePath("/dashboard/profile");

  return {
    success: true,
    image: publicUrl,
  };
}
