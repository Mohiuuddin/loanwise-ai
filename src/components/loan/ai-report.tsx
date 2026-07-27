import { AIPrediction } from "@/generated/prisma/client";

interface AiReportProps {
  aiPrediction: AIPrediction;
}

export default function AiReport({ aiPrediction }: AiReportProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Eligible:</strong> {aiPrediction.eligible ? "Yes" : "No"}
        </p>

        <p>
          <strong>Risk Score:</strong> {aiPrediction.riskScore}
        </p>

        <p>
          <strong>Confidence:</strong> {aiPrediction.confidenceScore}%
        </p>

        <p>
          <strong>Recommended Amount:</strong>{" "}
          {aiPrediction.recommendedAmount.toString()}
        </p>

        <p>
          <strong>Recommended Repayment:</strong>{" "}
          {aiPrediction.recommendedRepaymentTermMonths} Months
        </p>

        <p>
          <strong>Estimated EMI:</strong>{" "}
          {aiPrediction.estimatedMonthlyEMI.toString()}
        </p>

        <p>
          <strong>Maximum Affordable EMI:</strong>{" "}
          {aiPrediction.maximumAffordableEMI.toString()}
        </p>

        <p>
          <strong>Disposable Income:</strong>{" "}
          {aiPrediction.disposableIncome.toString()}
        </p>

        <p>
          <strong>Credit Assessment:</strong>{" "}
          {aiPrediction.creditAssessment ?? "-"}
        </p>

        <p>
          <strong>Affordability:</strong> {aiPrediction.affordability ?? "-"}
        </p>

        <p>
          <strong>Employment Risk:</strong> {aiPrediction.employmentRisk ?? "-"}
        </p>

        <p>
          <strong>Savings Strength:</strong>{" "}
          {aiPrediction.savingsStrength ?? "-"}
        </p>

        <p>
          <strong>Debt Ratio:</strong> {aiPrediction.debtRatio ?? "-"}
        </p>

        <p>
          <strong>Overall Recommendation:</strong>{" "}
          {aiPrediction.overallRecommendation ?? "-"}
        </p>
      </div>

      <div className="border-t pt-4">
        <h3 className="mb-2 font-semibold">AI Reasoning</h3>

        <p className="leading-7 text-muted-foreground">
          {aiPrediction.reasoning}
        </p>
      </div>
    </>
  );
}
