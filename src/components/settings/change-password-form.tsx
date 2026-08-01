"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "@/schemas/change-password-schema";

import { changePassword } from "@/actions/settings/change-password";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),

    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: ChangePasswordSchema) {
    startTransition(async () => {
      try {
        const result = await changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });

        if ("error" in result && result.error) {
          toast.error("Failed to change password.");
          return;
        }

        toast.success("Password changed successfully.");

        form.reset();
      } catch {
        toast.error("Something went wrong.");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>

              <FormControl>
                <Input
                  type="password"
                  placeholder="Current password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>

              <FormControl>
                <Input type="password" placeholder="New password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>

              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Updating..." : "Change Password"}
        </Button>
      </form>
    </Form>
  );
}
