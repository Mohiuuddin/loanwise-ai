"use server";

import { getCurrentSession } from "@/lib/auth/auth";

import { createLoanDecision } from "@/data/loan/create-loan-decision";

interface CreateLoanDecisionInput {
  applicationId: string;
  approved: boolean;
  remarks?: string;
}

export async function createLoanDecisionAction(data: CreateLoanDecisionInput) {
  const session = await getCurrentSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return createLoanDecision(data);
}
