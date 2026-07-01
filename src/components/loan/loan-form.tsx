"use client";

import { useState } from "react";

import { LoanFormData } from "@/types/loan";

import LoanDetailsStep from "./loan-details-step";
import LoanStepper from "./loan-stepper";
import StepNavigation from "./step-navigation";

const initialData: LoanFormData = {
  loanAmount: 0,
  loanPurpose: "PERSONAL",
  loanTermMonths: 12,

  employmentType: "FULL_TIME",
  companyName: "",
  jobTitle: "",
  employmentYears: 0,
  monthlySalary: 0,

  monthlyExpense: 0,
  otherIncome: 0,
  existingLoanAmount: 0,
  bankBalance: 0,
};

export default function LoanForm() {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<LoanFormData>(initialData);

  return (
    <div className="space-y-8">
      <LoanStepper currentStep={step} />

      <LoanDetailsStep formData={formData} setFormData={setFormData} />

      <StepNavigation
        currentStep={step}
        onNext={() => setStep((s) => s + 1)}
        onPrevious={() => setStep((s) => s - 1)}
      />
    </div>
  );
}
