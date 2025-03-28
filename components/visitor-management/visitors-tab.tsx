"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, MoreHorizontal, Phone, Mail } from "lucide-react"
import type { Visitor } from "@/lib/types/models"

interface VisitorsTabProps {
  visitors?: Visitor[]
}

export function VisitorsTab({ visitors = [] }: VisitorsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVisitors = visitors.filter(
    (visitor) =>
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.phone.includes(searchTerm),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search visitors..."
            className="w-full h-8 pl-7 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button size="sm" className="h-8 text-sm gap-1 px-3 py-0 font-normal">
          <Plus className="h-3.5 w-3.5" />
          Add Visitor
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-semibold">Visitor</TableHead>
              <TableHead className="text-xs font-semibold">Contact</TableHead>
              <TableHead className="text-xs font-semibold">Company</TableHead>
              <TableHead className="text-xs font-semibold">Last Visit</TableHead>
              <TableHead className="text-xs font-semibold">Visit Count</TableHead>
              <TableHead className="w-[70px] text-xs font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVisitors.length > 0 ? (
              filteredVisitors.map((visitor) => (
                <TableRow key={visitor.id} className="text-xs">
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={visitor.avatarUrl || `/placeholder.svg?height=24&width=24`}
                          alt={visitor.name}
                        />
                        <AvatarFallback className="text-xs">
                          {visitor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{visitor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center text-xs">
                        <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                        {visitor.email}
                      </div>
                      <div className="flex items-center text-xs">
                        <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                        {visitor.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 text-sm">{visitor.company}</TableCell>
                  <TableCell className="py-2 text-sm">{visitor.lastVisit}</TableCell>
                  <TableCell className="py-2 text-sm">{visitor.visitCount}</TableCell>
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
                        <DropdownMenuItem className="text-sm font-normal">Edit visitor</DropdownMenuItem>
                        <DropdownMenuItem className="text-sm font-normal">Create appointment</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-sm font-normal">View visit history</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-20 text-center text-xs">
                  No visitors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

