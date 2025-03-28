"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface SecurityIncidentsChartProps {
  data?: Array<{ date: string; unauthorized: number; suspicious: number }>
}

export function SecurityIncidentsChart({ data = [] }: SecurityIncidentsChartProps) {
  // Use provided data or fallback to default data
  const chartData =
    data.length > 0
      ? data
      : [
          { date: "Jan", unauthorized: 2, suspicious: 5 },
          { date: "Feb", unauthorized: 1, suspicious: 3 },
          { date: "Mar", unauthorized: 3, suspicious: 7 },
          { date: "Apr", unauthorized: 2, suspicious: 4 },
          { date: "May", unauthorized: 0, suspicious: 2 },
          { date: "Jun", unauthorized: 1, suspicious: 3 },
          { date: "Jul", unauthorized: 2, suspicious: 6 },
          { date: "Aug", unauthorized: 3, suspicious: 8 },
          { date: "Sep", unauthorized: 1, suspicious: 4 },
          { date: "Oct", unauthorized: 2, suspicious: 5 },
          { date: "Nov", unauthorized: 1, suspicious: 3 },
          { date: "Dec", unauthorized: 2, suspicious: 4 },
        ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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
        <Line
          type="monotone"
          dataKey="unauthorized"
          name="Unauthorized Access"
          stroke="#F43F5E"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="suspicious"
          name="Suspicious Activity"
          stroke="#F59E0B"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

