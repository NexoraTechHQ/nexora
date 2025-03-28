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
import type { VisitorLog } from "@/lib/types/models"

interface RecentVisitorsTableProps {
  visitors: VisitorLog[]
}

export function RecentVisitorsTable({ visitors }: RecentVisitorsTableProps) {
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
  const sortedVisitors = [...visitors].sort((a, b) => {
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
                onClick={() => handleSort("hostName")}
                className="flex items-center gap-1 p-0 h-auto font-medium text-xs"
              >
                Host
                <ArrowUpDown className="h-2.5 w-2.5" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("department")}
                className="flex items-center gap-1 p-0 h-auto font-medium text-xs"
              >
                Department
                <ArrowUpDown className="h-2.5 w-2.5" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("checkInTime")}
                className="flex items-center gap-1 p-0 h-auto font-medium text-xs"
              >
                Check In
                <ArrowUpDown className="h-2.5 w-2.5" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("checkOutTime")}
                className="flex items-center gap-1 p-0 h-auto font-medium text-xs"
              >
                Check Out
                <ArrowUpDown className="h-2.5 w-2.5" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("status")}
                className="flex items-center gap-1 p-0 h-auto font-medium text-xs"
              >
                Status
                <ArrowUpDown className="h-2.5 w-2.5" />
              </Button>
            </TableHead>
            <TableHead className="w-[60px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedVisitors.map((visitor) => (
            <TableRow key={visitor.id} className="text-xs">
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={visitor.visitorName} />
                    <AvatarFallback className="text-[10px]">
                      {visitor.visitorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{visitor.visitorName}</span>
                    <span className="text-[10px] text-muted-foreground">{visitor.visitorEmail}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{visitor.hostName}</TableCell>
              <TableCell>{visitor.department}</TableCell>
              <TableCell>
                {new Date(visitor.checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </TableCell>
              <TableCell>
                {visitor.checkOutTime
                  ? new Date(visitor.checkOutTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : "—"}
              </TableCell>
              <TableCell>
                <Badge
                  variant={visitor.status === "active" ? "default" : "secondary"}
                  className="text-[10px] px-1 py-0"
                >
                  {visitor.status === "active" ? (
                    <UserCheck className="mr-1 h-2.5 w-2.5" />
                  ) : (
                    <UserX className="mr-1 h-2.5 w-2.5" />
                  )}
                  {visitor.status === "active" ? "Active" : "Completed"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
                    <DropdownMenuItem className="text-xs">View details</DropdownMenuItem>
                    {visitor.status === "active" && <DropdownMenuItem className="text-xs">Check out</DropdownMenuItem>}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-xs">Edit record</DropdownMenuItem>
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

