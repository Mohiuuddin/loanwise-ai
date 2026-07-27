"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loanApplicationSchema,
  LoanApplicationValues,
} from "@/schemas/loan-application.schema";

import { createLoanApplication } from "@/actions/loan/create-loan-application";

import LoanStepper from "./loan-stepper";
import StepNavigation from "./step-navigation";

import LoanDetailsStep from "./loan-details-step";
import CollateralStep from "./collateral-step";
import EmploymentStep from "./employment-step";
import FinancialStep from "./financial-step";
import DocumentStep from "./document-step";
import ReviewStep from "./review-step";

export default function LoanForm() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoanApplicationValues>({
    resolver: zodResolver(loanApplicationSchema),
    mode: "onTouched",

    defaultValues: {
      applicantName: "",
      loanAmount: undefined,
      interestRate: undefined,
      loanPurpose: undefined,

      collaterals: [],

      employmentType: undefined,
      companyName: "",
      jobTitle: "",
      monthlySalary: undefined,
      employmentYears: undefined,

      creditScore: undefined,
      monthlyExpenses: undefined,
      existingLoanEmi: 0,
      bankBalance: undefined,

      nationalId: undefined,
      salarySlip: undefined,
      bankStatement: undefined,
    },
  });

  const steps = [
    <LoanDetailsStep key="loan" />,
    <CollateralStep key="collateral" />,
    <EmploymentStep key="employment" />,
    <FinancialStep key="financial" />,
    <DocumentStep key="document" />,
    <ReviewStep key="review" />,
  ];

  const handleSubmit = form.handleSubmit(async (values) => {
    console.log("SUBMITTED");
    console.log(values);
    try {
      setIsSubmitting(true);

      await createLoanApplication({
        application: values,
      });

      router.push("/dashboard/loan");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <FormProvider {...form}>
      <div className="space-y-8">
        <LoanStepper currentStep={currentStep} />

        {steps[currentStep]}

        <StepNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          setCurrentStep={setCurrentStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </FormProvider>
  );
}
