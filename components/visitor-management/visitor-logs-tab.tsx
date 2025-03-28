"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Calendar, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for visitor logs
const visitorLogs = [
  {
    id: "L001",
    visitorName: "Sarah Johnson",
    visitorEmail: "sarah.j@example.com",
    hostName: "Michael Brown",
    department: "Marketing",
    checkInTime: "2023-11-22 10:30:00",
    checkOutTime: "2023-11-22 11:45:00",
    entryMethod: "Manual",
    status: "completed",
  },
  {
    id: "L002",
    visitorName: "David Wilson",
    visitorEmail: "david.w@example.com",
    hostName: "Emma Davis",
    department: "Finance",
    checkInTime: "2023-11-22 11:15:00",
    checkOutTime: null,
    entryMethod: "Facial Recognition",
    status: "active",
  },
  {
    id: "L003",
    visitorName: "Jennifer Lee",
    visitorEmail: "jennifer.l@example.com",
    hostName: "Robert Taylor",
    department: "HR",
    checkInTime: "2023-11-21 09:45:00",
    checkOutTime: "2023-11-21 10:30:00",
    entryMethod: "Manual",
    status: "completed",
  },
  {
    id: "L004",
    visitorName: "Thomas Moore",
    visitorEmail: "thomas.m@example.com",
    hostName: "Patricia White",
    department: "IT",
    checkInTime: "2023-11-21 13:30:00",
    checkOutTime: null,
    entryMethod: "Facial Recognition",
    status: "active",
  },
  {
    id: "L005",
    visitorName: "Rebecca Clark",
    visitorEmail: "rebecca.c@example.com",
    hostName: "James Anderson",
    department: "Sales",
    checkInTime: "2023-11-20 14:00:00",
    checkOutTime: "2023-11-20 15:15:00",
    entryMethod: "Manual",
    status: "completed",
  },
]

export function VisitorLogsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [entryMethodFilter, setEntryMethodFilter] = useState<string>("all")

  const filteredLogs = visitorLogs.filter((log) => {
    // Apply search filter
    const matchesSearch =
      log.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.visitorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.department.toLowerCase().includes(searchTerm.toLowerCase())

    // Apply status filter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && log.status === "active") ||
      (statusFilter === "completed" && log.status === "completed")

    // Apply entry method filter
    const matchesEntryMethod =
      entryMethodFilter === "all" || log.entryMethod.toLowerCase() === entryMethodFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesEntryMethod
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={entryMethodFilter} onValueChange={setEntryMethodFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Entry Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="facial recognition">Facial Recognition</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-1">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>

          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visitor</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Entry Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={log.visitorName} />
                        <AvatarFallback>
                          {log.visitorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{log.visitorName}</span>
                        <span className="text-xs text-muted-foreground">{log.visitorEmail}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{log.hostName}</TableCell>
                  <TableCell>{log.department}</TableCell>
                  <TableCell>{new Date(log.checkInTime).toLocaleString()}</TableCell>
                  <TableCell>{log.checkOutTime ? new Date(log.checkOutTime).toLocaleString() : "—"}</TableCell>
                  <TableCell>{log.entryMethod}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === "active" ? "default" : "secondary"}>
                      {log.status === "active" ? "Active" : "Completed"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        {log.status === "active" && <DropdownMenuItem>Check out visitor</DropdownMenuItem>}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit record</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No visitor logs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

