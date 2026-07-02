"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loanDetailsSchema,
  LoanDetailsValues,
} from "@/schemas/loan-details.schema";

import LoanDetailsStep from "./loan-details-step";
import LoanStepper from "./loan-stepper";
import StepNavigation from "./step-navigation";

export default function LoanForm() {
  const form = useForm<LoanDetailsValues>({
    resolver: zodResolver(loanDetailsSchema),
    defaultValues: {
      loanAmount: 50000,
      loanPurpose: "PERSONAL",
      loanTermMonths: 12,
    },
    mode: "onTouched",
  });

  return (
    <FormProvider {...form}>
      <div className="space-y-8">
        <LoanStepper />

        <LoanDetailsStep />

        <StepNavigation />
      </div>
    </FormProvider>
  );
}
