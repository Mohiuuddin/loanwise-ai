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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LoanApplicationValues } from "@/schemas/loan-application.schema";

export default function EmploymentStep() {
  const form = useFormContext<LoanApplicationValues>();

  return (
    <Form {...form}>
      <div className="space-y-6 rounded-lg border bg-card p-6">
        <FormField
          control={form.control}
          name="employmentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Status</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="FULL_TIME">Full-time</SelectItem>
                  <SelectItem value="PART_TIME">Part-time</SelectItem>
                  <SelectItem value="SELF_EMPLOYED">Self-employed</SelectItem>
                  <SelectItem value="UNEMPLOYED">Unemployed</SelectItem>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="RETIRED">Retired</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employer Name</FormLabel>

              <FormControl>
                <Input placeholder="Enter employer name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthlyIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Income</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter monthly income"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearsEmployed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years Employed</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  placeholder="Years at current job"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
