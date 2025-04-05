"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, Edit, Trash2, Calendar, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type { Appointment } from "@/lib/types/models"
import { format } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import { AppointmentFormDialog } from "./appointment-form-dialog"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AppointmentTableProps {
  appointments: Appointment[]
  isLoading: boolean
  onEdit: (appointment: Appointment) => void
  onDelete: (id: string) => void
  onBulkDelete: (ids: string[]) => void
}

export function AppointmentTable({ appointments, isLoading, onEdit, onDelete, onBulkDelete }: AppointmentTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [editAppointment, setEditAppointment] = useState<Appointment | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteAppointmentId, setDeleteAppointmentId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)

  const handleSelectAll = () => {
    if (selectedRows.length === appointments.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(appointments.map((appointment) => appointment.id))
    }
  }

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const handleEdit = (appointment: Appointment) => {
    setEditAppointment(appointment)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeleteAppointmentId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (deleteAppointmentId) {
      await onDelete(deleteAppointmentId)
      setDeleteAppointmentId(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleBulkDelete = () => {
    if (selectedRows.length > 0) {
      setIsBulkDeleteDialogOpen(true)
    }
  }

  const confirmBulkDelete = async () => {
    await onBulkDelete(selectedRows)
    setSelectedRows([])
    setIsBulkDeleteDialogOpen(false)
  }

  const handleEditSubmit = async (data: any) => {
    await onEdit({
      ...editAppointment!,
      ...data,
    })
    setEditAppointment(null)
    setIsEditDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "checked-in":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Generate skeleton rows for loading state
  const skeletonRows = Array.from({ length: 5 }, (_, i) => (
    <TableRow key={`skeleton-${i}`}>
      <TableCell className="w-[40px] p-2">
        <Skeleton className="h-4 w-4" />
      </TableCell>
      <TableCell className="p-2">
        <Skeleton className="h-4 w-[120px]" />
      </TableCell>
      <TableCell className="p-2">
        <Skeleton className="h-4 w-[150px]" />
      </TableCell>
      <TableCell className="p-2">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      </TableCell>
      <TableCell className="p-2">
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      </TableCell>
      <TableCell className="p-2">
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
      </TableCell>
      <TableCell className="p-2">
        <Skeleton className="h-4 w-[80px]" />
      </TableCell>
      <TableCell className="p-2">
        <Skeleton className="h-5 w-[60px] rounded-full" />
      </TableCell>
      <TableCell className="w-[50px] p-2">
        <Skeleton className="h-8 w-8 rounded-full" />
      </TableCell>
    </TableRow>
  ))

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[40px] p-2">
                <Checkbox
                  checked={appointments.length > 0 && selectedRows.length === appointments.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                  className="h-4 w-4"
                />
              </TableHead>
              <TableHead className="p-2 text-xs">Visitor</TableHead>
              <TableHead className="p-2 text-xs">Email</TableHead>
              <TableHead className="p-2 text-xs">Host(s)</TableHead>
              <TableHead className="p-2 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Date</span>
                </div>
              </TableHead>
              <TableHead className="p-2 text-xs">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Time</span>
                </div>
              </TableHead>
              <TableHead className="p-2 text-xs">Location</TableHead>
              <TableHead className="p-2 text-xs">Status</TableHead>
              <TableHead className="w-[50px] p-2"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              skeletonRows
            ) : appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-sm text-muted-foreground">
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment) => (
                <TableRow key={appointment.id} className="h-10">
                  <TableCell className="p-2">
                    <Checkbox
                      checked={selectedRows.includes(appointment.id)}
                      onCheckedChange={() => handleSelectRow(appointment.id)}
                      aria-label={`Select appointment ${appointment.id}`}
                      className="h-4 w-4"
                    />
                  </TableCell>
                  <TableCell className="p-2 text-xs font-medium">{appointment.visitorName}</TableCell>
                  <TableCell className="p-2 text-xs">{appointment.visitorEmail}</TableCell>
                  <TableCell className="p-2">
                    <div className="flex flex-col gap-1">
                      {appointment.hosts.map((host, index) => (
                        <TooltipProvider key={host.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="text-xs flex items-center">
                                {index < 2 ? (
                                  <>
                                    <span className="font-medium">{host.name}</span>
                                    {host.department && (
                                      <span className="text-[10px] text-muted-foreground ml-1">
                                        ({host.department})
                                      </span>
                                    )}
                                  </>
                                ) : index === 2 && appointment.hosts.length > 3 ? (
                                  <span className="text-[10px] text-muted-foreground">
                                    +{appointment.hosts.length - 2} more
                                  </span>
                                ) : index === 2 ? (
                                  <>
                                    <span className="font-medium">{host.name}</span>
                                    {host.department && (
                                      <span className="text-[10px] text-muted-foreground ml-1">
                                        ({host.department})
                                      </span>
                                    )}
                                  </>
                                ) : null}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs">
                                <p className="font-medium">{host.name}</p>
                                {host.email && <p>{host.email}</p>}
                                {host.department && <p>{host.department}</p>}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="p-2 text-xs">
                    {appointment.date ? format(new Date(appointment.date), "MMM dd, yyyy") : "N/A"}
                  </TableCell>
                  <TableCell className="p-2 text-xs">
                    {appointment.startTime} - {appointment.endTime}
                  </TableCell>
                  <TableCell className="p-2 text-xs">{appointment.location}</TableCell>
                  <TableCell className="p-2">
                    <Badge variant="outline" className={`text-[10px] px-2 py-0 ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(appointment)} className="text-xs cursor-pointer">
                          <Edit className="mr-2 h-3 w-3" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(appointment.id)}
                          className="text-xs cursor-pointer text-destructive"
                        >
                          <Trash2 className="mr-2 h-3 w-3" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Bulk actions */}
      {selectedRows.length > 0 && (
        <div className="flex items-center justify-between py-2">
          <p className="text-xs text-muted-foreground">
            {selectedRows.length} {selectedRows.length === 1 ? "appointment" : "appointments"} selected
          </p>
          <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="h-7 text-xs">
            <Trash2 className="mr-2 h-3 w-3" />
            Delete Selected
          </Button>
        </div>
      )}

      {/* Edit dialog */}
      {editAppointment && (
        <AppointmentFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleEditSubmit}
          appointment={editAppointment}
          title="Edit Appointment"
        />
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-8 text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="h-8 text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk delete confirmation dialog */}
      <AlertDialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
        <AlertDialogContent className="max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Multiple Appointments</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete {selectedRows.length}{" "}
              {selectedRows.length === 1 ? "appointment" : "appointments"}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-8 text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBulkDelete}
              className="h-8 text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

