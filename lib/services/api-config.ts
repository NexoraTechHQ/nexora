// API configuration

export interface APIConfig {
  endpoints: Record<string, string>
  baseURL: string
  headers?: Record<string, string>
  timeout?: number
}

// Default API configuration
export const defaultAPIConfig: APIConfig = {
  // Default to a placeholder URL if environment variable is not set
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  endpoints: {
    // Users
    getUsers: "/users",
    getUserById: "/users/:id",
    createUser: "/users",
    updateUser: "/users/:id",
    deleteUser: "/users/:id",

    // Visitors
    getVisitors: "/visitors",
    getVisitorById: "/visitors/:id",
    createVisitor: "/visitors",
    updateVisitor: "/visitors/:id",
    deleteVisitor: "/visitors/:id",

    // Visitor Logs
    getVisitorLogs: "/visitor-logs",
    getVisitorLogById: "/visitor-logs/:id",
    createVisitorLog: "/visitor-logs",
    updateVisitorLog: "/visitor-logs/:id",

    // Appointments
    getAppointments: "/appointments",
    getAppointmentById: "/appointments/:id",
    createAppointment: "/appointments",
    updateAppointment: "/appointments/:id",
    deleteAppointment: "/appointments/:id",

    // Access Logs
    getAccessLogs: "/access-logs",

    // Dashboard Stats
    getDashboardStats: "/stats/dashboard",
    getVisitorStats: "/stats/visitors",
    getAccessStats: "/stats/access",
  },
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
}

