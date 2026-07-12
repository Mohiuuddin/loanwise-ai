"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createLoanApplication } from "@/actions/loan/create-loan-application";

import {
  loanApplicationSchema,
  LoanApplicationValues,
} from "@/schemas/loan-application.schema";

import DocumentStep from "./document-step";
import EmploymentStep from "./employment-step";
import FinancialStep from "./financial-step";
import LoanDetailsStep from "./loan-details-step";
import LoanStepper from "./loan-stepper";
import ReviewStep from "./review-step";
import StepNavigation from "./step-navigation";
import { useRouter } from "next/navigation";

export default function LoanForm() {
  const form = useForm<LoanApplicationValues>({
    resolver: zodResolver(loanApplicationSchema),
    mode: "onTouched",
    defaultValues: {
      loanAmount: 50000,
      loanPurpose: "PERSONAL",
      loanTermMonths: 12,

      employmentType: "FULL_TIME",
      employerName: "",
      monthlyIncome: 50000,
      yearsEmployed: 1,

      creditScore: 700,
      monthlyExpenses: 20000,
      existingLoanEmi: 0,
      savings: 100000,

      salarySlip: undefined,
      bankStatement: undefined,
      nationalId: undefined,
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const steps = [
    <LoanDetailsStep key="loan" />,
    <EmploymentStep key="employment" />,
    <FinancialStep key="financial" />,
    <DocumentStep key="document" />,
    <ReviewStep key="review" />,
  ];

  const handleSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);

    try {
      await createLoanApplication({
        loanAmount: values.loanAmount,
        loanPurpose: values.loanPurpose,
        loanTermMonths: values.loanTermMonths,

        employmentType: values.employmentType,
        employerName: values.employerName,
        monthlyIncome: values.monthlyIncome,
        yearsEmployed: values.yearsEmployed,

        creditScore: values.creditScore,
        monthlyExpenses: values.monthlyExpenses,
        existingLoanEmi: values.existingLoanEmi,
        savings: values.savings,
      });

      form.reset();

      router.push("/dashboard/loan");
    } catch (error) {
      console.error(error);
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
