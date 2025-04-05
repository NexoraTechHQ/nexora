"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Appointment, Host, User } from "@/lib/types/models"
import type { CreateAppointmentData, UpdateAppointmentData } from "@/hooks/use-appointment-management"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Clock, Check, ChevronsUpDown, X } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { serviceProvider } from "@/lib/services/service-provider"

interface AppointmentFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CreateAppointmentData | UpdateAppointmentData) => Promise<void>
  appointment?: Appointment
  title?: string
}

export function AppointmentFormDialog({
  open,
  onOpenChange,
  onSubmit,
  appointment,
  title = "Add New Appointment",
}: AppointmentFormDialogProps) {
  const [formData, setFormData] = useState<CreateAppointmentData>({
    visitorId: "",
    visitorName: "",
    visitorEmail: "",
    hosts: [],
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "10:00",
    location: "",
    purpose: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [users, setUsers] = useState<User[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [selectedHosts, setSelectedHosts] = useState<Host[]>([])
  const [hostSearchOpen, setHostSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch users for host selection
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingUsers(true)
      try {
        const data = await serviceProvider.getUsers()
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setIsLoadingUsers(false)
      }
    }

    if (open) {
      fetchUsers()
    }
  }, [open])

  // If editing, populate form with appointment data
  useEffect(() => {
    if (appointment) {
      setFormData({
        visitorId: appointment.visitorId,
        visitorName: appointment.visitorName,
        visitorEmail: appointment.visitorEmail,
        hosts: appointment.hosts || [],
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        location: appointment.location,
        purpose: appointment.purpose,
      })

      // Set selected hosts
      setSelectedHosts(appointment.hosts || [])

      // Set the selected date from the appointment date
      if (appointment.date) {
        const [year, month, day] = appointment.date.split("-").map(Number)
        setSelectedDate(new Date(year, month - 1, day))
      }
    } else {
      // Reset form when adding new appointment
      setFormData({
        visitorId: "",
        visitorName: "",
        visitorEmail: "",
        hosts: [],
        date: format(new Date(), "yyyy-MM-dd"),
        startTime: "09:00",
        endTime: "10:00",
        location: "",
        purpose: "",
      })
      setSelectedHosts([])
      setSelectedDate(new Date())
    }
  }, [appointment, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setFormData((prev) => ({
        ...prev,
        date: format(date, "yyyy-MM-dd"),
      }))

      // Clear error when field is edited
      if (errors.date) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.date
          return newErrors
        })
      }
    }
  }

  const handleHostSelect = (user: User) => {
    const isSelected = selectedHosts.some((host) => host.id === user.id)

    if (isSelected) {
      // Remove host if already selected
      setSelectedHosts((prev) => prev.filter((host) => host.id !== user.id))
    } else {
      // Add host if not already selected
      const newHost: Host = {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
      }
      setSelectedHosts((prev) => [...prev, newHost])
    }

    // Clear error when field is edited
    if (errors.hosts) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.hosts
        return newErrors
      })
    }
  }

  const removeHost = (hostId: string) => {
    setSelectedHosts((prev) => prev.filter((host) => host.id !== hostId))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.visitorName.trim()) {
      newErrors.visitorName = "Visitor name is required"
    }

    if (!formData.visitorEmail.trim()) {
      newErrors.visitorEmail = "Visitor email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.visitorEmail)) {
      newErrors.visitorEmail = "Visitor email is invalid"
    }

    if (selectedHosts.length === 0) {
      newErrors.hosts = "At least one host is required"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required"
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = "Purpose is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Update hosts in form data
    setFormData((prev) => ({
      ...prev,
      hosts: selectedHosts,
    }))

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const submissionData = {
        ...formData,
        hosts: selectedHosts,
      }

      if (appointment) {
        // Update existing appointment
        await onSubmit({
          id: appointment.id,
          ...submissionData,
        })
      } else {
        // Create new appointment
        await onSubmit(submissionData)
      }

      onOpenChange(false)
    } catch (error) {
      console.error("Error submitting appointment form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Generate time options for select
  const generateTimeOptions = () => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute.toString().padStart(2, "0")
        options.push(`${formattedHour}:${formattedMinute}`)
      }
    }
    return options
  }

  const timeOptions = generateTimeOptions()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-xs">
            {appointment ? "Edit appointment details" : "Schedule a new appointment"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="visitorName" className="text-xs">
                  Visitor Name
                </Label>
                <Input
                  id="visitorName"
                  name="visitorName"
                  value={formData.visitorName}
                  onChange={handleChange}
                  className="h-8 text-xs"
                  autoComplete="off"
                />
                {errors.visitorName && <p className="text-[10px] text-destructive">{errors.visitorName}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="visitorEmail" className="text-xs">
                  Visitor Email
                </Label>
                <Input
                  id="visitorEmail"
                  name="visitorEmail"
                  type="email"
                  value={formData.visitorEmail}
                  onChange={handleChange}
                  className="h-8 text-xs"
                  autoComplete="off"
                />
                {errors.visitorEmail && <p className="text-[10px] text-destructive">{errors.visitorEmail}</p>}
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-xs">Host(s)</Label>
              <Popover open={hostSearchOpen} onOpenChange={setHostSearchOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={hostSearchOpen}
                    className={`h-8 justify-between text-xs ${errors.hosts ? "border-destructive" : ""}`}
                  >
                    {selectedHosts.length > 0
                      ? `${selectedHosts.length} host${selectedHosts.length > 1 ? "s" : ""} selected`
                      : "Select hosts..."}
                    <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search hosts..."
                      className="h-8 text-xs"
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                    />
                    <CommandList>
                      <CommandEmpty className="text-xs py-2">No hosts found.</CommandEmpty>
                      <CommandGroup>
                        {isLoadingUsers ? (
                          <div className="flex items-center justify-center p-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                            <span className="ml-2 text-xs">Loading...</span>
                          </div>
                        ) : (
                          filteredUsers.map((user) => (
                            <CommandItem
                              key={user.id}
                              value={user.id}
                              onSelect={() => handleHostSelect(user)}
                              className="text-xs flex items-center"
                            >
                              <div
                                className={cn(
                                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                                  selectedHosts.some((host) => host.id === user.id)
                                    ? "bg-primary border-primary"
                                    : "border-input",
                                )}
                              >
                                {selectedHosts.some((host) => host.id === user.id) && (
                                  <Check className="h-3 w-3 text-primary-foreground" />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span>{user.name}</span>
                                <span className="text-[10px] text-muted-foreground">{user.department}</span>
                              </div>
                            </CommandItem>
                          ))
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {selectedHosts.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedHosts.map((host) => (
                    <Badge key={host.id} variant="secondary" className="text-[10px] py-0 h-5">
                      {host.name}
                      <button
                        type="button"
                        className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-1"
                        onClick={() => removeHost(host.id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {errors.hosts && <p className="text-[10px] text-destructive">{errors.hosts}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label className="text-xs">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`h-8 text-xs w-full justify-start text-left font-normal ${
                        errors.date ? "border-destructive" : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-3 w-3" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={selectedDate} onSelect={handleDateChange} initialFocus />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-[10px] text-destructive">{errors.date}</p>}
              </div>

              <div className="grid gap-2">
                <Label className="text-xs">Start Time</Label>
                <Select value={formData.startTime} onValueChange={(value) => handleSelectChange("startTime", value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.startTime ? "border-destructive" : ""}`}>
                    <Clock className="mr-2 h-3 w-3" />
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time} className="text-xs">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.startTime && <p className="text-[10px] text-destructive">{errors.startTime}</p>}
              </div>

              <div className="grid gap-2">
                <Label className="text-xs">End Time</Label>
                <Select value={formData.endTime} onValueChange={(value) => handleSelectChange("endTime", value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.endTime ? "border-destructive" : ""}`}>
                    <Clock className="mr-2 h-3 w-3" />
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time} className="text-xs">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.endTime && <p className="text-[10px] text-destructive">{errors.endTime}</p>}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location" className="text-xs">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="h-8 text-xs"
                autoComplete="off"
              />
              {errors.location && <p className="text-[10px] text-destructive">{errors.location}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="purpose" className="text-xs">
                Purpose
              </Label>
              <Textarea
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="text-xs min-h-[60px]"
              />
              {errors.purpose && <p className="text-[10px] text-destructive">{errors.purpose}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-8 text-xs"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="h-8 text-xs" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : appointment ? "Save Changes" : "Create Appointment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

