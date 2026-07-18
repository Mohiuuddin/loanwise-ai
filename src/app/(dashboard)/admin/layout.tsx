import { ReactNode } from "react";

import { requireAdmin } from "@/lib/auth/admin";

import Header from "@/components/layout/header";
import AdminSidebar from "@/components/layout/admin-sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  );
}
