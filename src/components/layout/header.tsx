import { getSession } from "@/lib/auth/session";

import ThemeToggle from "./theme-toggle";
import UserMenu from "./user-menu";

export default async function Header() {
  const session = await getSession();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <UserMenu
          name={session?.user.name ?? ""}
          email={session?.user.email ?? ""}
          image={session?.user.image}
        />
      </div>
    </header>
  );
}
