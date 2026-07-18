import Link from "next/link";

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
          <TableHead>Status</TableHead>
          <TableHead>Risk</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell>{application.user.name}</TableCell>

            <TableCell>{application.user.email}</TableCell>

            <TableCell>{application.loanAmount.toString()}</TableCell>

            <TableCell>{application.loanPurpose}</TableCell>

            <TableCell>
              <StatusBadge status={application.status} />
            </TableCell>

            <TableCell>{application.aiPrediction?.riskScore ?? "-"}</TableCell>

            <TableCell>{application.createdAt.toLocaleDateString()}</TableCell>

            <TableCell>
              <Link
                href={`/admin/applications/${application.id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
