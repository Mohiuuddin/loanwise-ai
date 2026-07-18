import { getAuditLogs } from "@/data/admin/get-audit-logs";

import AdminAuditTable from "@/components/admin/admin-audit-table";

export default async function AdminAuditLogsPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Audit Logs</h1>

        <p className="text-muted-foreground">
          View all recorded system and administrator activities.
        </p>
      </div>

      <AdminAuditTable logs={logs} />
    </div>
  );
}
