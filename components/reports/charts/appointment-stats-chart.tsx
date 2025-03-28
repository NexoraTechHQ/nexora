"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

interface AppointmentStatsChartProps {
  data?: Array<{ name: string; scheduled: number; completed: number; canceled: number }>
}

export function AppointmentStatsChart({ data = [] }: AppointmentStatsChartProps) {
  // Use provided data or fallback to default data
  const chartData =
    data.length > 0
      ? data
      : [
          { name: "Mon", scheduled: 12, completed: 10, canceled: 2 },
          { name: "Tue", scheduled: 15, completed: 13, canceled: 2 },
          { name: "Wed", scheduled: 18, completed: 15, canceled: 3 },
          { name: "Thu", scheduled: 14, completed: 12, canceled: 2 },
          { name: "Fri", scheduled: 20, completed: 17, canceled: 3 },
          { name: "Sat", scheduled: 8, completed: 7, canceled: 1 },
          { name: "Sun", scheduled: 5, completed: 4, canceled: 1 },
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
                    {payload.map((entry) => (
                      <div key={entry.name} className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">{entry.name}</span>
                        <span className="font-bold" style={{ color: entry.color }}>
                          {entry.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Bar dataKey="scheduled" name="Scheduled" fill="#4A5FFF" radius={[4, 4, 0, 0]} />
        <Bar dataKey="completed" name="Completed" fill="#10B981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="canceled" name="Canceled" fill="#F43F5E" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

