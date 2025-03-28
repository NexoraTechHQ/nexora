"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface VisitorFrequencyChartProps {
  data?: Array<{ name: string; visitors: number }>
}

export function VisitorFrequencyChart({ data = [] }: VisitorFrequencyChartProps) {
  // Use provided data or fallback to empty array
  const chartData =
    data.length > 0
      ? data
      : [
          { name: "Mon", visitors: 32 },
          { name: "Tue", visitors: 40 },
          { name: "Wed", visitors: 45 },
          { name: "Thu", visitors: 30 },
          { name: "Fri", visitors: 49 },
          { name: "Sat", visitors: 22 },
          { name: "Sun", visitors: 18 },
        ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Visitors</span>
                      <span className="font-bold text-primary">{payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="visitors" fill="#4A5FFF" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

