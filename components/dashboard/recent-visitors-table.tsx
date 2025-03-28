"use client"

import { useState } from "react"
import { MoreHorizontal, ArrowUpDown, UserCheck, UserX } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
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

// Mock data for recent visitors
const recentVisitors = [
  {
    id: "V001",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    host: "Michael Brown",
    department: "Marketing",
    checkIn: "10:30 AM",
    checkOut: "11:45 AM",
    status: "completed",
  },
  {
    id: "V002",
    name: "David Wilson",
    email: "david.w@example.com",
    host: "Emma Davis",
    department: "Finance",
    checkIn: "11:15 AM",
    checkOut: null,
    status: "active",
  },
  {
    id: "V003",
    name: "Jennifer Lee",
    email: "jennifer.l@example.com",
    host: "Robert Taylor",
    department: "HR",
    checkIn: "09:45 AM",
    checkOut: "10:30 AM",
    status: "completed",
  },
  {
    id: "V004",
    name: "Thomas Moore",
    email: "thomas.m@example.com",
    host: "Patricia White",
    department: "IT",
    checkIn: "01:30 PM",
    checkOut: null,
    status: "active",
  },
  {
    id: "V005",
    name: "Rebecca Clark",
    email: "rebecca.c@example.com",
    host: "James Anderson",
    department: "Sales",
    checkIn: "02:00 PM",
    checkOut: "03:15 PM",
    status: "completed",
  },
]

export function RecentVisitorsTable() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Sort the data based on the current sort column and direction
  const sortedVisitors = [...recentVisitors].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (aValue === null) return sortDirection === "asc" ? 1 : -1
    if (bValue === null) return sortDirection === "asc" ? -1 : 1

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Visitor</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("host")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Host
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("department")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Department
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("checkIn")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Check In
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("checkOut")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Check Out
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("status")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Status
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedVisitors.map((visitor) => (
            <TableRow key={visitor.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={visitor.name} />
                    <AvatarFallback>
                      {visitor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{visitor.name}</span>
                    <span className="text-xs text-muted-foreground">{visitor.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{visitor.host}</TableCell>
              <TableCell>{visitor.department}</TableCell>
              <TableCell>{visitor.checkIn}</TableCell>
              <TableCell>{visitor.checkOut || "—"}</TableCell>
              <TableCell>
                <Badge variant={visitor.status === "active" ? "default" : "secondary"}>
                  {visitor.status === "active" ? (
                    <UserCheck className="mr-1 h-3 w-3" />
                  ) : (
                    <UserX className="mr-1 h-3 w-3" />
                  )}
                  {visitor.status === "active" ? "Active" : "Completed"}
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
                    {visitor.status === "active" && <DropdownMenuItem>Check out</DropdownMenuItem>}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit record</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

