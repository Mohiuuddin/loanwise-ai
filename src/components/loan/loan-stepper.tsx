"use client";

interface LoanStepperProps {
  currentStep: number;
}

const steps = [
  "Loan Details",
  "Employment",
  "Financial",
  "Documents",
  "Review",
];

export default function LoanStepper({ currentStep }: LoanStepperProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const completed = index < currentStep;
          const current = index === currentStep;

          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                    completed && "border-green-600 bg-green-600 text-white",
                    current &&
                      "border-primary bg-primary text-primary-foreground",
                    !completed &&
                      !current &&
                      "border-muted-foreground text-muted-foreground",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {completed ? "✓" : index + 1}
                </div>

                <span
                  className={[
                    "mt-2 text-center text-xs font-medium",
                    current && "text-primary",
                    completed && "text-green-600",
                    !completed && !current && "text-muted-foreground",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {step}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={[
                    "mx-4 h-1 flex-1 rounded",
                    completed ? "bg-green-600" : "bg-muted",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
