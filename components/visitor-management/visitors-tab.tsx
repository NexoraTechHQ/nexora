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

// Mock data for visitors
const visitors = [
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

export function VisitorsTab() {
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search visitors..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Add Visitor
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visitor</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Visit Count</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVisitors.length > 0 ? (
              filteredVisitors.map((visitor) => (
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
                      <span className="font-medium">{visitor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
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
                  <TableCell>{visitor.company}</TableCell>
                  <TableCell>{visitor.lastVisit}</TableCell>
                  <TableCell>{visitor.visitCount}</TableCell>
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
                        <DropdownMenuItem>Edit visitor</DropdownMenuItem>
                        <DropdownMenuItem>Create appointment</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View visit history</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
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

