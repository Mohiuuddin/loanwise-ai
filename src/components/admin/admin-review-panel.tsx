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

import { reviewLoan } from "@/actions/admin/review-loan";

import { ApplicationStatus } from "@/generated/prisma/enums";

interface AdminReviewPanelProps {
  applicationId: string;
}

export default function AdminReviewPanel({
  applicationId,
}: AdminReviewPanelProps) {
  const [remarks, setRemarks] = useState("");

  const [status, setStatus] = useState<ApplicationStatus>(
    ApplicationStatus.UNDER_REVIEW,
  );

  const [isPending, startTransition] = useTransition();

  return (
    <section className="space-y-6 rounded-lg border p-6">
      <div>
        <h2 className="text-xl font-semibold">Loan Officer Actions</h2>

        <p className="text-sm text-muted-foreground">
          Review the application and record your decision.
        </p>
      </div>

      <div className="space-y-2">
        <label className="font-medium">Decision</label>

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
          placeholder="Write remarks..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={5}
        />
      </div>

      <Button
        className="w-full"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await reviewLoan({
              applicationId,
              status,
              remarks,
            });
          })
        }
      >
        {isPending ? "Saving..." : "Save Review"}
      </Button>
    </section>
  );
}
