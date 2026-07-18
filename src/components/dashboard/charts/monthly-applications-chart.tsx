"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { getMonthlyApplications } from "@/data/dashboard/get-monthly-applications";

interface MonthlyApplicationsChartProps {
  data: Awaited<ReturnType<typeof getMonthlyApplications>>;
}

export default function MonthlyApplicationsChart({
  data,
}: MonthlyApplicationsChartProps) {
  return (
    <div className="flex justify-center">
      <BarChart width={500} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis allowDecimals={false} />

        <Tooltip />

        <Bar dataKey="applications" fill="#2563eb" radius={[6, 6, 0, 0]} />
      </BarChart>
    </div>
  );
}
