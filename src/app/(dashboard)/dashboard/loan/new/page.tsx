import LoanForm from "@/components/loan/loan-form";

export default function NewLoanPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">New Loan Application</h1>

        <p className="mt-2 text-muted-foreground">
          Complete the steps below to submit your loan application.
        </p>
      </div>

      <LoanForm />
    </div>
  );
}
