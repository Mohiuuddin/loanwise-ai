import DashboardOverview from "@/components/dashboard/dashboard-overview";
import RecentApplications from "@/components/dashboard/recent-applications";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back to LoanWise AI.
        </p>
      </div>

      <DashboardOverview />

      <RecentApplications />
    </div>
  );
}
