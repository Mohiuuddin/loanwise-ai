"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { getRiskDistribution } from "@/data/dashboard/get-risk-distribution";

interface RiskDistributionChartProps {
  data: Awaited<ReturnType<typeof getRiskDistribution>>;
}

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

export default function RiskDistributionChart({
  data,
}: RiskDistributionChartProps) {
  return (
    <div className="flex justify-center">
      <PieChart width={500} height={350}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />

        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
}
