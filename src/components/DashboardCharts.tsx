"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#06b6d4",
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ef4444",
  "#8b5cf6",
];

type Props = {
  userData: {
    name: string;
    amount: number;
  }[];

  groupData: {
    name: string;
    amount: number;
  }[];
};

export default function DashboardCharts({
  userData,
  groupData,
}: Props) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-10">
      
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">
          Spending by User
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={userData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="amount"
              fill="#06b6d4"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">
          Spending by Group
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>
            <Pie
              data={groupData}
              dataKey="amount"
              nameKey="name"
              outerRadius={100}
              label
            >
              {groupData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}