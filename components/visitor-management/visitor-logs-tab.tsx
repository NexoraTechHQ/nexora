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
import type { VisitorLog } from "@/lib/types/models"

interface VisitorLogsTabProps {
  logs?: VisitorLog[]
}

export function VisitorLogsTab({ logs = [] }: VisitorLogsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [entryMethodFilter, setEntryMethodFilter] = useState<string>("all")

  const filteredLogs = logs.filter((log) => {
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="w-full h-8 pl-7 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px] h-8 text-sm font-normal">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-sm font-normal">
                All Status
              </SelectItem>
              <SelectItem value="active" className="text-sm font-normal">
                Active
              </SelectItem>
              <SelectItem value="completed" className="text-sm font-normal">
                Completed
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={entryMethodFilter} onValueChange={setEntryMethodFilter}>
            <SelectTrigger className="w-[150px] h-8 text-sm font-normal">
              <SelectValue placeholder="Entry Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-sm font-normal">
                All Methods
              </SelectItem>
              <SelectItem value="manual" className="text-sm font-normal">
                Manual
              </SelectItem>
              <SelectItem value="facial recognition" className="text-sm font-normal">
                Facial Recognition
              </SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="h-8 text-sm gap-1 px-3 py-0 font-normal">
            <Calendar className="h-3.5 w-3.5" />
            Date Range
          </Button>

          <Button variant="outline" size="sm" className="h-8 text-sm gap-1 px-3 py-0 font-normal">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-semibold">Visitor</TableHead>
              <TableHead className="text-xs font-semibold">Host</TableHead>
              <TableHead className="text-xs font-semibold">Department</TableHead>
              <TableHead className="text-xs font-semibold">Check In</TableHead>
              <TableHead className="text-xs font-semibold">Check Out</TableHead>
              <TableHead className="text-xs font-semibold">Entry Method</TableHead>
              <TableHead className="text-xs font-semibold">Status</TableHead>
              <TableHead className="w-[70px] text-xs font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id} className="text-xs">
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={log.visitorName} />
                        <AvatarFallback className="text-xs">
                          {log.visitorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{log.visitorName}</span>
                        <span className="text-xs text-muted-foreground">{log.visitorEmail}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 text-sm">{log.hostName}</TableCell>
                  <TableCell className="py-2 text-sm">{log.department}</TableCell>
                  <TableCell className="py-2 text-xs">{new Date(log.checkInTime).toLocaleString()}</TableCell>
                  <TableCell className="py-2 text-xs">
                    {log.checkOutTime ? new Date(log.checkOutTime).toLocaleString() : "—"}
                  </TableCell>
                  <TableCell className="py-2 text-sm">{log.entryMethod}</TableCell>
                  <TableCell className="py-2">
                    <Badge
                      variant={log.status === "active" ? "default" : "secondary"}
                      className="text-xs px-1.5 py-0 font-normal"
                    >
                      {log.status === "active" ? "Active" : "Completed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel className="text-xs font-semibold">Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="text-sm font-normal">View details</DropdownMenuItem>
                        {log.status === "active" && (
                          <DropdownMenuItem className="text-sm font-normal">Check out visitor</DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-sm font-normal">Edit record</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-20 text-center text-xs">
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

