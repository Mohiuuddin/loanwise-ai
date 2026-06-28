import { ReactNode } from "react";

import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <main className="min-h-screen">{children}</main>;
}
