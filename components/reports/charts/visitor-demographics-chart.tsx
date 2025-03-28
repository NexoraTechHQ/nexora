"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface VisitorDemographicsChartProps {
  data?: Array<{ name: string; value: number; color: string }>
}

export function VisitorDemographicsChart({ data = [] }: VisitorDemographicsChartProps) {
  // Use provided data or fallback to default data
  const chartData =
    data.length > 0
      ? data
      : [
          { name: "Clients", value: 45, color: "#4A5FFF" },
          { name: "Vendors", value: 25, color: "#10B981" },
          { name: "Interviews", value: 15, color: "#F59E0B" },
          { name: "Other", value: 15, color: "#6B7280" },
        ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">{payload[0].name}</span>
                      <span className="font-bold" style={{ color: payload[0].payload.color }}>
                        {payload[0].value} ({((payload[0].value / 100) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

