"use client";

import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { LoanApplicationValues } from "@/schemas/loan-application.schema";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const stepFields: (keyof LoanApplicationValues)[][] = [
  ["loanAmount", "loanPurpose", "loanTermMonths"],
  ["employmentStatus", "employerName", "monthlyIncome", "yearsEmployed"],
  ["creditScore", "monthlyExpenses", "existingLoanEmi", "savings"],
  [],
  [],
];

export default function StepNavigation({
  currentStep,
  totalSteps,
  setCurrentStep,
}: StepNavigationProps) {
  const form = useFormContext<LoanApplicationValues>();

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = async () => {
    const fields = stepFields[currentStep];

    if (fields.length > 0) {
      const valid = await form.trigger(fields);

      if (!valid) return;
    }

    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const valid = await form.trigger();

    if (!valid) return;

    console.log("Loan Application Submitted", form.getValues());

    // TODO:
    // Call Server Action / API to save application
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        type="button"
        variant="outline"
        disabled={isFirstStep}
        onClick={handlePrevious}
      >
        Previous
      </Button>

      <Button type="button" onClick={isLastStep ? handleSubmit : handleNext}>
        {isLastStep ? "Submit" : "Next"}
      </Button>
    </div>
  );
}
