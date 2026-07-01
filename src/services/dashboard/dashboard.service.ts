import { RecentApplication } from "@/types/dashboard";

export async function getRecentApplications(): Promise<RecentApplication[]> {
  return [
    {
      id: "1",
      applicant: "John Doe",
      amount: "$5,000",
      purpose: "Home",
      status: "PENDING",
      date: "Today",
    },
    {
      id: "2",
      applicant: "Sarah Khan",
      amount: "$8,500",
      purpose: "Business",
      status: "APPROVED",
      date: "Yesterday",
    },
    {
      id: "3",
      applicant: "Alex Smith",
      amount: "$3,000",
      purpose: "Personal",
      status: "AI_REVIEWED",
      date: "2 days ago",
    },
  ];
}
