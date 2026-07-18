import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getRecentApplications } from "@/data/dashboard/get-recent-applications";

import StatusBadge from "@/components/loan/status-badge";

interface RecentApplicationsProps {
  applications: Awaited<ReturnType<typeof getRecentApplications>>;
}

export default function RecentApplications({
  applications,
}: RecentApplicationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Loan Amount</TableHead>
              <TableHead className="text-center">Purpose</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Risk</TableHead>
              <TableHead className="text-center">Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="text-center">
                    {application.loanAmount.toString()}
                  </TableCell>

                  <TableCell className="text-center">
                    {application.loanPurpose}
                  </TableCell>

                  <TableCell className="text-center">
                    <StatusBadge status={application.status} />
                  </TableCell>

                  <TableCell className="text-center">
                    {application.aiPrediction
                      ? application.aiPrediction.riskScore
                      : "-"}
                  </TableCell>

                  <TableCell className="text-center">
                    {application.createdAt.toLocaleDateString()}
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
