import { ReactNode } from "react";

import Header from "./header";
import AppSidebar from "./app-sidebar";
import { getCurrentSession } from "@/lib/auth/auth";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getCurrentSession();

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role={session?.user.role ?? "USER"} />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  );
}
