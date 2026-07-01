import type { ApplicationStatus } from "@/generated/prisma/enums";
export interface RecentApplication {
  id: string;
  applicant: string;
  amount: string;
  purpose: string;
  status: ApplicationStatus;
  date: string;
}
