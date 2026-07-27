"use client";

import { useFormContext } from "react-hook-form";

import { LoanApplicationValues } from "@/schemas/loan-application.schema";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ReviewStep() {
  const { watch } = useFormContext<LoanApplicationValues>();

  const values = watch();

  return (
    <div className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-xl font-semibold">Review Application</h2>

        <p className="text-sm text-muted-foreground">
          Please review your information before submitting.
        </p>
      </div>

      {/* Loan Details */}

      <div className="rounded-md border p-4">
        <h3 className="mb-4 font-semibold">Loan Details</h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Applicant</span>
            <p>{values.applicantName}</p>
          </div>

          <div>
            <span className="font-medium">Loan Purpose</span>
            <p>{values.loanPurpose}</p>
          </div>

          <div>
            <span className="font-medium">Loan Amount</span>
            <p>${values.loanAmount}</p>
          </div>

          <div>
            <span className="font-medium">Interest Rate</span>
            <p>{values.interestRate}%</p>
          </div>
        </div>
      </div>

      {/* Employment */}

      <div className="rounded-md border p-4">
        <h3 className="mb-4 font-semibold">Employment Information</h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Employment Type</span>
            <p>{values.employmentType}</p>
          </div>

          <div>
            <span className="font-medium">Company</span>
            <p>{values.companyName}</p>
          </div>

          <div>
            <span className="font-medium">Job Title</span>
            <p>{values.jobTitle}</p>
          </div>

          <div>
            <span className="font-medium">Monthly Salary</span>
            <p>${values.monthlySalary}</p>
          </div>

          <div>
            <span className="font-medium">Employment Years</span>
            <p>{values.employmentYears}</p>
          </div>
        </div>
      </div>

      {/* Financial */}

      <div className="rounded-md border p-4">
        <h3 className="mb-4 font-semibold">Financial Information</h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Credit Score</span>
            <p>{values.creditScore}</p>
          </div>

          <div>
            <span className="font-medium">Monthly Expenses</span>
            <p>${values.monthlyExpenses}</p>
          </div>

          <div>
            <span className="font-medium">Existing EMI</span>
            <p>${values.existingLoanEmi}</p>
          </div>

          <div>
            <span className="font-medium">Bank Balance</span>
            <p>${values.bankBalance}</p>
          </div>
        </div>
      </div>

      {/* Collateral */}

      {values.collaterals?.length ? (
        <div className="rounded-md border p-4">
          <h3 className="mb-4 font-semibold">Collateral Information</h3>

          <div className="space-y-4">
            {values.collaterals.map((collateral, index) => (
              <div key={index} className="rounded-md border p-4">
                <h4 className="mb-3 font-medium">Collateral #{index + 1}</h4>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Type</span>

                    <p>
                      {collateral.type === "OTHER"
                        ? collateral.customType
                        : collateral.type}
                    </p>
                  </div>

                  <div>
                    <span className="font-medium">Estimated Value</span>

                    <p>
                      {collateral.estimatedValue
                        ? `$${collateral.estimatedValue}`
                        : "-"}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <span className="font-medium">Description</span>

                    <p>{collateral.description || "-"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-md border p-4">
          <h3 className="mb-2 font-semibold">Collateral</h3>

          <p className="text-sm text-muted-foreground">
            No collateral information provided.
          </p>
        </div>
      )}

      {/* Documents */}

      {/* Documents */}

      <div className="rounded-md border p-4">
        <h3 className="mb-4 font-semibold">Uploaded Documents</h3>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">National ID:</span>{" "}
            {values.nationalId
              ? `${values.nationalId.name} (${formatFileSize(values.nationalId.size)})`
              : "Not uploaded"}
          </p>

          <p>
            <span className="font-medium">Salary Slip:</span>{" "}
            {values.salarySlip
              ? `${values.salarySlip.name} (${formatFileSize(values.salarySlip.size)})`
              : "Not uploaded"}
          </p>

          <p>
            <span className="font-medium">Bank Statement:</span>{" "}
            {values.bankStatement
              ? `${values.bankStatement.name} (${formatFileSize(values.bankStatement.size)})`
              : "Not uploaded"}
          </p>
        </div>
      </div>
    </div>
  );
}
