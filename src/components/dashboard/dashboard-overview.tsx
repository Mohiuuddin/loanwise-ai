import { CheckCircle2, Clock3, FileText, ShieldCheck } from "lucide-react";

import StatsCard from "./stats-card";

const dashboardStats = [
  {
    title: "Applications",
    value: 12,
    icon: FileText,
  },
  {
    title: "Approved",
    value: 7,
    icon: CheckCircle2,
  },
  {
    title: "Pending",
    value: 5,
    icon: Clock3,
  },
  {
    title: "AI Average Score",
    value: "84%",
    icon: ShieldCheck,
  },
];

export default function DashboardOverview() {
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
