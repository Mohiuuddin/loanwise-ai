import { getCurrentSession } from "@/lib/auth/auth";
import { getUserLoans } from "@/data/loan/get-user-loans";

import LoanList from "@/components/loan/loan-list";

export default async function LoanPage() {
  const session = await getCurrentSession();

  if (!session?.user) {
    return null;
  }

  const loans = await getUserLoans(session.user.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Loan Applications</h1>

          <p className="mt-2 text-muted-foreground">
            View and manage your loan applications.
          </p>
        </div>
      </div>

      <LoanList loans={loans} />
    </div>
  );
}
