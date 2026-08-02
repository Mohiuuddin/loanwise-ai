import { notFound, redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/auth";

import { getUserById } from "@/data/users/get-user-by-id";

import UserDetailsCard from "@/components/users/user-details-card";

interface UserDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetailsPage({
  params,
}: UserDetailsPageProps) {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const { id } = await params;

  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">User Details</h1>

        <p className="mt-2 text-muted-foreground">
          View user information and recent loan applications.
        </p>
      </div>

      <UserDetailsCard user={user} />
    </div>
  );
}
