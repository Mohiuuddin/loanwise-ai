import { redirect } from "next/navigation";

import { UserRole, UserStatus } from "@/generated/prisma/enums";

import { getCurrentSession } from "@/lib/auth/auth";

import { getUsers } from "@/data/users/get-users";

import UserTable from "@/components/users/user-table";
import UserSearch from "@/components/users/user-search";
import UserFilters from "@/components/users/user-filters";

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    role?: UserRole;
    status?: UserStatus;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const params = await searchParams;

  const page = Number(params.page ?? "1");

  const data = await getUsers({
    page,
    search: params.search ?? "",
    role: params.role,
    status: params.status,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>

        <p className="mt-2 text-muted-foreground">
          View and manage registered users.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <UserSearch />

        <UserFilters />
      </div>

      <UserTable
        users={data.users}
        page={data.page}
        totalPages={data.totalPages}
      />
    </div>
  );
}
