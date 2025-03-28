"use client"

import { FacialRecognitionTab } from "./facial-recognition-tab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FacialRecognitionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Facial Recognition</h1>
        <p className="text-muted-foreground">Configure facial recognition features and settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Facial Recognition Settings</CardTitle>
          <CardDescription>Configure and manage AI-powered facial recognition for access control.</CardDescription>
        </CardHeader>
        <CardContent>
          <FacialRecognitionTab />
        </CardContent>
      </Card>
    </div>
  )
}

