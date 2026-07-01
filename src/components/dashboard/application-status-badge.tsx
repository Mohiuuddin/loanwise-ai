import { Badge } from "@/components/ui/badge";

interface ApplicationStatusBadgeProps {
  status: "PENDING" | "APPROVED" | "REJECTED" | "AI_REVIEWED" | "UNDER_REVIEW";
}

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  AI_REVIEWED: "bg-blue-100 text-blue-800",
  UNDER_REVIEW: "bg-purple-100 text-purple-800",
};

export default function ApplicationStatusBadge({
  status,
}: ApplicationStatusBadgeProps) {
  return (
    <Badge className={statusStyles[status]}>
      {status.replaceAll("_", " ")}
    </Badge>
  );
}
