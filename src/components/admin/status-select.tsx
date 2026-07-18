"use client";

import { useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateApplicationStatus } from "@/actions/admin/update-application-status";

import { ApplicationStatus } from "@/generated/prisma/enums";

interface StatusSelectProps {
  applicationId: string;
  status: ApplicationStatus;
}

export default function StatusSelect({
  applicationId,
  status,
}: StatusSelectProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      defaultValue={status}
      onValueChange={(value) =>
        startTransition(async () => {
          await updateApplicationStatus({
            applicationId,
            status: value as ApplicationStatus,
          });
        })
      }
    >
      <SelectTrigger disabled={isPending} className="w-52">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={ApplicationStatus.PENDING}>Pending</SelectItem>

        <SelectItem value={ApplicationStatus.AI_REVIEWED}>
          AI Reviewed
        </SelectItem>

        <SelectItem value={ApplicationStatus.UNDER_REVIEW}>
          Under Review
        </SelectItem>

        <SelectItem value={ApplicationStatus.APPROVED}>Approved</SelectItem>

        <SelectItem value={ApplicationStatus.REJECTED}>Rejected</SelectItem>
      </SelectContent>
    </Select>
  );
}
