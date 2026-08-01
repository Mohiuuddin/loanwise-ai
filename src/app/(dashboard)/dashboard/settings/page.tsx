import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/auth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ChangePasswordForm from "@/components/settings/change-password-form";

export default async function SettingsPage() {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="mt-2 text-muted-foreground">
          Manage your account settings and security.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>

        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
