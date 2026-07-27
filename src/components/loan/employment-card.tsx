import { getLoanById } from "@/data/loan/get-loan-by-id";

import { formatCurrency, formatEnum } from "@/utils/format";

interface EmploymentCardProps {
  employment: NonNullable<
    NonNullable<Awaited<ReturnType<typeof getLoanById>>>["employment"]
  > | null;
}

export default function EmploymentCard({ employment }: EmploymentCardProps) {
  if (!employment) {
    return (
      <section className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Employment</h2>

        <p>No employment information.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Employment</h2>

      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Employment Type:</strong>{" "}
          {formatEnum(employment.employmentType)}
        </p>

        <p>
          <strong>Employer:</strong> {employment.companyName ?? "-"}
        </p>

        <p>
          <strong>Job Title:</strong> {employment.jobTitle ?? "-"}
        </p>

        <p>
          <strong>Monthly Salary:</strong>{" "}
          {formatCurrency(employment.monthlySalary)}
        </p>

        <p>
          <strong>Years of Employment:</strong> {employment.employmentYears}
        </p>
      </div>
    </section>
  );
}
