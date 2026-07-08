"use server";

import {
  createLoanApplicationSchema,
  CreateLoanApplicationInput,
} from "@/schemas/create-loan-application.schema";

import { createLoan } from "@/data/loan/create-loan";

import { getCurrentSession } from "@/lib/auth/auth";

export async function createLoanApplication(data: CreateLoanApplicationInput) {
  const validatedData = createLoanApplicationSchema.parse(data);

  const session = await getCurrentSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return await createLoan(session.user.id, validatedData);
}
