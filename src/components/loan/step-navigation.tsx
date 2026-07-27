"use client";

import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { LoanApplicationValues } from "@/schemas/loan-application.schema";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  setCurrentStep,
  onSubmit,
  isSubmitting,
}: StepNavigationProps) {
  const form = useFormContext<LoanApplicationValues>();

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  async function handleNext() {
    let valid = false;

    switch (currentStep) {
      case 0:
        valid = await form.trigger([
          "applicantName",
          "loanAmount",
          "interestRate",
          "loanPurpose",
        ]);
        break;

      case 1:
        valid = await form.trigger("collaterals");
        break;

      case 2:
        valid = await form.trigger([
          "employmentType",
          "companyName",
          "jobTitle",
          "monthlySalary",
          "employmentYears",
        ]);
        break;

      case 3:
        valid = await form.trigger([
          "creditScore",
          "monthlyExpenses",
          "existingLoanEmi",
          "bankBalance",
        ]);
        break;

      case 4:
        valid = await form.trigger([
          "nationalId",
          "salarySlip",
          "bankStatement",
        ]);
        break;

      default:
        valid = true;
    }

    if (valid) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  return (
    <div className="flex items-center justify-between pt-6">
      <Button
        type="button"
        variant="outline"
        disabled={isFirstStep}
        onClick={() => setCurrentStep((prev) => prev - 1)}
      >
        Previous
      </Button>

      {!isLastStep ? (
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      ) : (
        <Button type="button" disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      )}
    </div>
  );
}
