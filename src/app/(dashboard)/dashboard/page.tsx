import DashboardOverview from "@/components/dashboard/dashboard-overview";
import DashboardAnalytics from "@/components/dashboard/dashboard-analytics";
import RecentApplications from "@/components/dashboard/recent-applications";

import { getCurrentSession } from "@/lib/auth/auth";

import { getDashboardStats } from "@/data/dashboard/get-dashboard-stats";
import { getRecentApplications } from "@/data/dashboard/get-recent-applications";
import { getLoanPurposeStats } from "@/data/dashboard/get-loan-purpose-stats";
import { getMonthlyApplications } from "@/data/dashboard/get-monthly-applications";
import { getRiskDistribution } from "@/data/dashboard/get-risk-distribution";
import { getApprovalRate } from "@/data/dashboard/get-approval-rate";

export default async function DashboardPage() {
  const session = await getCurrentSession();

  if (!session?.user) {
    return null;
  }

  const [
    stats,
    recentApplications,
    purposeStats,
    monthlyApplications,
    riskDistribution,
    approvalRate,
  ] = await Promise.all([
    getDashboardStats(session.user.id),
    getRecentApplications(session.user.id),
    getLoanPurposeStats(session.user.id),
    getMonthlyApplications(session.user.id),
    getRiskDistribution(session.user.id),
    getApprovalRate(session.user.id),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back to LoanWise AI.
        </p>
      </div>

      <DashboardOverview stats={stats} />

      <DashboardAnalytics
        purposeStats={purposeStats}
        monthlyApplications={monthlyApplications}
        riskDistribution={riskDistribution}
        approvalRate={approvalRate}
      />

      <RecentApplications applications={recentApplications} />
    </div>
  );
}
