"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Trash2, AlertCircle } from "lucide-react"
import type { User } from "@/lib/types/models"
import { MsButton } from "@/components/ui/ms-button"
import { useUserManagement, type UserCreateData, type UserUpdateData } from "@/hooks/use-user-management"
import { Skeleton } from "@/components/ui/skeleton"

interface UsersTabProps {
  users?: User[]
  onRefresh?: () => void
  isLoading?: boolean
}

export function UsersTab({ users = [], onRefresh, isLoading = false }: UsersTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newUser, setNewUser] = useState<UserCreateData>({
    name: "",
    email: "",
    role: "user",
    department: "",
    status: "active",
  })

  // Use our custom hook for user management
  const { createUser, updateUser, deleteUsers } = useUserManagement()

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
    setIsAllSelected(!isAllSelected)
  }

  // Handle individual checkbox selection
  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  // Reset form when closing dialogs
  const resetForm = () => {
    setNewUser({
      name: "",
      email: "",
      role: "user",
      department: "",
      status: "active",
    })
    setEditingUser(null)
  }

  // Update isAllSelected when selectedUsers or filteredUsers change
  useEffect(() => {
    setIsAllSelected(filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length)
  }, [selectedUsers, filteredUsers])

  // Create user function
  const handleCreateUser = async () => {
    setIsSubmitting(true)
    try {
      await createUser(newUser)
      setIsCreateDialogOpen(false)
      resetForm()
      if (onRefresh) onRefresh()
    } catch (error) {
      // Error is already handled in the hook
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update user function
  const handleUpdateUser = async () => {
    if (!editingUser) return

    setIsSubmitting(true)
    try {
      await updateUser(editingUser as UserUpdateData)
      setIsEditDialogOpen(false)
      resetForm()
      if (onRefresh) onRefresh()
    } catch (error) {
      // Error is already handled in the hook
    } finally {
      setIsSubmitting(false)
    }
  }

  // Delete users function
  const handleDeleteUsers = async () => {
    setIsSubmitting(true)
    try {
      await deleteUsers(selectedUsers)
      setIsDeleteDialogOpen(false)
      setSelectedUsers([])
      if (onRefresh) onRefresh()
    } catch (error) {
      // Error is already handled in the hook
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render skeleton rows for loading state
  const renderSkeletonRows = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={`skeleton-${index}`} className="text-xs">
          <TableCell className="py-1.5 px-2 w-[40px]">
            <Skeleton className="h-3.5 w-3.5 rounded" />
          </TableCell>
          <TableCell className="py-1.5 px-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2 w-32" />
              </div>
            </div>
          </TableCell>
          <TableCell className="py-1.5 px-2">
            <Skeleton className="h-3 w-16" />
          </TableCell>
          <TableCell className="py-1.5 px-2">
            <Skeleton className="h-3 w-20" />
          </TableCell>
          <TableCell className="py-1.5 px-2">
            <Skeleton className="h-4 w-12 rounded-full" />
          </TableCell>
          <TableCell className="py-1.5 px-2 w-[60px]">
            <Skeleton className="h-5 w-5 rounded" />
          </TableCell>
        </TableRow>
      ))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="w-full h-8 pl-7 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          {selectedUsers.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              className="h-7 text-xs gap-1 px-2 py-0 font-normal"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-3 w-3" />
              Delete Selected ({selectedUsers.length})
            </Button>
          )}
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={(open) => {
              setIsCreateDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm" className="h-7 text-xs gap-1 px-2 py-0 font-normal">
                <Plus className="h-3 w-3" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] p-4">
              <DialogHeader className="pb-2">
                <DialogTitle className="text-base">Add New User</DialogTitle>
                <DialogDescription className="text-xs mt-1">
                  Create a new user account. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 py-3">
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="name" className="text-xs text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="col-span-3 h-8 text-xs"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="email" className="text-xs text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="col-span-3 h-8 text-xs"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="department" className="text-xs text-right">
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    className="col-span-3 h-8 text-xs"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="role" className="text-xs text-right">
                    Role
                  </Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({ ...newUser, role: value as "admin" | "user" | "manager" })}
                  >
                    <SelectTrigger className="col-span-3 h-8 text-xs">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin" className="text-xs">
                        Admin
                      </SelectItem>
                      <SelectItem value="manager" className="text-xs">
                        Manager
                      </SelectItem>
                      <SelectItem value="user" className="text-xs">
                        User
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="status" className="text-xs text-right">
                    Status
                  </Label>
                  <Select
                    value={newUser.status}
                    onValueChange={(value) => setNewUser({ ...newUser, status: value as "active" | "inactive" })}
                  >
                    <SelectTrigger className="col-span-3 h-8 text-xs">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active" className="text-xs">
                        Active
                      </SelectItem>
                      <SelectItem value="inactive" className="text-xs">
                        Inactive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild>
                  <Button variant="outline" className="h-7 text-xs">
                    Cancel
                  </Button>
                </DialogClose>
                <MsButton
                  onClick={handleCreateUser}
                  isLoading={isSubmitting}
                  disabled={!newUser.name || !newUser.email || !newUser.department}
                  className="h-7 text-xs px-3"
                >
                  Create User
                </MsButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[40px] text-xs font-semibold p-2">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  disabled={filteredUsers.length === 0 || isLoading}
                  className="h-3.5 w-3.5"
                />
              </TableHead>
              <TableHead className="text-xs font-semibold p-2">Name</TableHead>
              <TableHead className="text-xs font-semibold p-2">Role</TableHead>
              <TableHead className="text-xs font-semibold p-2">Department</TableHead>
              <TableHead className="text-xs font-semibold p-2">Status</TableHead>
              <TableHead className="w-[60px] text-xs font-semibold p-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeletonRows()
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="text-xs">
                  <TableCell className="py-1.5 px-2">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleSelectUser(user.id)}
                      className="h-3.5 w-3.5"
                    />
                  </TableCell>
                  <TableCell className="py-1.5 px-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatarUrl || `/placeholder.svg?height=24&width=24`} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-xs">{user.name}</span>
                        <span className="text-[10px] text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-1.5 px-2 text-xs">{user.role}</TableCell>
                  <TableCell className="py-1.5 px-2 text-xs">{user.department}</TableCell>
                  <TableCell className="py-1.5 px-2">
                    <Badge
                      variant={user.status === "active" ? "default" : "secondary"}
                      className="text-[10px] px-1 py-0 font-normal"
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-1.5 px-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <MoreHorizontal className="h-3 w-3" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[140px]">
                        <DropdownMenuLabel className="text-[10px] font-semibold py-1">Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          className="text-xs font-normal py-1"
                          onClick={() => {
                            setEditingUser(user)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          Edit user
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs font-normal py-1">View details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" ? (
                          <DropdownMenuItem className="text-xs font-normal py-1 text-destructive">
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-xs font-normal py-1">Activate</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-16 text-center text-xs">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit User Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open)
          if (!open) resetForm()
        }}
      >
        <DialogContent className="sm:max-w-[400px] p-4">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-base">Edit User</DialogTitle>
            <DialogDescription className="text-xs mt-1">
              Update user information. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="grid gap-3 py-3">
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="edit-name" className="text-xs text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="col-span-3 h-8 text-xs"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="edit-email" className="text-xs text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="col-span-3 h-8 text-xs"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="edit-department" className="text-xs text-right">
                  Department
                </Label>
                <Input
                  id="edit-department"
                  value={editingUser.department}
                  onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                  className="col-span-3 h-8 text-xs"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="edit-role" className="text-xs text-right">
                  Role
                </Label>
                <Select
                  value={editingUser.role}
                  onValueChange={(value) =>
                    setEditingUser({ ...editingUser, role: value as "admin" | "user" | "manager" })
                  }
                >
                  <SelectTrigger className="col-span-3 h-8 text-xs">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin" className="text-xs">
                      Admin
                    </SelectItem>
                    <SelectItem value="manager" className="text-xs">
                      Manager
                    </SelectItem>
                    <SelectItem value="user" className="text-xs">
                      User
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="edit-status" className="text-xs text-right">
                  Status
                </Label>
                <Select
                  value={editingUser.status}
                  onValueChange={(value) => setEditingUser({ ...editingUser, status: value as "active" | "inactive" })}
                >
                  <SelectTrigger className="col-span-3 h-8 text-xs">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active" className="text-xs">
                      Active
                    </SelectItem>
                    <SelectItem value="inactive" className="text-xs">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button variant="outline" className="h-7 text-xs">
                Cancel
              </Button>
            </DialogClose>
            <MsButton
              onClick={handleUpdateUser}
              isLoading={isSubmitting}
              disabled={!editingUser?.name || !editingUser?.email || !editingUser?.department}
              className="h-7 text-xs px-3"
            >
              Save Changes
            </MsButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px] p-4">
          <DialogHeader className="pb-2">
            <DialogTitle className="flex items-center gap-2 text-base">
              <AlertCircle className="h-4 w-4 text-destructive" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-xs mt-1">
              Are you sure you want to delete {selectedUsers.length} selected user
              {selectedUsers.length !== 1 ? "s" : ""}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-2">
            <DialogClose asChild>
              <Button variant="outline" className="h-7 text-xs">
                Cancel
              </Button>
            </DialogClose>
            <MsButton
              variant="destructive"
              onClick={handleDeleteUsers}
              isLoading={isSubmitting}
              className="h-7 text-xs px-3"
            >
              Delete User{selectedUsers.length !== 1 ? "s" : ""}
            </MsButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

