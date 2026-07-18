import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import StatusBadge from "@/components/loan/status-badge";

import { getAdminApplications } from "@/data/admin/get-admin-applications";

interface AdminApplicationsTableProps {
  applications: Awaited<ReturnType<typeof getAdminApplications>>;
}

export default function AdminApplicationsTable({
  applications,
}: AdminApplicationsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Applicant</TableHead>

          <TableHead>Email</TableHead>

          <TableHead>Amount</TableHead>

          <TableHead>Purpose</TableHead>

          <TableHead>Risk</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Date</TableHead>

          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {applications.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              No applications found.
            </TableCell>
          </TableRow>
        ) : (
          applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">
                {application.user.name}
              </TableCell>

              <TableCell>{application.user.email}</TableCell>

              <TableCell>
                {Number(application.loanAmount).toLocaleString()}
              </TableCell>

              <TableCell>{application.loanPurpose}</TableCell>

              <TableCell>
                {application.aiPrediction?.riskScore ?? "-"}
              </TableCell>

              <TableCell>
                <StatusBadge status={application.status} />
              </TableCell>

              <TableCell>
                {application.createdAt.toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/applications/${application.id}`}>
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
