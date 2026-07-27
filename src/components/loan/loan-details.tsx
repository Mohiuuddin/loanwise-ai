import { getLoanById } from "@/data/loan/get-loan-by-id";

import { formatCurrency, formatEnum } from "@/utils/format";

import StatusBadge from "./status-badge";
import GenerateAIButton from "./generate-ai-button";

import AiReport from "./ai-report";
import EmploymentCard from "./employment-card";
import FinancialProfileCard from "./financial-profile-card";
import DocumentsCard from "./documents-card";
import CollateralCard from "./collateral-card";
import AdminReviewPanel from "./admin-review-panel";

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
      {/* Loan Information */}
      <section className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Loan Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Applicant:</strong> {loan.applicantName}
          </p>

          <p>
            <strong>Loan Amount:</strong> {formatCurrency(loan.loanAmount)}
          </p>

          <p>
            <strong>Purpose:</strong> {formatEnum(loan.loanPurpose)}
          </p>

          <p>
            <strong>Interest Rate:</strong>{" "}
            {Number(loan.interestRate).toFixed(2)}%
          </p>

          <div className="col-span-2 flex items-center gap-2">
            <strong>Status:</strong>
            <StatusBadge status={loan.status} />
          </div>
        </div>
      </section>

      {/* Employment */}
      <EmploymentCard employment={loan.employment} />

      {/* Financial */}
      <FinancialProfileCard financialProfile={loan.financialProfile} />

      {/* Documents */}
      <DocumentsCard documents={loan.documents} />

      {/* Collateral */}
      <CollateralCard collateral={loan.collateral} />

      {/* AI Report */}
      <section className="space-y-4 rounded-lg border p-6">
        <h2 className="text-xl font-semibold">AI Underwriting Report</h2>

        {loan.aiPrediction ? (
          <AiReport aiPrediction={loan.aiPrediction} />
        ) : (
          <GenerateAIButton applicationId={loan.id} />
        )}
      </section>

      {/* Admin Review */}
      {isAdmin && loan.aiPrediction && !loan.loanDecision && (
        <AdminReviewPanel applicationId={loan.id} currentStatus={loan.status} />
      )}

      {/* Final Decision */}
      {loan.loanDecision && (
        <section className="space-y-4 rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Final Loan Decision</h2>

          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Decision:</strong>{" "}
              {loan.loanDecision.approved ? "Approved" : "Rejected"}
            </p>

            <p className="col-span-2">
              <strong>Remarks:</strong> {loan.loanDecision.remarks || "-"}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
