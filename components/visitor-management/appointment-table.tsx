"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Appointment } from "@/lib/types/models"

interface AppointmentTableProps {
  date: Date
  appointments: Appointment[]
}

export function AppointmentTable({ date, appointments }: AppointmentTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter appointments for the selected date and search term
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date)
    const isSameDate = appointmentDate.toDateString() === date.toDateString()

    const matchesSearch =
      appointment.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchTerm.toLowerCase())

    return isSameDate && (searchTerm === "" || matchesSearch)
  })

  // If no appointments are provided, show sample data
  const displayAppointments = appointments.length === 0 ? sampleAppointments : filteredAppointments

  return (
    <div className="bg-background">
      <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-sm font-medium">Appointments for {format(date, "EEEE, MMMM d, yyyy")}</h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search appointments..."
            className="pl-8 h-9 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Visitor</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayAppointments.length > 0 ? (
              displayAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.visitorName}</TableCell>
                  <TableCell>{appointment.hostName}</TableCell>
                  <TableCell>
                    {appointment.startTime} - {appointment.endTime}
                  </TableCell>
                  <TableCell>{appointment.location}</TableCell>
                  <TableCell>{appointment.purpose}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(appointment.status)} className="text-xs">
                      {formatStatus(appointment.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit appointment</DropdownMenuItem>
                        {appointment.status === "scheduled" && <DropdownMenuItem>Check in</DropdownMenuItem>}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Cancel appointment</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No appointments found for this date.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// Helper functions
function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "scheduled":
      return "default"
    case "checked-in":
      return "secondary"
    case "completed":
      return "outline"
    case "canceled":
      return "destructive"
    default:
      return "default"
  }
}

function formatStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

// Sample data for demonstration
const sampleAppointments: Appointment[] = [
  {
    id: "A001",
    visitorId: "V001",
    visitorName: "Emily Parker",
    visitorEmail: "emily.p@example.com",
    hostId: "U001",
    hostName: "John Smith",
    date: new Date().toISOString(),
    startTime: "09:30",
    endTime: "10:30",
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
    startTime: "11:00",
    endTime: "12:00",
    location: "Meeting Room 2",
    purpose: "Client Meeting",
    status: "checked-in",
  },
  {
    id: "A003",
    visitorId: "V003",
    visitorName: "Sophia Williams",
    visitorEmail: "sophia.w@example.com",
    hostId: "U003",
    hostName: "David Chen",
    date: new Date().toISOString(),
    startTime: "14:15",
    endTime: "15:00",
    location: "Office 305",
    purpose: "Contract Signing",
    status: "completed",
  },
  {
    id: "A004",
    visitorId: "V004",
    visitorName: "Marcus Lee",
    visitorEmail: "marcus.l@example.com",
    hostId: "U004",
    hostName: "Sarah Thompson",
    date: new Date().toISOString(),
    startTime: "16:00",
    endTime: "17:30",
    location: "Conference Room B",
    purpose: "Project Discussion",
    status: "canceled",
  },
]

