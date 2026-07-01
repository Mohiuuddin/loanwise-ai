import { ReactNode } from "react";
import { redirect } from "next/navigation";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { getSession } from "@/lib/auth/session";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
