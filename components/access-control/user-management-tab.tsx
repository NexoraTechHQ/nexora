"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  UserPlus,
  UserCheck,
  UserX,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function UserManagementTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock data for enterprise user management
  const users = [
    {
      id: "U001",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Administrator",
      department: "IT",
      status: "Active",
      lastAccess: "Today, 10:23 AM",
      securityLevel: "High",
    },
    {
      id: "U002",
      name: "Lisa Johnson",
      email: "lisa.johnson@example.com",
      role: "Manager",
      department: "Operations",
      status: "Active",
      lastAccess: "Today, 09:45 AM",
      securityLevel: "Medium",
    },
    {
      id: "U003",
      name: "David Chen",
      email: "david.chen@example.com",
      role: "User",
      department: "Finance",
      status: "Active",
      lastAccess: "Yesterday, 04:30 PM",
      securityLevel: "Standard",
    },
    {
      id: "U004",
      name: "Sarah Thompson",
      email: "sarah.thompson@example.com",
      role: "Manager",
      department: "HR",
      status: "Inactive",
      lastAccess: "3 days ago",
      securityLevel: "Medium",
    },
    {
      id: "U005",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "Administrator",
      department: "Security",
      status: "Active",
      lastAccess: "Today, 11:15 AM",
      securityLevel: "High",
    },
  ]

  // Filter users based on search term, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = selectedRole === "all" || user.role.toLowerCase() === selectedRole.toLowerCase()
    const matchesStatus = selectedStatus === "all" || user.status.toLowerCase() === selectedStatus.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all-users">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all-users">All Users</TabsTrigger>
            <TabsTrigger value="administrators">Administrators</TabsTrigger>
            <TabsTrigger value="managers">Managers</TabsTrigger>
            <TabsTrigger value="standard-users">Standard Users</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <UserPlus className="h-3.5 w-3.5" />
              <span>Add User</span>
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="w-full h-9 pl-7 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="h-9 w-[130px] text-sm">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="administrator">Administrator</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-9 w-[130px] text-sm">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>More Filters</span>
            </Button>
          </div>
        </div>

        <TabsContent value="all-users" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-semibold">User</TableHead>
                    <TableHead className="text-xs font-semibold">Role</TableHead>
                    <TableHead className="text-xs font-semibold">Department</TableHead>
                    <TableHead className="text-xs font-semibold">Security Level</TableHead>
                    <TableHead className="text-xs font-semibold">Last Access</TableHead>
                    <TableHead className="text-xs font-semibold">Status</TableHead>
                    <TableHead className="w-[70px] text-xs font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="text-xs">
                        <TableCell className="py-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                              <AvatarFallback className="text-xs">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">{user.name}</span>
                              <span className="text-xs text-muted-foreground">{user.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-2 text-sm">{user.role}</TableCell>
                        <TableCell className="py-2 text-sm">{user.department}</TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            {user.securityLevel === "High" && <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />}
                            {user.securityLevel === "Medium" && <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />}
                            {user.securityLevel === "Standard" && <ShieldCheck className="h-3.5 w-3.5 text-gray-500" />}
                            <span className="text-sm">{user.securityLevel}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-2 text-sm">{user.lastAccess}</TableCell>
                        <TableCell className="py-2">
                          <Badge
                            variant={user.status === "Active" ? "default" : "secondary"}
                            className="text-xs px-1.5 py-0 font-normal"
                          >
                            {user.status === "Active" ? (
                              <UserCheck className="mr-1 h-3 w-3" />
                            ) : (
                              <UserX className="mr-1 h-3 w-3" />
                            )}
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuLabel className="text-xs font-semibold">Actions</DropdownMenuLabel>
                              <DropdownMenuItem className="text-sm font-normal">Edit user</DropdownMenuItem>
                              <DropdownMenuItem className="text-sm font-normal">View details</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "Active" ? (
                                <DropdownMenuItem className="text-sm font-normal text-destructive">
                                  Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-sm font-normal">Activate</DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-20 text-center text-sm">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="administrators" className="mt-4">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-medium">Administrator Management</h3>
              <p className="text-sm text-muted-foreground mt-2">View and manage users with administrator privileges</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="managers" className="mt-4">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-medium">Manager Management</h3>
              <p className="text-sm text-muted-foreground mt-2">View and manage users with manager privileges</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standard-users" className="mt-4">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-medium">Standard User Management</h3>
              <p className="text-sm text-muted-foreground mt-2">View and manage users with standard privileges</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

