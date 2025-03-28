"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface VisitorStatsChartProps {
  data: Array<{
    name: string
    visitors: number
    checkedIn: number
  }>
}

export function VisitorStatsChart({ data }: VisitorStatsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.65rem] uppercase text-muted-foreground">Total</span>
                      <span className="font-bold text-primary text-xs">{payload[0].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.65rem] uppercase text-muted-foreground">Checked In</span>
                      <span className="font-bold text-primary text-xs">{payload[1].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line type="monotone" dataKey="visitors" stroke="#4A5FFF" strokeWidth={1.5} activeDot={{ r: 4 }} />
        <Line type="monotone" dataKey="checkedIn" stroke="#10B981" strokeWidth={1.5} activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

