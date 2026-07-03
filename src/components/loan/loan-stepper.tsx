import { loanSteps } from "@/constants/loan-steps";
interface LoanStepperProps {
  currentStep: number;
}

// const steps = [
//   "Loan Details",
//   "Employment",
//   "Financial",
//   "Documents",
//   "Review",
// ];

export default function LoanStepper({ currentStep }: LoanStepperProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-4">
      {loanSteps.map((step, index) => (
        <div
          key={step}
          className={`text-sm font-medium ${
            currentStep === index ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {index + 1}. {step}
        </div>
      ))}
    </div>
  );
}
