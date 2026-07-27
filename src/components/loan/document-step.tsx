"use client";

import { useFormContext } from "react-hook-form";

import { LoanApplicationValues } from "@/schemas/loan-application.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

export default function DocumentStep() {
  const form = useFormContext<LoanApplicationValues>();

  return (
    <Form {...form}>
      <div className="space-y-6 rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold">Required Documents</h2>

        <p className="text-sm text-muted-foreground">
          Upload the required documents for loan verification.
        </p>

        <FormField
          control={form.control}
          name="nationalId"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel>National ID</FormLabel>

              <FormControl>
                <Input
                  ref={ref}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => onChange(e.target.files?.[0] ?? undefined)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salarySlip"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel>Salary Slip</FormLabel>

              <FormControl>
                <Input
                  ref={ref}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => onChange(e.target.files?.[0] ?? undefined)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bankStatement"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel>Bank Statement</FormLabel>

              <FormControl>
                <Input
                  ref={ref}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => onChange(e.target.files?.[0] ?? undefined)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
