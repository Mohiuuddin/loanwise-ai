"use client";

import { useEffect, useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { LoanApplicationValues } from "@/schemas/loan-application.schema";

import { collateralTypeOptions } from "@/constants/collateral-type";
import { loanCollateralRules } from "@/constants/loan-collateral-rule";

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

import { Button } from "@/components/ui/button";

export default function CollateralStep() {
  const form = useFormContext<LoanApplicationValues>();

  const loanPurpose = form.watch("loanPurpose");

  const rule = loanPurpose ? loanCollateralRules[loanPurpose] : undefined;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "collaterals",
  });

  useEffect(() => {
    if (!rule) return;

    if (rule.collateral === "required" && fields.length === 0) {
      append({
        type: undefined,
        customType: "",
        estimatedValue: undefined,
        description: "",
      });
    }

    if (rule.collateral === "none" && fields.length > 0) {
      form.setValue("collaterals", []);
    }
  }, [rule, fields.length, append, form]);

  const availableCollateralTypes = useMemo(() => {
    if (!rule) return [];

    return collateralTypeOptions.filter((item) =>
      rule.allowedCollateral.includes(item.value),
    );
  }, [rule]);

  if (!loanPurpose) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">
          Please select a loan purpose first.
        </p>
      </div>
    );
  }

  if (!rule) {
    return null;
  }

  if (rule.collateral === "none") {
    return (
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold">Collateral Information</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          This loan type does not require collateral.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="space-y-6 rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Collateral Information</h2>

            <p className="text-sm text-muted-foreground">
              {rule.collateral === "required"
                ? "At least one collateral is required."
                : "Collateral is optional for this loan type."}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                type: undefined,
                customType: "",
                estimatedValue: undefined,
                description: "",
              })
            }
          >
            Add Collateral
          </Button>
        </div>

        {rule.collateral === "optional" && fields.length === 0 && (
          <div className="rounded-md border border-dashed p-6 text-center text-muted-foreground">
            No collateral added.
          </div>
        )}
        {fields.map((field, index) => {
          const selectedType = form.watch(`collaterals.${index}.type`);

          return (
            <div key={field.id} className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Collateral #{index + 1}</h3>

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={
                    rule.collateral === "required" && fields.length === 1
                  }
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>

              <FormField
                control={form.control}
                name={`collaterals.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collateral Type</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select collateral type" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {availableCollateralTypes.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedType === "OTHER" && (
                <FormField
                  control={form.control}
                  name={`collaterals.${index}.customType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specify Collateral</FormLabel>

                      <FormControl>
                        <Input placeholder="Enter collateral type" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name={`collaterals.${index}.estimatedValue`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Value ($)</FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Estimated value"
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
                name={`collaterals.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>

                    <FormControl>
                      <Input placeholder="Additional description" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}
      </div>
    </Form>
  );
}
