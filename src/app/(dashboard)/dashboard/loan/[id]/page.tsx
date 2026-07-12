import { notFound } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/auth";
import { getLoanById } from "@/data/loan/get-loan-by-id";
import LoanDetails from "@/components/loan/loan-details";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LoanDetailsPage({ params }: PageProps) {
  const session = await getCurrentSession();

  if (!session?.user) {
    notFound();
  }

  const { id } = await params;

  const loan = await getLoanById(id, session.user.id);

  if (!loan) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Loan Details</h1>

      <LoanDetails loan={loan} />
    </div>
  );
}
