import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import LoanPurposeChart from "./charts/loan-purpose-chart";
import MonthlyApplicationsChart from "./charts/monthly-applications-chart";
import RiskDistributionChart from "./charts/risk-distribution-chart";
import ApprovalRateChart from "./charts/approval-rate-chart";

import { getLoanPurposeStats } from "@/data/dashboard/get-loan-purpose-stats";
import { getMonthlyApplications } from "@/data/dashboard/get-monthly-applications";
import { getRiskDistribution } from "@/data/dashboard/get-risk-distribution";
import { getApprovalRate } from "@/data/dashboard/get-approval-rate";

interface DashboardAnalyticsProps {
  purposeStats: Awaited<ReturnType<typeof getLoanPurposeStats>>;
  monthlyApplications: Awaited<ReturnType<typeof getMonthlyApplications>>;
  riskDistribution: Awaited<ReturnType<typeof getRiskDistribution>>;
  approvalRate: Awaited<ReturnType<typeof getApprovalRate>>;
}

export default function DashboardAnalytics({
  purposeStats,
  monthlyApplications,
  riskDistribution,
  approvalRate,
}: DashboardAnalyticsProps) {
  console.log({
    purposeStats,
    monthlyApplications,
    riskDistribution,
    approvalRate,
  });
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Loan Purpose Distribution</CardTitle>
        </CardHeader>

        <CardContent>
          <LoanPurposeChart data={purposeStats} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Applications</CardTitle>
        </CardHeader>

        <CardContent>
          <MonthlyApplicationsChart data={monthlyApplications} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Distribution</CardTitle>
        </CardHeader>

        <CardContent>
          <RiskDistributionChart data={riskDistribution} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Approval Rate</CardTitle>
        </CardHeader>

        <CardContent>
          <ApprovalRateChart data={approvalRate} />
        </CardContent>
      </Card>
    </div>
  );
}
