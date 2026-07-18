import { requireAdmin } from "@/lib/auth/admin";

import { getAdminApplications } from "@/data/admin/get-admin-applications";

import AdminApplicationsTable from "@/components/admin/admin-applications-table";

export default async function AdminApplicationsPage() {
  await requireAdmin();

  const applications = await getAdminApplications();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Loan Applications</h1>

      <AdminApplicationsTable applications={applications} />
    </div>
  );
}
