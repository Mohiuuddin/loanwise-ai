import { CheckCircle2, Clock3, FileText, ShieldCheck } from "lucide-react";

import { getCurrentSession } from "@/lib/auth/auth";
import { getDashboardStats } from "@/data/dashboard/get-dashboard-stats";

import StatsCard from "./stats-card";

export default async function DashboardOverview() {
  const session = await getCurrentSession();

  if (!session?.user) {
    return null;
  }

  const stats = await getDashboardStats(session.user.id);

  const dashboardStats = [
    {
      title: "Applications",
      value: stats.total,
      icon: FileText,
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle2,
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock3,
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </section>
  );
}
