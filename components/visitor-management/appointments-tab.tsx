"use client"

import { useState, useEffect } from "react"
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Table,
  CalendarPlus2Icon as CalendarIcon2,
  RefreshCw,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { AppointmentCalendar } from "./appointment-calendar"
import { AppointmentTable } from "./appointment-table"
import type { Appointment } from "@/lib/types/models"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { AppointmentFormDialog } from "./appointment-form-dialog"
import { useAppointmentManagement } from "@/hooks/use-appointment-management"
import { useToast } from "@/hooks/use-toast"

export function AppointmentsTab() {
  const [date, setDate] = useState<Date>(new Date())
  const [calendarView, setCalendarView] = useState<"day" | "week" | "month">("week")
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table")
  const [selectedAppointments, setSelectedAppointments] = useState<string[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null)
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [appointmentToEdit, setAppointmentToEdit] = useState<Appointment | undefined>(undefined)

  const {
    appointments,
    isLoading,
    error,
    fetchAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    bulkDeleteAppointments,
  } = useAppointmentManagement()

  const { toast } = useToast()

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const navigateCalendar = (direction: "prev" | "next") => {
    const newDate = new Date(date)

    if (calendarView === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (calendarView === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else if (calendarView === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }

    setDate(newDate)
  }

  const handleRefresh = async () => {
    try {
      await fetchAppointments()
      toast({
        title: "Refreshed",
        description: "Appointment data has been refreshed.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh appointment data.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteClick = (id: string) => {
    setAppointmentToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (appointmentToDelete) {
      try {
        await deleteAppointment(appointmentToDelete)
        toast({
          title: "Deleted",
          description: "Appointment has been deleted successfully.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete appointment.",
          variant: "destructive",
        })
      }
      setAppointmentToDelete(null)
    }
    setIsDeleteDialogOpen(false)
  }

  const handleBulkDeleteClick = () => {
    if (selectedAppointments.length > 0) {
      setIsBulkDeleteDialogOpen(true)
    }
  }

  const handleBulkDeleteConfirm = async () => {
    if (selectedAppointments.length > 0) {
      try {
        await bulkDeleteAppointments(selectedAppointments)
        setSelectedAppointments([])
        toast({
          title: "Deleted",
          description: `${selectedAppointments.length} appointments have been deleted.`,
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete appointments.",
          variant: "destructive",
        })
      }
    }
    setIsBulkDeleteDialogOpen(false)
  }

  const handleAddAppointment = () => {
    setAppointmentToEdit(undefined)
    setIsFormDialogOpen(true)
  }

  const handleEditAppointment = (appointment: Appointment) => {
    setAppointmentToEdit(appointment)
    setIsFormDialogOpen(true)
  }

  const handleFormSubmit = async (data: any) => {
    try {
      if (appointmentToEdit) {
        await updateAppointment(data)
        toast({
          title: "Updated",
          description: "Appointment has been updated successfully.",
        })
      } else {
        await createAppointment(data)
        toast({
          title: "Created",
          description: "New appointment has been created successfully.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: appointmentToEdit ? "Failed to update appointment." : "Failed to create appointment.",
        variant: "destructive",
      })
      throw error
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigateCalendar("prev")}>
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-7 min-w-[160px] justify-start text-left font-normal text-xs">
                <CalendarIcon className="mr-2 h-3 w-3" />
                {format(date, "MMMM yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigateCalendar("next")}>
            <ChevronRight className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs font-normal" onClick={() => setDate(new Date())}>
            Today
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "table" | "calendar")} className="mr-2">
            <TabsList className="h-7">
              <TabsTrigger value="table" className="h-7 px-2 text-xs">
                <Table className="h-3 w-3 mr-1" />
                Table
              </TabsTrigger>
              <TabsTrigger value="calendar" className="h-7 px-2 text-xs">
                <CalendarIcon2 className="h-3 w-3 mr-1" />
                Calendar
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {viewMode === "calendar" && (
            <div className="flex items-center rounded-md border p-0.5">
              <Button
                variant={calendarView === "day" ? "default" : "ghost"}
                size="sm"
                className="h-7 text-xs font-normal"
                onClick={() => setCalendarView("day")}
              >
                Day
              </Button>
              <Button
                variant={calendarView === "week" ? "default" : "ghost"}
                size="sm"
                className="h-7 text-xs font-normal"
                onClick={() => setCalendarView("week")}
              >
                Week
              </Button>
              <Button
                variant={calendarView === "month" ? "default" : "ghost"}
                size="sm"
                className="h-7 text-xs font-normal"
                onClick={() => setCalendarView("month")}
              >
                Month
              </Button>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1 px-2 py-0 font-normal"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          {selectedAppointments.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              className="h-7 text-xs gap-1 px-2 py-0 font-normal"
              onClick={handleBulkDeleteClick}
            >
              <Trash2 className="h-3 w-3" />
              Delete ({selectedAppointments.length})
            </Button>
          )}

          <Button size="sm" className="h-7 text-xs gap-1 px-2 py-0 font-normal" onClick={handleAddAppointment}>
            <Plus className="h-3 w-3" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        {viewMode === "calendar" ? (
          <AppointmentCalendar date={date} view={calendarView} appointments={appointments} isLoading={isLoading} />
        ) : (
          <AppointmentTable
            date={date}
            appointments={appointments}
            isLoading={isLoading}
            selectedAppointments={selectedAppointments}
            onSelectAppointment={(id) => {
              if (selectedAppointments.includes(id)) {
                setSelectedAppointments(selectedAppointments.filter((appId) => appId !== id))
              } else {
                setSelectedAppointments([...selectedAppointments, id])
              }
            }}
            onSelectAll={() => {
              if (selectedAppointments.length === appointments.length) {
                setSelectedAppointments([])
              } else {
                setSelectedAppointments(appointments.map((app) => app.id))
              }
            }}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditAppointment}
          />
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="max-w-[400px] p-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">Delete Appointment</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete this appointment? This action cannot be undone.
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
            <AlertDialogTitle className="text-base">Delete Multiple Appointments</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete {selectedAppointments.length} appointments? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel className="h-7 text-xs font-normal">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-7 text-xs font-normal bg-destructive hover:bg-destructive/90"
              onClick={handleBulkDeleteConfirm}
            >
              Delete {selectedAppointments.length} appointments
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Appointment Form Dialog */}
      <AppointmentFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onSubmit={handleFormSubmit}
        appointment={appointmentToEdit}
        title={appointmentToEdit ? "Edit Appointment" : "Add New Appointment"}
      />
    </div>
  )
}

