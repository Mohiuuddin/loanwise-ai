import { CheckCircle2, Clock3, FileText, ShieldCheck } from "lucide-react";

import StatsCard from "./stats-card";

interface DashboardOverviewProps {
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    averageRisk: string;
    averageConfidence: string;
    totalRequested: number;
    totalRecommended: number;
  };
}

export default function DashboardOverview({ stats }: DashboardOverviewProps) {
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
      title: "AI Avg Risk",
      value: `${stats.averageRisk}%`,
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
