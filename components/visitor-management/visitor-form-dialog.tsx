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
import type { Visitor } from "@/lib/types/models"
import type { CreateVisitorData, UpdateVisitorData } from "@/hooks/use-visitor-management"

interface VisitorFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CreateVisitorData | UpdateVisitorData) => Promise<void>
  visitor?: Visitor
  title?: string
}

export function VisitorFormDialog({
  open,
  onOpenChange,
  onSubmit,
  visitor,
  title = "Add New Visitor",
}: VisitorFormDialogProps) {
  const [formData, setFormData] = useState<CreateVisitorData>({
    name: "",
    email: "",
    phone: "",
    company: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // If editing, populate form with visitor data
  useEffect(() => {
    if (visitor) {
      setFormData({
        name: visitor.name,
        email: visitor.email,
        phone: visitor.phone,
        company: visitor.company,
      })
    } else {
      // Reset form when adding new visitor
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
      })
    }
  }, [visitor, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (visitor) {
        // Update existing visitor
        await onSubmit({
          id: visitor.id,
          ...formData,
        })
      } else {
        // Create new visitor
        await onSubmit(formData)
      }

      onOpenChange(false)
    } catch (error) {
      console.error("Error submitting visitor form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-xs">
            {visitor ? "Edit visitor information" : "Add a new visitor to the system"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-xs">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-8 text-xs"
                autoComplete="off"
              />
              {errors.name && <p className="text-[10px] text-destructive">{errors.name}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="h-8 text-xs"
                autoComplete="off"
              />
              {errors.email && <p className="text-[10px] text-destructive">{errors.email}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-xs">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="h-8 text-xs"
                autoComplete="off"
              />
              {errors.phone && <p className="text-[10px] text-destructive">{errors.phone}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company" className="text-xs">
                Company
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="h-8 text-xs"
                autoComplete="off"
              />
              {errors.company && <p className="text-[10px] text-destructive">{errors.company}</p>}
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
              {isSubmitting ? "Saving..." : visitor ? "Save Changes" : "Add Visitor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

