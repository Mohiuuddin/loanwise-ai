import { getLoanById } from "@/data/loan/get-loan-by-id";

import GenerateAIButton from "./generate-ai-button";
import LoanDecisionButtons from "./loan-decision-buttons";
import StatusBadge from "./status-badge";

import AdminReviewPanel from "@/components/admin/admin-review-panel";
import StatusSelect from "@/components/admin/status-select";

interface LoanDetailsProps {
  loan: NonNullable<Awaited<ReturnType<typeof getLoanById>>>;
  isAdmin?: boolean;
}

export default function LoanDetails({
  loan,
  isAdmin = false,
}: LoanDetailsProps) {
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

          <div className="flex items-center gap-2">
            <strong>Status:</strong>

            {isAdmin ? (
              <StatusSelect applicationId={loan.id} status={loan.status} />
            ) : (
              <StatusBadge status={loan.status} />
            )}
          </div>
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

      {/* AI Prediction */}
      <section className="space-y-4 rounded-lg border p-6">
        <h2 className="text-xl font-semibold">AI Underwriting Report</h2>

        {!loan.aiPrediction ? (
          !isAdmin && <GenerateAIButton applicationId={loan.id} />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Eligible:</strong>{" "}
                {loan.aiPrediction.eligible ? "Yes" : "No"}
              </p>

              <p>
                <strong>Risk Score:</strong> {loan.aiPrediction.riskScore}
              </p>

              <p>
                <strong>Confidence:</strong> {loan.aiPrediction.confidenceScore}
                %
              </p>

              <p>
                <strong>Recommended Amount:</strong>{" "}
                {loan.aiPrediction.recommendedAmount.toString()}
              </p>

              <p>
                <strong>Credit Assessment:</strong>{" "}
                {loan.aiPrediction.creditAssessment}
              </p>

              <p>
                <strong>Affordability:</strong>{" "}
                {loan.aiPrediction.affordability}
              </p>

              <p>
                <strong>Employment Risk:</strong>{" "}
                {loan.aiPrediction.employmentRisk}
              </p>

              <p>
                <strong>Savings Strength:</strong>{" "}
                {loan.aiPrediction.savingsStrength}
              </p>

              <p>
                <strong>Debt Ratio:</strong> {loan.aiPrediction.debtRatio}
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="mb-2 font-semibold">AI Reasoning</h3>

              <p className="leading-7 text-muted-foreground">
                {loan.aiPrediction.reasoning}
              </p>
            </div>
          </>
        )}
      </section>

      {/* User Actions */}
      {!isAdmin && (
        <>
          {loan.aiPrediction && !loan.loanDecision && (
            <LoanDecisionButtons applicationId={loan.id} />
          )}
        </>
      )}

      {isAdmin && <AdminReviewPanel applicationId={loan.id} />}

      {/* Loan Decision */}
      {loan.loanDecision && (
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
      )}
    </div>
  );
}
