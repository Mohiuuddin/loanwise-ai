"use client";

import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  setCurrentStep,
}: StepNavigationProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex items-center justify-between">
      <Button
        type="button"
        variant="outline"
        disabled={isFirstStep}
        onClick={() => setCurrentStep((prev) => prev - 1)}
      >
        Previous
      </Button>

      <Button
        type="button"
        onClick={() => {
          if (!isLastStep) {
            setCurrentStep((prev) => prev + 1);
          }
        }}
      >
        {isLastStep ? "Submit" : "Next"}
      </Button>
    </div>
  );
}
