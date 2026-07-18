import { requireAdmin } from "@/lib/auth/admin";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await requireAdmin();

  return (
    <div className="flex">
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
