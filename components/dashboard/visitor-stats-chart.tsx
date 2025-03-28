"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for visitor statistics
const data = [
  {
    name: "Mon",
    visitors: 32,
    checkedIn: 24,
  },
  {
    name: "Tue",
    visitors: 40,
    checkedIn: 36,
  },
  {
    name: "Wed",
    visitors: 45,
    checkedIn: 40,
  },
  {
    name: "Thu",
    visitors: 30,
    checkedIn: 26,
  },
  {
    name: "Fri",
    visitors: 49,
    checkedIn: 44,
  },
  {
    name: "Sat",
    visitors: 22,
    checkedIn: 20,
  },
  {
    name: "Sun",
    visitors: 18,
    checkedIn: 16,
  },
]

export function VisitorStatsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Total</span>
                      <span className="font-bold text-primary">{payload[0].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Checked In</span>
                      <span className="font-bold text-primary">{payload[1].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line type="monotone" dataKey="visitors" stroke="#4A5FFF" strokeWidth={2} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="checkedIn" stroke="#10B981" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

