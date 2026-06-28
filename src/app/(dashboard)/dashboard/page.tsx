import LogoutButton from "@/components/auth/logout-button";
import { getSession } from "@/lib/auth/session";

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome {session?.user.name}</h1>

        <p>{session?.user.email}</p>
      </div>

      <LogoutButton />
    </div>
  );
}
