import { getLoanById } from "@/data/loan/get-loan-by-id";

interface LoanDecisionCardProps {
  loan: NonNullable<Awaited<ReturnType<typeof getLoanById>>>;
}

export default function LoanDecisionCard({ loan }: LoanDecisionCardProps) {
  if (!loan.loanDecision) return null;

  return (
    <section className="space-y-4 rounded-lg border p-6">
      <h2 className="text-xl font-semibold">Loan Decision</h2>

      <p>
        <strong>Decision:</strong>{" "}
        {loan.loanDecision.approved ? "Approved" : "Rejected"}
      </p>

      <p>
        <strong>Remarks:</strong> {loan.loanDecision.remarks || "-"}
      </p>
    </section>
  );
}
