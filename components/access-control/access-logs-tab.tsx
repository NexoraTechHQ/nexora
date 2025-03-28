"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { AccessLog } from "@/lib/types/models"

interface AccessLogsTabProps {
  logs: AccessLog[]
}

export function AccessLogsTab({ logs = [] }: AccessLogsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
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

  // Filter and sort the data
  const filteredLogs = logs
    .filter(
      (log) =>
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.accessPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.status.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
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

  if (logs.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-center">
        <div className="flex flex-col items-center gap-2 max-w-md">
          <h3 className="text-base font-semibold">Access Logs</h3>
          <p className="text-sm text-muted-foreground">
            This section will display records of access events with timestamps and recognition details.
          </p>
          <Button className="mt-4 text-sm font-normal">Coming Soon</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="h-8 pl-7 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("userName")}
                  className="flex items-center gap-1 p-0 h-auto font-semibold text-xs"
                >
                  User
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-xs font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("accessPoint")}
                  className="flex items-center gap-1 p-0 h-auto font-semibold text-xs"
                >
                  Access Point
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-xs font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("timestamp")}
                  className="flex items-center gap-1 p-0 h-auto font-semibold text-xs"
                >
                  Timestamp
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-xs font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("method")}
                  className="flex items-center gap-1 p-0 h-auto font-semibold text-xs"
                >
                  Method
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-xs font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 p-0 h-auto font-semibold text-xs"
                >
                  Status
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id} className="text-xs">
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={log.userName} />
                        <AvatarFallback className="text-xs">
                          {log.userName === "Unknown"
                            ? "?"
                            : log.userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{log.userName}</span>
                        <span className="text-xs text-muted-foreground">{log.userId || "N/A"}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 text-sm">{log.accessPoint}</TableCell>
                  <TableCell className="py-2 text-xs">{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="py-2 text-sm">{log.method}</TableCell>
                  <TableCell className="py-2">
                    <Badge
                      variant={log.status === "success" ? "default" : "destructive"}
                      className="text-xs px-1.5 py-0 font-normal"
                    >
                      {log.status === "success" ? "Success" : "Failed"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-20 text-center text-sm">
                  No access logs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

