import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface AdminRecentApplicationsProps {
  applications: Awaited<ReturnType<typeof getAdminApplications>>;
}

export default function AdminRecentApplications({
  applications,
}: AdminRecentApplicationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>

      <CardContent>
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
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.user.name}</TableCell>

                  <TableCell>{application.user.email}</TableCell>

                  <TableCell>{application.loanAmount.toString()}</TableCell>

                  <TableCell>{application.loanPurpose}</TableCell>

                  <TableCell>
                    <StatusBadge status={application.status} />
                  </TableCell>

                  <TableCell>
                    {application.aiPrediction?.riskScore ?? "-"}
                  </TableCell>

                  <TableCell>
                    {application.createdAt.toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Link
                      href={`/admin/applications/${application.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
