"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface DepartmentAccessChartProps {
  data?: Array<{ name: string; count: number }>
}

export function DepartmentAccessChart({ data = [] }: DepartmentAccessChartProps) {
  // Use provided data or fallback to default data
  const chartData =
    data.length > 0
      ? data
      : [
          { name: "Marketing", count: 145 },
          { name: "Sales", count: 120 },
          { name: "IT", count: 95 },
          { name: "HR", count: 85 },
          { name: "Finance", count: 65 },
          { name: "Operations", count: 55 },
          { name: "Executive", count: 40 },
        ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} layout="vertical">
        <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          dataKey="name"
          type="category"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={100}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Access Count</span>
                      <span className="font-bold text-primary">{payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="count" fill="#4A5FFF" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

