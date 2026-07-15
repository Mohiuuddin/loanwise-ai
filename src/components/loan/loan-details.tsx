import { getLoanById } from "@/data/loan/get-loan-by-id";
import GenerateAIButton from "./generate-ai-button";

interface LoanDetailsProps {
  loan: NonNullable<Awaited<ReturnType<typeof getLoanById>>>;
}

export default function LoanDetails({ loan }: LoanDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Loan */}
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
            <strong>Term:</strong> {loan.loanTermMonths} Months
          </p>

          <p>
            <strong>Status:</strong> {loan.status}
          </p>
        </div>
      </section>

      {/* Employment */}
      <section className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Employment</h2>

        {loan.employment ? (
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Employment Type:</strong> {loan.employment.employmentType}
            </p>

            <p>
              <strong>Employer:</strong> {loan.employment.companyName ?? "-"}
            </p>

            <p>
              <strong>Monthly Salary:</strong>{" "}
              {loan.employment.monthlySalary.toString()}
            </p>

            <p>
              <strong>Years:</strong> {loan.employment.employmentYears}
            </p>
          </div>
        ) : (
          <p>No employment information.</p>
        )}
      </section>

      {/* Financial */}
      <section className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Financial Profile</h2>

        {loan.financialProfile ? (
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Credit Score:</strong>{" "}
              {loan.financialProfile.creditScore ?? "-"}
            </p>

            <p>
              <strong>Monthly Expenses:</strong>{" "}
              {loan.financialProfile.monthlyExpense.toString()}
            </p>

            <p>
              <strong>Existing Loan:</strong>{" "}
              {loan.financialProfile.existingLoanAmount.toString()}
            </p>

            <p>
              <strong>Savings:</strong>{" "}
              {loan.financialProfile.bankBalance?.toString() ?? "-"}
            </p>
          </div>
        ) : (
          <p>No financial profile.</p>
        )}
      </section>

      <section className="space-y-4 rounded-lg border p-6">
        <h2 className="text-xl font-semibold">AI Prediction</h2>

        {!loan.aiPrediction ? (
          <GenerateAIButton applicationId={loan.id} />
        ) : (
          <div className="space-y-2">
            <p>
              <strong>Eligible:</strong>{" "}
              {loan.aiPrediction.eligible ? "Yes" : "No"}
            </p>

            <p>
              <strong>Risk Score:</strong> {loan.aiPrediction.riskScore}
            </p>

            <p>
              <strong>Confidence:</strong> {loan.aiPrediction.confidenceScore}%
            </p>

            <p>
              <strong>Recommended Amount:</strong>{" "}
              {loan.aiPrediction.recommendedAmount.toString()}
            </p>

            <p>
              <strong>Reasoning:</strong> {loan.aiPrediction.reasoning}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
