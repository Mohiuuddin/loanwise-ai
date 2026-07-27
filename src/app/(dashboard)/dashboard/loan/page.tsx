// import { getCurrentSession } from "@/lib/auth/auth";

// import { getUserLoans } from "@/data/loan/get-user-loans";
// import { getAllLoans } from "@/data/loan/get-user-loans";

// import LoanList from "@/components/loan/loan-list";

// export default async function LoanPage() {
//   const session = await getCurrentSession();

//   if (!session?.user) {
//     return null;
//   }

//   const isAdmin = session.user.role === "ADMIN";

//   const loans = isAdmin
//     ? await getAllLoans()
//     : await getUserLoans(session.user.id);

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">
//             {isAdmin ? "All Loan Applications" : "My Loan Applications"}
//           </h1>

//           <p className="mt-2 text-muted-foreground">
//             {isAdmin
//               ? "View and manage all customer loan applications."
//               : "View and manage your loan applications."}
//           </p>
//         </div>
//       </div>

//       <LoanList loans={loans} />
//     </div>
//   );
// }

import { getCurrentSession } from "@/lib/auth/auth";

import { getUserLoans, getAllLoans } from "@/data/loan/get-user-loans";

import LoanList from "@/components/loan/loan-list";

interface LoanPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function LoanPage({ searchParams }: LoanPageProps) {
  const session = await getCurrentSession();

  if (!session?.user) {
    return null;
  }

  const { page } = await searchParams;

  const currentPage = Number(page ?? "1");

  const isAdmin = session.user.role === "ADMIN";

  const result = isAdmin
    ? await getAllLoans(currentPage)
    : await getUserLoans(session.user.id, currentPage);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {isAdmin ? "All Loan Applications" : "My Loan Applications"}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {isAdmin
              ? "View and manage all customer loan applications."
              : "View and manage your loan applications."}
          </p>
        </div>
      </div>

      <LoanList
        loans={result.loans}
        page={result.page}
        totalPages={result.totalPages}
      />
    </div>
  );
}
