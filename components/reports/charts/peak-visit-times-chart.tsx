"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface PeakVisitTimesChartProps {
  data?: Array<{ time: string; visitors: number }>
}

export function PeakVisitTimesChart({ data = [] }: PeakVisitTimesChartProps) {
  // Use provided data or fallback to default data
  const chartData =
    data.length > 0
      ? data
      : [
          { time: "8 AM", visitors: 5 },
          { time: "9 AM", visitors: 12 },
          { time: "10 AM", visitors: 18 },
          { time: "11 AM", visitors: 23 },
          { time: "12 PM", visitors: 17 },
          { time: "1 PM", visitors: 15 },
          { time: "2 PM", visitors: 20 },
          { time: "3 PM", visitors: 25 },
          { time: "4 PM", visitors: 22 },
          { time: "5 PM", visitors: 18 },
          { time: "6 PM", visitors: 10 },
        ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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
        <Line type="monotone" dataKey="visitors" stroke="#4A5FFF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

