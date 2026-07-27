"use client";

import { useFormContext } from "react-hook-form";

import { LoanApplicationValues } from "@/schemas/loan-application.schema";

import { loanPurposeOptions } from "@/constants/loan-purpose";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LoanDetailsStep() {
  const form = useFormContext<LoanApplicationValues>();

  return (
    <Form {...form}>
      <div className="space-y-6 rounded-lg border bg-card p-6">
        <div>
          <h2 className="text-xl font-semibold">Loan Details</h2>

          <p className="text-sm text-muted-foreground">
            Enter the basic information about your loan application.
          </p>
        </div>

        <FormField
          control={form.control}
          name="applicantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applicant Name</FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter applicant name"
                  autoComplete="name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="loanAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Amount</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={1000}
                  placeholder="Enter loan amount"
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : e.target.valueAsNumber,
                    )
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="loanPurpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Purpose</FormLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan purpose" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {loanPurposeOptions.map((purpose) => (
                    <SelectItem key={purpose.value} value={purpose.value}>
                      {purpose.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interestRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interest Rate (%)</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="Enter annual interest rate"
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : e.target.valueAsNumber,
                    )
                  }
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
