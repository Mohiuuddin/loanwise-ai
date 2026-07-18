import { getAuditLogs } from "@/data/admin/get-audit-logs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AdminAuditTableProps {
  logs: Awaited<ReturnType<typeof getAuditLogs>>;
}

export default function AdminAuditTable({ logs }: AdminAuditTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>

          <TableHead>User</TableHead>

          <TableHead>Email</TableHead>

          <TableHead>Action</TableHead>

          <TableHead>Entity</TableHead>

          <TableHead>Entity ID</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {logs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No audit logs found.
            </TableCell>
          </TableRow>
        ) : (
          logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.createdAt.toLocaleString()}</TableCell>

              <TableCell>{log.user.name}</TableCell>

              <TableCell>{log.user.email}</TableCell>

              <TableCell>{log.action}</TableCell>

              <TableCell>{log.entity}</TableCell>

              <TableCell className="font-mono text-xs">
                {log.entityId}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
