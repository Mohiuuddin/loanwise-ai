import { getLoanById } from "@/data/loan/get-loan-by-id";

import { formatCurrency } from "@/utils/format";

interface FinancialProfileCardProps {
  financialProfile: NonNullable<
    Awaited<ReturnType<typeof getLoanById>>
  >["financialProfile"];
}

export default function FinancialProfileCard({
  financialProfile,
}: FinancialProfileCardProps) {
  if (!financialProfile) {
    return (
      <section className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Financial Profile</h2>

        <p>No financial profile available.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Financial Profile</h2>

      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Credit Score:</strong> {financialProfile.creditScore ?? "-"}
        </p>

        <p>
          <strong>Monthly Expenses:</strong>{" "}
          {formatCurrency(financialProfile.monthlyExpense)}
        </p>

        <p>
          <strong>Existing Loan:</strong>{" "}
          {formatCurrency(financialProfile.existingLoanAmount)}
        </p>

        <p>
          <strong>Other Income:</strong>{" "}
          {formatCurrency(financialProfile.otherIncome)}
        </p>

        <p>
          <strong>Bank Balance:</strong>{" "}
          {financialProfile.bankBalance
            ? formatCurrency(financialProfile.bankBalance)
            : "-"}
        </p>
      </div>
    </section>
  );
}
