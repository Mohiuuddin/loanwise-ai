import Link from "next/link";

import { AuditAction, Prisma } from "@/generated/prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type AuditLog = Prisma.AuditLogGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        email: true;
      };
    };
  };
}>;

interface AuditLogTableProps {
  logs: AuditLog[];
  page: number;
  totalPages: number;
}

function getBadgeVariant(action: AuditAction) {
  switch (action) {
    case AuditAction.LOGIN:
      return "default";

    case AuditAction.LOGOUT:
      return "secondary";

    case AuditAction.CREATE_APPLICATION:
      return "default";

    case AuditAction.UPDATE_APPLICATION:
      return "secondary";

    case AuditAction.UPLOAD_DOCUMENT:
      return "outline";

    case AuditAction.GENERATE_AI_RESULT:
      return "default";

    case AuditAction.APPROVE_APPLICATION:
      return "default";

    case AuditAction.REJECT_APPLICATION:
      return "destructive";

    default:
      return "secondary";
  }
}

export default function AuditLogTable({
  logs,
  page,
  totalPages,
}: AuditLogTableProps) {
  if (logs.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No audit logs found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border">
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
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.createdAt.toLocaleString()}</TableCell>

                <TableCell>{log.user.name ?? "-"}</TableCell>

                <TableCell>{log.user.email}</TableCell>

                <TableCell>
                  <Badge variant={getBadgeVariant(log.action)}>
                    {log.action.replaceAll("_", " ")}
                  </Badge>
                </TableCell>

                <TableCell>{log.entity}</TableCell>

                <TableCell className="font-mono text-xs">
                  {log.entityId}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        {page > 1 ? (
          <Button asChild variant="outline" size="default">
            <Link href={`?page=${page - 1}`}>Previous</Link>
          </Button>
        ) : (
          <Button variant="outline" size="default" disabled>
            Previous
          </Button>
        )}

        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>

        {page < totalPages ? (
          <Button asChild variant="outline" size="default">
            <Link href={`?page=${page + 1}`}>Next</Link>
          </Button>
        ) : (
          <Button variant="outline" size="default" disabled>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
