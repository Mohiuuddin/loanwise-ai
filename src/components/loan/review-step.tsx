"use client";

import { useFormContext } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LoanApplicationValues } from "@/schemas/loan-application.schema";

export default function ReviewStep() {
  const { getValues } = useFormContext<LoanApplicationValues>();

  const values = getValues();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Loan Amount</span>
            <span>${values.loanAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Purpose</span>
            <span>{values.loanPurpose}</span>
          </div>

          <div className="flex justify-between">
            <span>Term</span>
            <span>{values.loanTermMonths} months</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Employment</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Status</span>
            <span>{values.employmentType}</span>
          </div>

          <div className="flex justify-between">
            <span>Employer</span>
            <span>{values.employerName}</span>
          </div>

          <div className="flex justify-between">
            <span>Income</span>
            <span>${values.monthlyIncome.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Years</span>
            <span>{values.yearsEmployed}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Credit Score</span>
            <span>{values.creditScore}</span>
          </div>

          <div className="flex justify-between">
            <span>Monthly Expenses</span>
            <span>${values.monthlyExpenses.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Existing EMI</span>
            <span>${values.existingLoanEmi.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Savings</span>
            <span>${values.savings.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Salary Slip</span>
            <span>{values.salarySlip?.name ?? "Not uploaded"}</span>
          </div>

          <div className="flex justify-between">
            <span>Bank Statement</span>
            <span>{values.bankStatement?.name ?? "Not uploaded"}</span>
          </div>

          <div className="flex justify-between">
            <span>National ID</span>
            <span>{values.nationalId?.name ?? "Not uploaded"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
