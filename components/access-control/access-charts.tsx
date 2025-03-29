"use client"

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import { useEffect, useState } from "react"

// Custom label renderer for pie charts to ensure responsiveness
const renderCustomizedPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 1.1
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="#000000" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize="12">
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

// Custom tooltip to ensure consistent styling
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm text-xs">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color || entry.stroke }}>
            {entry.name}: {entry.value}
            {entry.unit || ""}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Hook to detect window size for responsive adjustments
function useWindowSize() {
  const [size, setSize] = useState([0, 0])

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return size
}

// Access Point Usage Chart
export function AccessPointUsageChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for access point usage
  const data = [
    { name: "Main Entrance", count: 245, color: "#4A5FFF" },
    { name: "Side Entrance", count: 120, color: "#10B981" },
    { name: "Parking Gate", count: 85, color: "#F59E0B" },
    { name: "Server Room", count: 45, color: "#6B7280" },
    { name: "Executive Suite", count: 35, color: "#EF4444" },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 20,
          bottom: isMobile ? 70 : 60,
        }}
        barSize={isMobile ? 15 : 30}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          fontSize={isMobile ? 8 : 10}
          angle={-45}
          textAnchor="end"
          height={isMobile ? 80 : 60}
          tick={{ fill: "#6B7280" }}
          interval={0}
        />
        <YAxis fontSize={isMobile ? 10 : 12} tick={{ fill: "#6B7280" }} width={isMobile ? 30 : 40} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" name="Access Count">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// User Access Frequency Chart
export function UserAccessFrequencyChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for user access frequency by role
  const data = [
    { name: "Admin", frequency: 18, color: "#4A5FFF" },
    { name: "Manager", frequency: 12, color: "#10B981" },
    { name: "Staff", frequency: 8, color: "#F59E0B" },
    { name: "Contractor", frequency: 4, color: "#6B7280" },
    { name: "Visitor", frequency: 2, color: "#EF4444" },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 20,
          bottom: 5,
        }}
        barSize={isMobile ? 15 : 30}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={isMobile ? 10 : 12} tick={{ fill: "#6B7280" }} />
        <YAxis fontSize={isMobile ? 10 : 12} tick={{ fill: "#6B7280" }} width={isMobile ? 30 : 40} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="frequency" name="Access Frequency (per day)">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// Security Incident Trend Chart
export function SecurityIncidentTrendChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for security incidents over time
  const data = [
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

  // For mobile, we'll show fewer data points
  const mobileData = isMobile
    ? [
        { date: "Jan", unauthorized: 2, suspicious: 5 },
        { date: "Mar", unauthorized: 3, suspicious: 7 },
        { date: "May", unauthorized: 0, suspicious: 2 },
        { date: "Jul", unauthorized: 2, suspicious: 6 },
        { date: "Sep", unauthorized: 1, suspicious: 4 },
        { date: "Nov", unauthorized: 1, suspicious: 3 },
      ]
    : data

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={isMobile ? mobileData : data}
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" fontSize={isMobile ? 10 : 12} tick={{ fill: "#6B7280" }} />
        <YAxis fontSize={isMobile ? 10 : 12} tick={{ fill: "#6B7280" }} width={isMobile ? 30 : 40} />
        <Tooltip content={<CustomTooltip />} />
        <Legend iconSize={isMobile ? 8 : 10} wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
        <Line
          type="monotone"
          dataKey="unauthorized"
          name="Unauthorized Access"
          stroke="#EF4444"
          strokeWidth={2}
          dot={isMobile ? false : { r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="suspicious"
          name="Suspicious Activity"
          stroke="#F59E0B"
          strokeWidth={2}
          dot={isMobile ? false : { r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

// Access Method Distribution Chart
export function AccessMethodDistributionChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for access methods
  const data = [
    { name: "Card", value: 55, color: "#4A5FFF" },
    { name: "Facial Recognition", value: 30, color: "#10B981" },
    { name: "PIN", value: 15, color: "#F59E0B" },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={isMobile ? 60 : 80}
          fill="#8884d8"
          dataKey="value"
          label={isMobile ? null : renderCustomizedPieLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout={isMobile ? "horizontal" : "vertical"}
          verticalAlign={isMobile ? "bottom" : "middle"}
          align={isMobile ? "center" : "right"}
          wrapperStyle={isMobile ? {} : { right: 0 }}
          iconSize={10}
          fontSize={12}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

// Recognition Accuracy Chart
export function RecognitionAccuracyChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for recognition accuracy over time
  const data = [
    { month: "Jan", accuracy: 98.2 },
    { month: "Feb", accuracy: 98.5 },
    { month: "Mar", accuracy: 98.7 },
    { month: "Apr", accuracy: 99.0 },
    { month: "May", accuracy: 99.2 },
    { month: "Jun", accuracy: 99.3 },
    { month: "Jul", accuracy: 99.5 },
    { month: "Aug", accuracy: 99.6 },
    { month: "Sep", accuracy: 99.7 },
    { month: "Oct", accuracy: 99.7 },
    { month: "Nov", accuracy: 99.7 },
    { month: "Dec", accuracy: 99.8 },
  ]

  // For mobile, we'll show fewer data points
  const mobileData = isMobile
    ? [
        { month: "Jan", accuracy: 98.2 },
        { month: "Mar", accuracy: 98.7 },
        { month: "May", accuracy: 99.2 },
        { month: "Jul", accuracy: 99.5 },
        { month: "Sep", accuracy: 99.7 },
        { month: "Nov", accuracy: 99.7 },
      ]
    : data

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={isMobile ? mobileData : data}
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" fontSize={isMobile ? 8 : 10} tick={{ fill: "#6B7280" }} />
        <YAxis fontSize={isMobile ? 8 : 10} domain={[98, 100]} tick={{ fill: "#6B7280" }} width={isMobile ? 25 : 30} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="accuracy"
          name="Accuracy %"
          stroke="#8884d8"
          strokeWidth={2}
          dot={isMobile ? false : { r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

// False Positive/Negative Chart
export function FalsePositiveNegativeChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for false positives and negatives
  const data = [
    { month: "Jan", falsePositive: 0.8, falseNegative: 1.0 },
    { month: "Feb", falsePositive: 0.7, falseNegative: 0.8 },
    { month: "Mar", falsePositive: 0.6, falseNegative: 0.7 },
    { month: "Apr", falsePositive: 0.5, falseNegative: 0.5 },
    { month: "May", falsePositive: 0.4, falseNegative: 0.4 },
    { month: "Jun", falsePositive: 0.3, falseNegative: 0.4 },
    { month: "Jul", falsePositive: 0.3, falseNegative: 0.2 },
    { month: "Aug", falsePositive: 0.2, falseNegative: 0.2 },
    { month: "Sep", falsePositive: 0.2, falseNegative: 0.1 },
    { month: "Oct", falsePositive: 0.2, falseNegative: 0.1 },
    { month: "Nov", falsePositive: 0.2, falseNegative: 0.1 },
    { month: "Dec", falsePositive: 0.1, falseNegative: 0.1 },
  ]

  // For mobile, we'll show fewer data points
  const mobileData = isMobile
    ? [
        { month: "Jan", falsePositive: 0.8, falseNegative: 1.0 },
        { month: "Mar", falsePositive: 0.6, falseNegative: 0.7 },
        { month: "May", falsePositive: 0.4, falseNegative: 0.4 },
        { month: "Jul", falsePositive: 0.3, falseNegative: 0.2 },
        { month: "Sep", falsePositive: 0.2, falseNegative: 0.1 },
        { month: "Nov", falsePositive: 0.2, falseNegative: 0.1 },
      ]
    : data

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={isMobile ? mobileData : data}
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" fontSize={isMobile ? 8 : 10} tick={{ fill: "#6B7280" }} />
        <YAxis fontSize={isMobile ? 8 : 10} tick={{ fill: "#6B7280" }} width={isMobile ? 25 : 30} />
        <Tooltip content={<CustomTooltip />} />
        <Legend iconSize={isMobile ? 8 : 10} wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
        <Line
          type="monotone"
          dataKey="falsePositive"
          name="False Positive %"
          stroke="#EF4444"
          strokeWidth={2}
          dot={isMobile ? false : { r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="falseNegative"
          name="False Negative %"
          stroke="#F59E0B"
          strokeWidth={2}
          dot={isMobile ? false : { r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

// Recognition Speed Chart
export function RecognitionSpeedChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for recognition speed over time
  const data = [
    { month: "Jan", speed: 950 },
    { month: "Feb", speed: 920 },
    { month: "Mar", speed: 880 },
    { month: "Apr", speed: 850 },
    { month: "May", speed: 820 },
    { month: "Jun", speed: 800 },
    { month: "Jul", speed: 780 },
    { month: "Aug", speed: 760 },
    { month: "Sep", speed: 750 },
    { month: "Oct", speed: 740 },
    { month: "Nov", speed: 730 },
    { month: "Dec", speed: 720 },
  ]

  // For mobile, we'll show fewer data points
  const mobileData = isMobile
    ? [
        { month: "Jan", speed: 950 },
        { month: "Mar", speed: 880 },
        { month: "May", speed: 820 },
        { month: "Jul", speed: 780 },
        { month: "Sep", speed: 750 },
        { month: "Nov", speed: 730 },
      ]
    : data

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={isMobile ? mobileData : data}
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" fontSize={isMobile ? 8 : 10} tick={{ fill: "#6B7280" }} />
        <YAxis fontSize={isMobile ? 8 : 10} tick={{ fill: "#6B7280" }} width={isMobile ? 25 : 30} />
        <Tooltip formatter={(value) => [`${value} ms`, "Processing Time"]} content={<CustomTooltip />} />
        <Area type="monotone" dataKey="speed" name="Processing Time (ms)" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

