import AdminStatsCards from "./admin-stats-cards";
import DashboardAnalytics from "@/components/dashboard/dashboard-analytics";

import AdminRecentApplications from "./admin-recent-applications";

import { getAdminDashboardStats } from "@/data/admin/get-admin-dashboard-stats";
import { getAdminApplications } from "@/data/admin/get-admin-applications";

import { getLoanPurposeStats } from "@/data/dashboard/get-loan-purpose-stats";
import { getMonthlyApplications } from "@/data/dashboard/get-monthly-applications";
import { getRiskDistribution } from "@/data/dashboard/get-risk-distribution";
import { getApprovalRate } from "@/data/dashboard/get-approval-rate";

interface AdminDashboardProps {
  userId: string;
}

export default async function AdminDashboard({ userId }: AdminDashboardProps) {
  const [
    stats,
    applications,
    purposeStats,
    monthlyApplications,
    riskDistribution,
    approvalRate,
  ] = await Promise.all([
    getAdminDashboardStats(),
    getAdminApplications(),
    getLoanPurposeStats(userId),
    getMonthlyApplications(userId),
    getRiskDistribution(userId),
    getApprovalRate(userId),
  ]);

  return (
    <div className="space-y-8">
      <AdminStatsCards stats={stats} />

      <DashboardAnalytics
        purposeStats={purposeStats}
        monthlyApplications={monthlyApplications}
        riskDistribution={riskDistribution}
        approvalRate={approvalRate}
      />

      <AdminRecentApplications applications={applications.slice(0, 5)} />
    </div>
  );
}
