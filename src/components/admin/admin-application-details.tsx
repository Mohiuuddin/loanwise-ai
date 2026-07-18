import { getLoanById } from "@/data/admin/get-loan-by-id";

import LoanDetails from "@/components/loan/loan-details";

interface AdminApplicationDetailsProps {
  application: NonNullable<Awaited<ReturnType<typeof getLoanById>>>;
}

export default function AdminApplicationDetails({
  application,
}: AdminApplicationDetailsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Loan Application Review</h1>

        <p className="text-muted-foreground">
          Review the AI underwriting report before making a decision.
        </p>
      </div>

      <LoanDetails loan={application} isAdmin />
    </div>
  );
}
