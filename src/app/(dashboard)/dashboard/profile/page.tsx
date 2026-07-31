import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/auth";
import { getProfile } from "@/data/profile/get-profile";

import ProfileCard from "@/components/profile/profile-card";

export default async function ProfilePage() {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  const profile = await getProfile(session.user.id);

  if (!profile) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>

        <p className="mt-2 text-muted-foreground">
          View your account information.
        </p>
      </div>

      <ProfileCard profile={profile} />
    </div>
  );
}
