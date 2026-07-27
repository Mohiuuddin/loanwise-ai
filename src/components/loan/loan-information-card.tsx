import { getLoanById } from "@/data/loan/get-loan-by-id";

interface LoanInformationCardProps {
  loan: NonNullable<Awaited<ReturnType<typeof getLoanById>>>;
}

export default function LoanInformationCard({
  loan,
}: LoanInformationCardProps) {
  return (
    <section className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Loan Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Amount:</strong> {loan.loanAmount.toString()}
        </p>

        <p>
          <strong>Purpose:</strong> {loan.loanPurpose}
        </p>

        <p>
          <strong>Interest Rate:</strong> {loan.interestRate.toString()}%
        </p>

        <p>
          <strong>Status:</strong> {loan.status}
        </p>

        <p>
          <strong>Applicant:</strong> {loan.applicantName}
        </p>

        <p>
          <strong>Created:</strong> {loan.createdAt.toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
