"use client";

import { useFormContext } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { LoanApplicationValues } from "@/schemas/loan-application.schema";

export default function DocumentStep() {
  const form = useFormContext<LoanApplicationValues>();

  return (
    <Form {...form}>
      <div className="space-y-6 rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold">Upload Documents</h2>

        <p className="text-sm text-muted-foreground">
          Please upload the required documents to continue.
        </p>

        <FormField
          control={form.control}
          name="nationalId"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>National ID</FormLabel>

              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0] ?? undefined)}
                />
              </FormControl>

              {value && (
                <p className="text-sm text-muted-foreground">
                  Selected: {value.name}
                </p>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salarySlip"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Salary Slip</FormLabel>

              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0] ?? undefined)}
                />
              </FormControl>

              {value && (
                <p className="text-sm text-muted-foreground">
                  Selected: {value.name}
                </p>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankStatement"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Bank Statement</FormLabel>

              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0] ?? undefined)}
                />
              </FormControl>

              {value && (
                <p className="text-sm text-muted-foreground">
                  Selected: {value.name}
                </p>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
