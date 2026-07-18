import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { getCurrentSession } from "./auth";

export async function requireAdmin() {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      role: true,
    },
  });

  if (user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return session;
}
