"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

const data = [
  { month: "Jan", visitors: 420, trend: 400 },
  { month: "Feb", visitors: 380, trend: 390 },
  { month: "Mar", visitors: 450, trend: 420 },
  { month: "Apr", visitors: 520, trend: 450 },
  { month: "May", visitors: 480, trend: 480 },
  { month: "Jun", visitors: 560, trend: 510 },
  { month: "Jul", visitors: 590, trend: 540 },
  { month: "Aug", visitors: 610, trend: 570 },
  { month: "Sep", visitors: 550, trend: 600 },
  { month: "Oct", visitors: 630, trend: 630 },
  { month: "Nov", visitors: 670, trend: 660 },
  { month: "Dec", visitors: 720, trend: 690 },
]

export function VisitorTrendsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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
        <Line
          type="monotone"
          dataKey="visitors"
          name="Actual Visitors"
          stroke="#4A5FFF"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="trend"
          name="Trend Line"
          stroke="#10B981"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

