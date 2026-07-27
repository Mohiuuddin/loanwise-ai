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

export default function FinancialStep() {
  const form = useFormContext<LoanApplicationValues>();

  return (
    <Form {...form}>
      <div className="space-y-6 rounded-lg border bg-card p-6">
        <div>
          <h2 className="text-xl font-semibold">Financial Information</h2>

          <p className="text-sm text-muted-foreground">
            Provide your financial profile for loan assessment.
          </p>
        </div>

        <FormField
          control={form.control}
          name="creditScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credit Score</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={300}
                  max={900}
                  placeholder="Enter credit score"
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
          name="monthlyExpenses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Expenses</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="Monthly expenses"
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
        {/* <FormField
          control={form.control}
          name="existingLoanEmi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Existing Loan EMI</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="Existing monthly EMI"
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
        /> */}

        <FormField
          control={form.control}
          name="existingLoanEmi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Existing Loan EMI</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="Existing monthly EMI"
                  value={field.value ?? 0}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? 0 : e.target.valueAsNumber,
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
          name="bankBalance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Bank Balance</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="Available bank balance"
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
