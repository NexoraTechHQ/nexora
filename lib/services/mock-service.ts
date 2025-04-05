import type {
  User,
  Visitor,
  VisitorLog,
  Appointment,
  AccessLog,
  DashboardStats,
  VisitorStats,
  AccessStats,
} from "../types/models"

// Mock data for development
const mockUsers: User[] = [
  {
    id: "U001",
    name: "John Smith",
    email: "john.smith@nexora.com",
    role: "admin",
    department: "IT",
    status: "active",
  },
  {
    id: "U002",
    name: "Lisa Johnson",
    email: "lisa.johnson@nexora.com",
    role: "user",
    department: "Marketing",
    status: "active",
  },
  {
    id: "U003",
    name: "David Chen",
    email: "david.chen@nexora.com",
    role: "user",
    department: "Finance",
    status: "active",
  },
  {
    id: "U004",
    name: "Sarah Thompson",
    email: "sarah.thompson@nexora.com",
    role: "user",
    department: "HR",
    status: "inactive",
  },
  {
    id: "U005",
    name: "Michael Brown",
    email: "michael.brown@nexora.com",
    role: "admin",
    department: "Operations",
    status: "active",
  },
  {
    id: "U006",
    name: "Emily Davis",
    email: "emily.davis@nexora.com",
    role: "manager",
    department: "Sales",
    status: "active",
  },
  {
    id: "U007",
    name: "Robert Wilson",
    email: "robert.wilson@nexora.com",
    role: "user",
    department: "Customer Support",
    status: "active",
  },
  {
    id: "U008",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@nexora.com",
    role: "manager",
    department: "Product",
    status: "active",
  },
  {
    id: "U009",
    name: "Daniel Taylor",
    email: "daniel.taylor@nexora.com",
    role: "user",
    department: "Legal",
    status: "inactive",
  },
  {
    id: "U010",
    name: "Jessica Anderson",
    email: "jessica.anderson@nexora.com",
    role: "user",
    department: "Research",
    status: "active",
  },
]

const mockVisitors: Visitor[] = [
  {
    id: "V001",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    lastVisit: "2023-10-15",
    visitCount: 3,
  },
  {
    id: "V002",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "+1 (555) 234-5678",
    company: "XYZ Industries",
    lastVisit: "2023-11-02",
    visitCount: 1,
  },
  {
    id: "V003",
    name: "Jennifer Lee",
    email: "jennifer.l@example.com",
    phone: "+1 (555) 345-6789",
    company: "Global Tech",
    lastVisit: "2023-11-10",
    visitCount: 5,
  },
  {
    id: "V004",
    name: "Thomas Moore",
    email: "thomas.m@example.com",
    phone: "+1 (555) 456-7890",
    company: "Innovate Solutions",
    lastVisit: "2023-11-15",
    visitCount: 2,
  },
  {
    id: "V005",
    name: "Rebecca Clark",
    email: "rebecca.c@example.com",
    phone: "+1 (555) 567-8901",
    company: "Future Systems",
    lastVisit: "2023-11-20",
    visitCount: 4,
  },
]

const mockVisitorLogs: VisitorLog[] = [
  {
    id: "L001",
    visitorId: "V001",
    visitorName: "Sarah Johnson",
    visitorEmail: "sarah.j@example.com",
    hostId: "U005",
    hostName: "Michael Brown",
    department: "Marketing",
    checkInTime: "2023-11-22 10:30:00",
    checkOutTime: "2023-11-22 11:45:00",
    entryMethod: "Manual",
    status: "completed",
  },
  {
    id: "L002",
    visitorId: "V002",
    visitorName: "David Wilson",
    visitorEmail: "david.w@example.com",
    hostId: "U002",
    hostName: "Emma Davis",
    department: "Finance",
    checkInTime: "2023-11-22 11:15:00",
    checkOutTime: null,
    entryMethod: "Facial Recognition",
    status: "active",
  },
  {
    id: "L003",
    visitorId: "V003",
    visitorName: "Jennifer Lee",
    visitorEmail: "jennifer.l@example.com",
    hostId: "U004",
    hostName: "Robert Taylor",
    department: "HR",
    checkInTime: "2023-11-21 09:45:00",
    checkOutTime: "2023-11-21 10:30:00",
    entryMethod: "Manual",
    status: "completed",
  },
  {
    id: "L004",
    visitorId: "V004",
    visitorName: "Thomas Moore",
    visitorEmail: "thomas.m@example.com",
    hostId: "U001",
    hostName: "Patricia White",
    department: "IT",
    checkInTime: "2023-11-21 13:30:00",
    checkOutTime: null,
    entryMethod: "Facial Recognition",
    status: "active",
  },
  {
    id: "L005",
    visitorId: "V005",
    visitorName: "Rebecca Clark",
    visitorEmail: "rebecca.c@example.com",
    hostId: "U003",
    hostName: "James Anderson",
    department: "Sales",
    checkInTime: "2023-11-20 14:00:00",
    checkOutTime: "2023-11-20 15:15:00",
    entryMethod: "Manual",
    status: "completed",
  },
]

const mockAppointments: Appointment[] = [
  {
    id: "A001",
    visitorId: "V001",
    visitorName: "Emily Parker",
    visitorEmail: "emily.p@example.com",
    hostId: "U001",
    hostName: "John Smith",
    date: new Date().toISOString(),
    startTime: "14:30",
    endTime: "15:30",
    location: "Conference Room A",
    purpose: "Interview",
    status: "scheduled",
  },
  {
    id: "A002",
    visitorId: "V002",
    visitorName: "Alex Rodriguez",
    visitorEmail: "alex.r@example.com",
    hostId: "U002",
    hostName: "Lisa Johnson",
    date: new Date().toISOString(),
    startTime: "15:00",
    endTime: "16:00",
    location: "Meeting Room 2",
    purpose: "Client Meeting",
    status: "scheduled",
  },
  {
    id: "A003",
    visitorId: "V003",
    visitorName: "Sophia Williams",
    visitorEmail: "sophia.w@example.com",
    hostId: "U003",
    hostName: "David Chen",
    date: new Date().toISOString(),
    startTime: "16:15",
    endTime: "17:00",
    location: "Office 305",
    purpose: "Contract Signing",
    status: "scheduled",
  },
  {
    id: "A004",
    visitorId: "V004",
    visitorName: "Marcus Lee",
    visitorEmail: "marcus.l@example.com",
    hostId: "U004",
    hostName: "Sarah Thompson",
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    startTime: "10:00",
    endTime: "11:30",
    location: "Conference Room B",
    purpose: "Project Discussion",
    status: "scheduled",
  },
]

const mockAccessLogs: AccessLog[] = [
  {
    id: "AL001",
    userId: "U001",
    userName: "John Smith",
    accessPoint: "Main Entrance",
    timestamp: "2023-11-22 08:30:15",
    method: "Card",
    status: "success",
  },
  {
    id: "AL002",
    userId: "U002",
    userName: "Lisa Johnson",
    accessPoint: "East Wing",
    timestamp: "2023-11-22 09:15:22",
    method: "Facial Recognition",
    status: "success",
  },
  {
    id: "AL003",
    userId: "U003",
    userName: "David Chen",
    accessPoint: "Server Room",
    timestamp: "2023-11-22 10:05:47",
    method: "Card",
    status: "success",
  },
  {
    id: "AL004",
    userId: null,
    userName: "Unknown",
    accessPoint: "South Entrance",
    timestamp: "2023-11-22 11:30:05",
    method: "Facial Recognition",
    status: "failed",
  },
  {
    id: "AL005",
    userId: "U004",
    userName: "Sarah Thompson",
    accessPoint: "Executive Office",
    timestamp: "2023-11-22 13:45:33",
    method: "Card",
    status: "success",
  },
]

const mockDashboardStats: DashboardStats = {
  totalVisitorsToday: 24,
  checkedInVisitors: 18,
  upcomingAppointments: 7,
  averageVisitDuration: "42m",
  visitorsTrend: 12,
  checkedInTrend: 8,
  appointmentsTrend: -3,
  durationTrend: 5,
}

const mockVisitorStats: VisitorStats = {
  daily: [
    { name: "Mon", visitors: 32, checkedIn: 24 },
    { name: "Tue", visitors: 40, checkedIn: 36 },
    { name: "Wed", visitors: 45, checkedIn: 40 },
    { name: "Thu", visitors: 30, checkedIn: 26 },
    { name: "Fri", visitors: 49, checkedIn: 44 },
    { name: "Sat", visitors: 22, checkedIn: 20 },
    { name: "Sun", visitors: 18, checkedIn: 16 },
  ],
  hourly: [
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
  ],
  demographics: [
    { name: "Clients", value: 45, color: "#4A5FFF" },
    { name: "Vendors", value: 25, color: "#10B981" },
    { name: "Interviews", value: 15, color: "#F59E0B" },
    { name: "Other", value: 15, color: "#6B7280" },
  ],
  appointments: [
    { name: "Mon", scheduled: 12, completed: 10, canceled: 2 },
    { name: "Tue", scheduled: 15, completed: 13, canceled: 2 },
    { name: "Wed", scheduled: 18, completed: 15, canceled: 3 },
    { name: "Thu", scheduled: 14, completed: 12, canceled: 2 },
    { name: "Fri", scheduled: 20, completed: 17, canceled: 3 },
    { name: "Sat", scheduled: 8, completed: 7, canceled: 1 },
    { name: "Sun", scheduled: 5, completed: 4, canceled: 1 },
  ],
}

const mockAccessStats: AccessStats = {
  departmentAccess: [
    { name: "Marketing", count: 145 },
    { name: "Sales", count: 120 },
    { name: "IT", count: 95 },
    { name: "HR", count: 85 },
    { name: "Finance", count: 65 },
    { name: "Operations", count: 55 },
    { name: "Executive", count: 40 },
  ],
  securityIncidents: [
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
  ],
}

// Mock service implementation
export class MockService {
  // Users
  async getUsers(): Promise<User[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    return [...mockUsers]
  }

  async getUserById(id: string): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockUsers.find((user) => user.id === id) || null
  }

  // Visitors
  async getVisitors(): Promise<Visitor[]> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return [...mockVisitors]
  }

  async getVisitorById(id: string): Promise<Visitor | null> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockVisitors.find((visitor) => visitor.id === id) || null
  }

  // Visitor Logs
  async getVisitorLogs(): Promise<VisitorLog[]> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return [...mockVisitorLogs]
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return [...mockAppointments]
  }

  // Access Logs
  async getAccessLogs(): Promise<AccessLog[]> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return [...mockAccessLogs]
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<DashboardStats> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return { ...mockDashboardStats }
  }

  // Visitor Stats
  async getVisitorStats(): Promise<VisitorStats> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return JSON.parse(JSON.stringify(mockVisitorStats))
  }

  // Access Stats
  async getAccessStats(): Promise<AccessStats> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return JSON.parse(JSON.stringify(mockAccessStats))
  }
}

// Create a singleton instance
export const mockService = new MockService()

