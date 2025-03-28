"use client"

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts"

const data = [
  { day: "1", visitors: 42, anomaly: false },
  { day: "2", visitors: 38, anomaly: false },
  { day: "3", visitors: 45, anomaly: false },
  { day: "4", visitors: 52, anomaly: false },
  { day: "5", visitors: 48, anomaly: false },
  { day: "6", visitors: 56, anomaly: false },
  { day: "7", visitors: 59, anomaly: false },
  { day: "8", visitors: 61, anomaly: false },
  { day: "9", visitors: 55, anomaly: false },
  { day: "10", visitors: 63, anomaly: false },
  { day: "11", visitors: 67, anomaly: false },
  { day: "12", visitors: 72, anomaly: false },
  { day: "13", visitors: 68, anomaly: false },
  { day: "14", visitors: 96, anomaly: true },
  { day: "15", visitors: 73, anomaly: false },
  { day: "16", visitors: 25, anomaly: true },
  { day: "17", visitors: 65, anomaly: false },
  { day: "18", visitors: 71, anomaly: false },
  { day: "19", visitors: 75, anomaly: false },
  { day: "20", visitors: 78, anomaly: false },
  { day: "21", visitors: 82, anomaly: false },
  { day: "22", visitors: 80, anomaly: false },
  { day: "23", visitors: 84, anomaly: false },
  { day: "24", visitors: 79, anomaly: false },
  { day: "25", visitors: 83, anomaly: false },
  { day: "26", visitors: 85, anomaly: false },
  { day: "27", visitors: 87, anomaly: false },
  { day: "28", visitors: 90, anomaly: false },
  { day: "29", visitors: 92, anomaly: false },
  { day: "30", visitors: 88, anomaly: false },
]

export function AnomalyDetectionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const isAnomaly = payload[0].payload.anomaly
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Visitors</span>
                      <span className="font-bold" style={{ color: isAnomaly ? "#F43F5E" : "#4A5FFF" }}>
                        {payload[0].value}
                      </span>
                    </div>
                    {isAnomaly && (
                      <div className="flex items-center gap-1 text-xs text-rose-500 font-medium">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                          <line x1="12" y1="9" x2="12" y2="13"></line>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        Anomaly Detected
                      </div>
                    )}
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
          name="Daily Visitors"
          stroke="#4A5FFF"
          strokeWidth={2}
          dot={(props) => {
            const isAnomaly = props.payload.anomaly
            if (isAnomaly) {
              return <circle cx={props.cx} cy={props.cy} r={6} fill="#F43F5E" stroke="#F43F5E" />
            }
            return <circle cx={props.cx} cy={props.cy} r={4} fill="#4A5FFF" stroke="#4A5FFF" />
          }}
          activeDot={{ r: 8 }}
        />
        <ReferenceLine
          y={90}
          stroke="#10B981"
          strokeDasharray="3 3"
          label={{ value: "Upper Threshold", position: "right", fill: "#10B981", fontSize: 12 }}
        />
        <ReferenceLine
          y={30}
          stroke="#F59E0B"
          strokeDasharray="3 3"
          label={{ value: "Lower Threshold", position: "right", fill: "#F59E0B", fontSize: 12 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

