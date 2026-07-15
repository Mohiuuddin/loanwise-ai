import { Badge } from "@/components/ui/badge";
import { ApplicationStatus } from "@/generated/prisma/enums";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "APPROVED":
      return <Badge className="bg-green-600">Approved</Badge>;

    case "REJECTED":
      return <Badge variant="destructive">Rejected</Badge>;

    case "PENDING":
      return <Badge variant="secondary">Pending</Badge>;

    case "UNDER_REVIEW":
      return <Badge className="bg-yellow-600">Under Review</Badge>;

    case "AI_REVIEWED":
      return <Badge className="bg-blue-600">AI Reviewed</Badge>;

    default:
      return <Badge>{status}</Badge>;
  }
}
