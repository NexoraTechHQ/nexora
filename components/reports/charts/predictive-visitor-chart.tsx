"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

const data = [
  { month: "Jan", actual: 420, predicted: null },
  { month: "Feb", actual: 380, predicted: null },
  { month: "Mar", actual: 450, predicted: null },
  { month: "Apr", actual: 520, predicted: null },
  { month: "May", actual: 480, predicted: null },
  { month: "Jun", actual: 560, predicted: null },
  { month: "Jul", actual: 590, predicted: null },
  { month: "Aug", actual: 610, predicted: null },
  { month: "Sep", actual: 550, predicted: null },
  { month: "Oct", actual: 630, predicted: null },
  { month: "Nov", actual: 670, predicted: null },
  { month: "Dec", actual: 720, predicted: null },
  { month: "Jan", actual: null, predicted: 750 },
  { month: "Feb", actual: null, predicted: 780 },
  { month: "Mar", actual: null, predicted: 810 },
]

export function PredictiveVisitorChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-1 gap-2">
                    {payload.map((entry) => {
                      if (entry.value === null) return null
                      return (
                        <div key={entry.name} className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">{entry.name}</span>
                          <span className="font-bold" style={{ color: entry.color }}>
                            {entry.value}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="actual"
          name="Historical Data"
          stroke="#4A5FFF"
          fill="#4A5FFF"
          fillOpacity={0.2}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Area
          type="monotone"
          dataKey="predicted"
          name="Predicted Visitors"
          stroke="#F59E0B"
          fill="#F59E0B"
          fillOpacity={0.2}
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

