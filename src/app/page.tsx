// export default function Home() {
//   return <div className="bg-red-500 text-white p-10 text-4xl">LoanWise AI</div>;
// }
import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/auth";

export default async function HomePage() {
  const session = await getCurrentSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  redirect("/login");
}
