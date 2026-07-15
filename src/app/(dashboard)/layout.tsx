import { ReactNode } from "react";
import { redirect } from "next/navigation";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { getCurrentSession } from "@/lib/auth/auth";
interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
