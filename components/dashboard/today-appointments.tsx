"use client"

import { useState } from "react"
import { Clock, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for today's appointments
const appointments = [
  {
    id: "A001",
    visitorName: "Emily Parker",
    visitorEmail: "emily.p@example.com",
    hostName: "John Smith",
    time: "2:30 PM",
    location: "Conference Room A",
    purpose: "Interview",
  },
  {
    id: "A002",
    visitorName: "Alex Rodriguez",
    visitorEmail: "alex.r@example.com",
    hostName: "Lisa Johnson",
    time: "3:00 PM",
    location: "Meeting Room 2",
    purpose: "Client Meeting",
  },
  {
    id: "A003",
    visitorName: "Sophia Williams",
    visitorEmail: "sophia.w@example.com",
    hostName: "David Chen",
    time: "4:15 PM",
    location: "Office 305",
    purpose: "Contract Signing",
  },
  {
    id: "A004",
    visitorName: "Marcus Lee",
    visitorEmail: "marcus.l@example.com",
    hostName: "Sarah Thompson",
    time: "5:00 PM",
    location: "Conference Room B",
    purpose: "Project Discussion",
  },
]

export function TodayAppointments() {
  const [expandedAppointment, setExpandedAppointment] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedAppointment(expandedAppointment === id ? null : id)
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="rounded-lg border p-3 transition-all hover:bg-muted/50">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar className="mt-1">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={appointment.visitorName} />
                  <AvatarFallback>
                    {appointment.visitorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{appointment.visitorName}</h4>
                  <p className="text-sm text-muted-foreground">{appointment.visitorEmail}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{appointment.time}</span>
                    <MapPin className="ml-1 h-3 w-3" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => toggleExpand(appointment.id)}>
                {expandedAppointment === appointment.id ? "Less" : "More"}
              </Button>
            </div>

            {expandedAppointment === appointment.id && (
              <div className="mt-3 border-t pt-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Host</p>
                    <p>{appointment.hostName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Purpose</p>
                    <p>{appointment.purpose}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="w-full">
                    Reschedule
                  </Button>
                  <Button size="sm" className="w-full">
                    Check In
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

