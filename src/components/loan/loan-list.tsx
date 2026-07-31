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

      <div className="flex items-center justify-between">
        {page > 1 ? (
          <Button
            asChild
            variant="outline"
            size="default"
            className="cursor-pointer border-2 border-gray-800 px-6 py-5 text-sm font-semibold text-black shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
          >
            <Link href={`?page=${page - 1}`}>Previous</Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="default"
            disabled
            className="border-2 border-gray-400 px-6 py-5 text-sm font-semibold text-gray-500"
          >
            Previous
          </Button>
        )}

        <span className="text-base font-semibold text-black">
          Page {page} of {totalPages}
        </span>

        {page < totalPages ? (
          <Button
            asChild
            variant="outline"
            size="default"
            className="cursor-pointer border-2 border-gray-800 px-6 py-5 text-sm font-semibold text-black shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
          >
            <Link href={`?page=${page + 1}`}>Next</Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="default"
            disabled
            className="border-2 border-gray-400 px-6 py-5 text-sm font-semibold text-gray-500"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
