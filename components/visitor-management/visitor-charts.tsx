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

// Visitor Demographics Chart
export function VisitorDemographicsChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for visitor demographics
  const data = [
    { name: "Clients", value: 45, color: "#4A5FFF" },
    { name: "Vendors", value: 25, color: "#10B981" },
    { name: "Interviews", value: 15, color: "#F59E0B" },
    { name: "Other", value: 15, color: "#6B7280" },
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

// Visit Duration Chart
export function VisitDurationChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for visit duration
  const data = [
    { name: "0-15 min", count: 120, color: "#4A5FFF" },
    { name: "15-30 min", count: 180, color: "#10B981" },
    { name: "30-60 min", count: 240, color: "#F59E0B" },
    { name: "1-2 hrs", count: 90, color: "#6B7280" },
    { name: "2+ hrs", count: 30, color: "#EF4444" },
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
        <XAxis dataKey="name" fontSize={isMobile ? 10 : 12} tick={{ fill: "#6B7280" }} tickMargin={5} />
        <YAxis fontSize={isMobile ? 10 : 12} tick={{ fill: "#6B7280" }} width={isMobile ? 30 : 40} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" name="Visitors">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// Appointment Distribution Chart
export function AppointmentDistributionChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for appointment distribution by day of week
  const data = [
    { name: "Mon", scheduled: 12, completed: 10, canceled: 2 },
    { name: "Tue", scheduled: 15, completed: 13, canceled: 2 },
    { name: "Wed", scheduled: 18, completed: 15, canceled: 3 },
    { name: "Thu", scheduled: 14, completed: 12, canceled: 2 },
    { name: "Fri", scheduled: 20, completed: 17, canceled: 3 },
    { name: "Sat", scheduled: 8, completed: 7, canceled: 1 },
    { name: "Sun", scheduled: 5, completed: 4, canceled: 1 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 20,
          bottom: 5,
        }}
        barSize={isMobile ? 15 : 20}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={isMobile ? 10 : 12} tick={{ fill: "#6B7280" }} />
        <YAxis fontSize={isMobile ? 10 : 12} tick={{ fill: "#6B7280" }} width={isMobile ? 30 : 40} />
        <Tooltip content={<CustomTooltip />} />
        <Legend iconSize={isMobile ? 8 : 10} wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
        <Bar dataKey="scheduled" name="Scheduled" stackId="a" fill="#4A5FFF" />
        <Bar dataKey="completed" name="Completed" stackId="a" fill="#10B981" />
        <Bar dataKey="canceled" name="Canceled" stackId="a" fill="#F43F5E" />
      </BarChart>
    </ResponsiveContainer>
  )
}

// Appointment Completion Chart
export function AppointmentCompletionChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for appointment completion rates
  const data = [
    { name: "Completed", value: 68, color: "#10B981" },
    { name: "Scheduled", value: 22, color: "#4A5FFF" },
    { name: "Canceled", value: 10, color: "#F43F5E" },
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

// Hourly Visit Chart
export function HourlyVisitChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for hourly visit distribution
  const data = [
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
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" fontSize={isMobile ? 8 : 10} tick={{ fill: "#6B7280" }} interval={isMobile ? 1 : 0} />
        <YAxis fontSize={isMobile ? 10 : 10} tick={{ fill: "#6B7280" }} width={isMobile ? 25 : 30} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="visitors" stroke="#8884d8" fill="#8884d8" name="Visitors" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// Entry Method Chart
export function EntryMethodChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for entry methods
  const data = [
    { name: "Manual", value: 45, color: "#4A5FFF" },
    { name: "Facial Recognition", value: 35, color: "#10B981" },
    { name: "Card", value: 20, color: "#F59E0B" },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={isMobile ? 60 : 70}
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
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconSize={10}
          fontSize={12}
          formatter={(value, entry, index) => (
            <span style={{ color: "#6B7280", fontSize: isMobile ? 10 : 12 }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

// Department Visit Chart
export function DepartmentVisitChart() {
  const [width] = useWindowSize()
  const isMobile = width < 768

  // Mock data for department visits
  const data = [
    { name: "Marketing", visits: 145 },
    { name: "Sales", visits: 120 },
    { name: "IT", visits: 95 },
    { name: "HR", visits: 85 },
    { name: "Finance", visits: 65 },
    { name: "Operations", visits: 55 },
    { name: "Executive", visits: 40 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 50 : 60,
          bottom: 5,
        }}
        barSize={isMobile ? 10 : 15}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" fontSize={isMobile ? 8 : 10} tick={{ fill: "#6B7280" }} />
        <YAxis
          dataKey="name"
          type="category"
          fontSize={isMobile ? 8 : 10}
          tick={{ fill: "#6B7280" }}
          width={isMobile ? 50 : 60}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="visits" fill="#8884d8" name="Visits" />
      </BarChart>
    </ResponsiveContainer>
  )
}

