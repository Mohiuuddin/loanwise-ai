import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/auth";

import { getAuditLogs } from "@/data/audit/get-audit-logs";

import AuditLogTable from "@/components/audit/audit-log-table";

export default async function AuditLogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const auditData = await getAuditLogs(currentPage);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Audit Log</h1>

        <p className="mt-2 text-muted-foreground">
          View all important actions performed in the system.
        </p>
      </div>

      <AuditLogTable
        logs={auditData.logs}
        page={auditData.page}
        totalPages={auditData.totalPages}
      />
    </div>
  );
}
