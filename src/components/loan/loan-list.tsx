// import Link from "next/link";

// import { ApplicationStatus, LoanPurpose } from "@/generated/prisma/enums";

// import { Button } from "@/components/ui/button";
// import StatusBadge from "./status-badge";

// interface LoanItem {
//   id: string;
//   applicantName: string;
//   loanAmount: number | bigint | { toString(): string };
//   loanPurpose: LoanPurpose;
//   status: ApplicationStatus;
//   createdAt: Date;
// }

// interface LoanListProps {
//   loans: LoanItem[];
// }

// export default function LoanList({ loans }: LoanListProps) {
//   if (loans.length === 0) {
//     return (
//       <div className="rounded-lg border p-8 text-center">
//         <p className="text-muted-foreground">No loan applications found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {loans.map((loan) => (
//         <div key={loan.id} className="rounded-lg border p-6">
//           <div className="flex items-center justify-between">
//             <div className="space-y-2">
//               <p>
//                 <strong>Applicant:</strong> {loan.applicantName}
//               </p>

//               <p>
//                 <strong>Amount:</strong> {loan.loanAmount.toString()}
//               </p>

//               <p>
//                 <strong>Purpose:</strong> {loan.loanPurpose}
//               </p>

//               <p>
//                 <strong>Status:</strong> <StatusBadge status={loan.status} />
//               </p>

//               <p>
//                 <strong>Applied:</strong> {loan.createdAt.toLocaleDateString()}
//               </p>
//             </div>

//             <Button asChild>
//               <Link href={`/dashboard/loan/${loan.id}`}>View</Link>
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import Link from "next/link";

import { ApplicationStatus, LoanPurpose } from "@/generated/prisma/enums";

import { Button } from "@/components/ui/button";
import StatusBadge from "./status-badge";

interface LoanItem {
  id: string;
  applicantName: string;
  loanAmount: number | bigint | { toString(): string };
  loanPurpose: LoanPurpose;
  status: ApplicationStatus;
  createdAt: Date;
}

interface LoanListProps {
  loans: LoanItem[];
  page: number;
  totalPages: number;
}

export default function LoanList({ loans, page, totalPages }: LoanListProps) {
  if (loans.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No loan applications found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {loans.map((loan) => (
          <div key={loan.id} className="rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p>
                  <strong>Applicant:</strong> {loan.applicantName}
                </p>

                <p>
                  <strong>Amount:</strong> {loan.loanAmount.toString()}
                </p>

                <p>
                  <strong>Purpose:</strong> {loan.loanPurpose}
                </p>

                <p>
                  <strong>Status:</strong> <StatusBadge status={loan.status} />
                </p>

                <p>
                  <strong>Applied:</strong>{" "}
                  {loan.createdAt.toLocaleDateString()}
                </p>
              </div>

              <Button asChild>
                <Link href={`/dashboard/loan/${loan.id}`}>View</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/* <div className="flex items-center justify-between">
        <Button asChild variant="outline" disabled={page <= 1}>
          <Link href={`?page=${page - 1}`}>Previous</Link>
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <Button asChild variant="outline" disabled={page >= totalPages}>
          <Link href={`?page=${page + 1}`}>Next</Link>
        </Button>
      </div> */}

      <div className="flex items-center justify-between">
        {page > 1 ? (
          <Button asChild variant="outline">
            <Link href={`?page=${page - 1}`}>Previous</Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            Previous
          </Button>
        )}

        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        {page < totalPages ? (
          <Button asChild variant="outline">
            <Link href={`?page=${page + 1}`}>Next</Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
