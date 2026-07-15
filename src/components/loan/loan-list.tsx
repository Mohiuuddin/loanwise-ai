import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getUserLoans } from "@/data/loan/get-user-loans";
import StatusBadge from "./status-badge";

interface LoanListProps {
  loans: Awaited<ReturnType<typeof getUserLoans>>;
}

export default function LoanList({ loans }: LoanListProps) {
  if (loans.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No loan applications found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loans.map((loan) => (
        <div key={loan.id} className="rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p>
                <strong>Amount:</strong> {loan.loanAmount.toString()}
              </p>

              <p>
                <strong>Purpose:</strong> {loan.loanPurpose}
              </p>

              <p>
                <strong>Status:</strong> {<StatusBadge status={loan.status} />}
              </p>

              <p>
                <strong>Applied:</strong> {loan.createdAt.toLocaleDateString()}
              </p>
            </div>

            <Button asChild>
              <Link href={`/dashboard/loan/${loan.id}`}>View</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
