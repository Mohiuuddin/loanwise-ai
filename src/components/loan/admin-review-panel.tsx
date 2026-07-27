"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { reviewLoan } from "@/actions/loan/review-loan";

import { ApplicationStatus } from "@/generated/prisma/enums";

interface AdminReviewPanelProps {
  applicationId: string;
  currentStatus: ApplicationStatus;
}

export default function AdminReviewPanel({
  applicationId,
  currentStatus,
}: AdminReviewPanelProps) {
  const [remarks, setRemarks] = useState("");

  const [status, setStatus] = useState<ApplicationStatus>(currentStatus);

  const [isPending, startTransition] = useTransition();

  async function handleSubmit() {
    await reviewLoan({
      applicationId,
      status,
      remarks,
    });
  }

  return (
    <section className="space-y-6 rounded-lg border p-6">
      <div>
        <h2 className="text-xl font-semibold">Loan Officer Actions</h2>

        <p className="text-sm text-muted-foreground">
          Review the application and record your decision.
        </p>
      </div>

      <div className="space-y-2">
        <label className="font-medium">Application Status</label>

        <Select
          value={status}
          onValueChange={(value) => setStatus(value as ApplicationStatus)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={ApplicationStatus.UNDER_REVIEW}>
              Under Review
            </SelectItem>

            <SelectItem value={ApplicationStatus.APPROVED}>Approved</SelectItem>

            <SelectItem value={ApplicationStatus.REJECTED}>Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="font-medium">Officer Remarks</label>

        <Textarea
          rows={5}
          placeholder="Enter remarks for this application..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>

      <Button
        className="w-full"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await handleSubmit();
          })
        }
      >
        {isPending ? "Saving..." : "Save Review"}
      </Button>
    </section>
  );
}
