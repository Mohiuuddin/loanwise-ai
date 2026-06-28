"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { signOut } from "@/lib/auth/client";

import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      await signOut();

      toast.success("Signed out successfully.");

      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Unable to sign out.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button variant="destructive" onClick={handleLogout} disabled={isLoading}>
      {isLoading ? "Signing out..." : "Logout"}
    </Button>
  );
}
