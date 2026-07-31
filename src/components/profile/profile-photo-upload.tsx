"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { updateProfilePhoto } from "@/actions/profile/update-profile-photo";

export default function ProfilePhotoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    startTransition(async () => {
      await updateProfilePhoto(file);
      router.refresh();
    });
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />

      <Button
        variant="outline"
        className="cursor-pointer"
        disabled={isPending}
        onClick={() => inputRef.current?.click()}
      >
        {isPending ? "Uploading..." : "Change Profile Photo"}
      </Button>
    </>
  );
}
