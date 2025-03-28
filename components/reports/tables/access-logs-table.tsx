"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { AccessLog } from "@/lib/types/models"

interface AccessLogsTableProps {
  logs: AccessLog[]
}

export function AccessLogsTable({ logs }: AccessLogsTableProps) {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("userName")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  User
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("accessPoint")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Access Point
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("timestamp")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Timestamp
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("method")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Method
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={log.userName} />
                        <AvatarFallback>
                          {log.userName === "Unknown"
                            ? "?"
                            : log.userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{log.userName}</span>
                        <span className="text-xs text-muted-foreground">{log.userId || "N/A"}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{log.accessPoint}</TableCell>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{log.method}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === "success" ? "default" : "destructive"}>
                      {log.status === "success" ? "Success" : "Failed"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
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

