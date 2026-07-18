"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { getLoanPurposeStats } from "@/data/dashboard/get-loan-purpose-stats";

interface LoanPurposeChartProps {
  data: Awaited<ReturnType<typeof getLoanPurposeStats>>;
}

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#ea580c",
  "#9333ea",
  "#dc2626",
  "#0891b2",
];

export default function LoanPurposeChart({ data }: LoanPurposeChartProps) {
  const chartData = data.map((item) => ({
    name: item.loanPurpose,
    value: item._count.loanPurpose,
  }));

  return (
    <div className="flex justify-center">
      <PieChart width={500} height={350}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          label
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
}
