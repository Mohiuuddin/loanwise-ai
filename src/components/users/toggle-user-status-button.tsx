"use client";

import { useTransition } from "react";

import { toast } from "sonner";

import { UserStatus } from "@/generated/prisma/enums";

import { toggleUserStatus } from "@/actions/users/toggle-user-status";

import { Button } from "@/components/ui/button";

interface ToggleUserStatusButtonProps {
  userId: string;
  status: UserStatus;
}

export default function ToggleUserStatusButton({
  userId,
  status,
}: ToggleUserStatusButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      try {
        await toggleUserStatus(userId);

        toast.success(
          status === UserStatus.ACTIVE
            ? "User deactivated successfully."
            : "User activated successfully.",
        );
      } catch {
        toast.error("Something went wrong.");
      }
    });
  }

  return (
    <Button
      variant={status === UserStatus.ACTIVE ? "destructive" : "default"}
      disabled={isPending}
      className="cursor-pointer"
      onClick={handleClick}
    >
      {isPending
        ? "Updating..."
        : status === UserStatus.ACTIVE
          ? "Deactivate"
          : "Activate"}
    </Button>
  );
}
