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
import { Search, Plus, MoreHorizontal, Phone, Mail, RefreshCw, Trash2, Edit } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import type { CreateVisitorData, UpdateVisitorData } from "@/hooks/use-visitor-management"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { VisitorFormDialog } from "./visitor-form-dialog"
import type { Visitor } from "@/lib/types/models"

interface VisitorsTabProps {
  visitors?: Visitor[]
  isLoading?: boolean
  onRefresh?: () => void
  onDelete?: (id: string) => Promise<void>
  onBulkDelete?: (ids: string[]) => Promise<void>
  onCreateVisitor?: (data: CreateVisitorData) => Promise<void>
  onUpdateVisitor?: (data: UpdateVisitorData) => Promise<void>
}

export function VisitorsTab({
  visitors = [],
  isLoading = false,
  onRefresh,
  onDelete,
  onBulkDelete,
  onCreateVisitor,
  onUpdateVisitor,
}: VisitorsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVisitors, setSelectedVisitors] = useState<string[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [visitorToDelete, setVisitorToDelete] = useState<string | null>(null)
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [visitorToEdit, setVisitorToEdit] = useState<Visitor | undefined>(undefined)

  const filteredVisitors = visitors.filter(
    (visitor) =>
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.phone.includes(searchTerm),
  )

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true)
      await onRefresh()
      setIsRefreshing(false)
    }
  }

  const handleSelectAll = () => {
    if (selectedVisitors.length === filteredVisitors.length) {
      setSelectedVisitors([])
    } else {
      setSelectedVisitors(filteredVisitors.map((visitor) => visitor.id))
    }
  }

  const handleSelectVisitor = (id: string) => {
    if (selectedVisitors.includes(id)) {
      setSelectedVisitors(selectedVisitors.filter((visitorId) => visitorId !== id))
    } else {
      setSelectedVisitors([...selectedVisitors, id])
    }
  }

  const handleDeleteClick = (id: string) => {
    setVisitorToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (visitorToDelete && onDelete) {
      await onDelete(visitorToDelete)
      setVisitorToDelete(null)
    }
    setIsDeleteDialogOpen(false)
  }

  const handleBulkDeleteClick = () => {
    if (selectedVisitors.length > 0) {
      setIsBulkDeleteDialogOpen(true)
    }
  }

  const handleBulkDeleteConfirm = async () => {
    if (selectedVisitors.length > 0 && onBulkDelete) {
      await onBulkDelete(selectedVisitors)
      setSelectedVisitors([])
    }
    setIsBulkDeleteDialogOpen(false)
  }

  const handleAddVisitor = () => {
    setIsAddDialogOpen(true)
  }

  const handleEditVisitor = (visitor: Visitor) => {
    setVisitorToEdit(visitor)
    setIsEditDialogOpen(true)
  }

  const handleCreateVisitor = async (data: CreateVisitorData) => {
    if (onCreateVisitor) {
      await onCreateVisitor(data)
    }
  }

  const handleUpdateVisitor = async (data: UpdateVisitorData) => {
    if (onUpdateVisitor) {
      await onUpdateVisitor(data)
    }
  }

  // Render skeleton rows for loading state
  const renderSkeletonRows = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={`skeleton-${index}`} className="h-[40px]">
          <TableCell className="py-1 px-2 w-[40px]">
            <Skeleton className="h-3.5 w-3.5 rounded" />
          </TableCell>
          <TableCell className="py-1 px-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
          </TableCell>
          <TableCell className="py-1 px-2">
            <div className="flex flex-col gap-0.5">
              <Skeleton className="h-3 w-[140px]" />
              <Skeleton className="h-3 w-[120px]" />
            </div>
          </TableCell>
          <TableCell className="py-1 px-2">
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell className="py-1 px-2">
            <Skeleton className="h-4 w-[80px]" />
          </TableCell>
          <TableCell className="py-1 px-2">
            <Skeleton className="h-4 w-[40px]" />
          </TableCell>
          <TableCell className="py-1 px-2 w-[70px]">
            <Skeleton className="h-6 w-6 rounded" />
          </TableCell>
        </TableRow>
      ))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search visitors..."
            className="w-full h-7 pl-7 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1 px-2 py-0 font-normal"
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          {selectedVisitors.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              className="h-7 text-xs gap-1 px-2 py-0 font-normal"
              onClick={handleBulkDeleteClick}
            >
              <Trash2 className="h-3 w-3" />
              Delete ({selectedVisitors.length})
            </Button>
          )}
          <Button size="sm" className="h-7 text-xs gap-1 px-2 py-0 font-normal" onClick={handleAddVisitor}>
            <Plus className="h-3 w-3" />
            Add Visitor
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent h-8">
              <TableHead className="text-[10px] font-semibold py-1 px-2 w-[40px]">
                <Checkbox
                  checked={filteredVisitors.length > 0 && selectedVisitors.length === filteredVisitors.length}
                  onCheckedChange={handleSelectAll}
                  disabled={isLoading || filteredVisitors.length === 0}
                  className="h-3.5 w-3.5"
                />
              </TableHead>
              <TableHead className="text-[10px] font-semibold py-1 px-2">Visitor</TableHead>
              <TableHead className="text-[10px] font-semibold py-1 px-2">Contact</TableHead>
              <TableHead className="text-[10px] font-semibold py-1 px-2">Company</TableHead>
              <TableHead className="text-[10px] font-semibold py-1 px-2">Last Visit</TableHead>
              <TableHead className="text-[10px] font-semibold py-1 px-2">Visit Count</TableHead>
              <TableHead className="w-[70px] text-[10px] font-semibold py-1 px-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeletonRows()
            ) : filteredVisitors.length > 0 ? (
              filteredVisitors.map((visitor) => (
                <TableRow key={visitor.id} className="text-xs h-[40px]">
                  <TableCell className="py-1 px-2">
                    <Checkbox
                      checked={selectedVisitors.includes(visitor.id)}
                      onCheckedChange={() => handleSelectVisitor(visitor.id)}
                      className="h-3.5 w-3.5"
                    />
                  </TableCell>
                  <TableCell className="py-1 px-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={visitor.avatarUrl || `/placeholder.svg?height=24&width=24`}
                          alt={visitor.name}
                        />
                        <AvatarFallback className="text-[10px]">
                          {visitor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-xs">{visitor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-1 px-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center text-[10px]">
                        <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                        {visitor.email}
                      </div>
                      <div className="flex items-center text-[10px]">
                        <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                        {visitor.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-1 px-2 text-xs">{visitor.company}</TableCell>
                  <TableCell className="py-1 px-2 text-xs">{visitor.lastVisit}</TableCell>
                  <TableCell className="py-1 px-2 text-xs">{visitor.visitCount}</TableCell>
                  <TableCell className="py-1 px-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-3 w-3" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel className="text-[10px] font-semibold">Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="text-xs font-normal">View details</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs font-normal" onClick={() => handleEditVisitor(visitor)}>
                          <Edit className="mr-1 h-3 w-3" />
                          Edit visitor
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs font-normal">Create appointment</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-xs font-normal text-destructive"
                          onClick={() => handleDeleteClick(visitor.id)}
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete visitor
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-16 text-center text-xs">
                  No visitors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="max-w-[400px] p-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">Delete Visitor</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete this visitor? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel className="h-7 text-xs font-normal">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-7 text-xs font-normal bg-destructive hover:bg-destructive/90"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
        <AlertDialogContent className="max-w-[400px] p-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">Delete Multiple Visitors</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete {selectedVisitors.length} visitors? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel className="h-7 text-xs font-normal">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-7 text-xs font-normal bg-destructive hover:bg-destructive/90"
              onClick={handleBulkDeleteConfirm}
            >
              Delete {selectedVisitors.length} visitors
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Visitor Dialog */}
      <VisitorFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleCreateVisitor}
        title="Add New Visitor"
      />

      {/* Edit Visitor Dialog */}
      <VisitorFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdateVisitor}
        visitor={visitorToEdit}
        title="Edit Visitor"
      />
    </div>
  )
}

