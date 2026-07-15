"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createLoanDecisionAction } from "@/actions/loan/create-loan-decision";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface LoanDecisionButtonsProps {
  applicationId: string;
}

export default function LoanDecisionButtons({
  applicationId,
}: LoanDecisionButtonsProps) {
  const router = useRouter();

  const [remarks, setRemarks] = useState("");

  const [isPending, startTransition] = useTransition();

  const submitDecision = (approved: boolean) => {
    startTransition(async () => {
      await createLoanDecisionAction({
        applicationId,
        approved,
        remarks,
      });

      router.refresh();
    });
  };

  return (
    <div className="space-y-4 rounded-lg border p-6">
      <Textarea
        placeholder="Loan officer remarks..."
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      <div className="flex gap-4">
        <Button disabled={isPending} onClick={() => submitDecision(true)}>
          Approve
        </Button>

        <Button
          variant="destructive"
          disabled={isPending}
          onClick={() => submitDecision(false)}
        >
          Reject
        </Button>
      </div>
    </div>
  );
}
