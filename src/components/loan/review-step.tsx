"use client";

import { useFormContext } from "react-hook-form";

import { LoanApplicationValues } from "@/schemas/loan-application.schema";

export default function ReviewStep() {
  const form = useFormContext<LoanApplicationValues>();

  const values = form.getValues();

  return (
    <div className="space-y-8 rounded-lg border bg-card p-6">
      <h2 className="text-2xl font-semibold">Review Your Application</h2>

      {/* Loan Details */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">Loan Details</h3>

        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Loan Amount:</span>{" "}
            {values.loanAmount.toLocaleString()}
          </p>

          <p>
            <span className="font-medium">Loan Purpose:</span>{" "}
            {values.loanPurpose}
          </p>

          <p>
            <span className="font-medium">Loan Term:</span>{" "}
            {values.loanTermMonths} Months
          </p>
        </div>
      </section>

      {/* Employment */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">Employment</h3>

        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Employment Type:</span>{" "}
            {values.employmentType}
          </p>

          <p>
            <span className="font-medium">Employer:</span> {values.employerName}
          </p>

          <p>
            <span className="font-medium">Monthly Income:</span>{" "}
            {values.monthlyIncome.toLocaleString()}
          </p>

          <p>
            <span className="font-medium">Years Employed:</span>{" "}
            {values.yearsEmployed}
          </p>
        </div>
      </section>

      {/* Financial */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">Financial Profile</h3>

        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Credit Score:</span>{" "}
            {values.creditScore}
          </p>

          <p>
            <span className="font-medium">Monthly Expenses:</span>{" "}
            {values.monthlyExpenses.toLocaleString()}
          </p>

          <p>
            <span className="font-medium">Existing Loan EMI:</span>{" "}
            {values.existingLoanEmi.toLocaleString()}
          </p>

          <p>
            <span className="font-medium">Savings:</span>{" "}
            {values.savings.toLocaleString()}
          </p>
        </div>
      </section>

      {/* Documents */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">Documents</h3>

        <div className="grid grid-cols-1 gap-2">
          <p>
            <span className="font-medium">National ID:</span>{" "}
            {values.nationalId
              ? `${values.nationalId.name} (${(
                  values.nationalId.size /
                  1024 /
                  1024
                ).toFixed(2)} MB)`
              : "Not selected"}
          </p>

          <p>
            <span className="font-medium">Salary Slip:</span>{" "}
            {values.salarySlip
              ? `${values.salarySlip.name} (${(
                  values.salarySlip.size /
                  1024 /
                  1024
                ).toFixed(2)} MB)`
              : "Not selected"}
          </p>

          <p>
            <span className="font-medium">Bank Statement:</span>{" "}
            {values.bankStatement
              ? `${values.bankStatement.name} (${(
                  values.bankStatement.size /
                  1024 /
                  1024
                ).toFixed(2)} MB)`
              : "Not selected"}
          </p>
        </div>
      </section>
    </div>
  );
}
