import { FileText, Clock3, Search, CheckCircle2, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getAdminDashboardStats } from "@/data/admin/get-admin-dashboard-stats";

interface AdminStatsCardsProps {
  stats: Awaited<ReturnType<typeof getAdminDashboardStats>>;
}

export default function AdminStatsCards({ stats }: AdminStatsCardsProps) {
  const cards = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: FileText,
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock3,
    },
    {
      title: "Under Review",
      value: stats.underReview,
      icon: Search,
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle2,
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>

              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
