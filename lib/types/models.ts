// Core data models for the application

// User model
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "manager"
  department: string
  status: "active" | "inactive"
  avatarUrl?: string
}

// Visitor model
export interface Visitor {
  id: string
  name: string
  email: string
  phone: string
  company: string
  lastVisit: string
  visitCount: number
  avatarUrl?: string
}

// Visit/Log model
export interface VisitorLog {
  id: string
  visitorId: string
  visitorName: string
  visitorEmail: string
  hostId: string
  hostName: string
  department: string
  checkInTime: string
  checkOutTime: string | null
  entryMethod: "Manual" | "Facial Recognition" | "Card"
  status: "active" | "completed"
}

// Appointment model
export interface Appointment {
  id: string
  visitorId: string
  visitorName: string
  visitorEmail: string
  hostId: string
  hostName: string
  date: string
  startTime: string
  endTime: string
  location: string
  purpose: string
  status: "scheduled" | "checked-in" | "completed" | "canceled"
}

// Access log model
export interface AccessLog {
  id: string
  userId: string | null
  userName: string
  accessPoint: string
  timestamp: string
  method: "Card" | "Facial Recognition" | "PIN"
  status: "success" | "failed"
}

// Dashboard statistics model
export interface DashboardStats {
  totalVisitorsToday: number
  checkedInVisitors: number
  upcomingAppointments: number
  averageVisitDuration: string
  visitorsTrend: number
  checkedInTrend: number
  appointmentsTrend: number
  durationTrend: number
}

// Visitor statistics model
export interface VisitorStats {
  daily: Array<{ name: string; visitors: number; checkedIn: number }>
  hourly: Array<{ time: string; visitors: number }>
  demographics: Array<{ name: string; value: number; color: string }>
  appointments: Array<{ name: string; scheduled: number; completed: number; canceled: number }>
}

// Access control statistics model
export interface AccessStats {
  departmentAccess: Array<{ name: string; count: number }>
  securityIncidents: Array<{ date: string; unauthorized: number; suspicious: number }>
}

