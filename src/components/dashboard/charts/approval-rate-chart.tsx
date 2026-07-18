"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { getApprovalRate } from "@/data/dashboard/get-approval-rate";

interface ApprovalRateChartProps {
  data: Awaited<ReturnType<typeof getApprovalRate>>;
}

const COLORS = ["#22c55e", "#ef4444"];

export default function ApprovalRateChart({ data }: ApprovalRateChartProps) {
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
