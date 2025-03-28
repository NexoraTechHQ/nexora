"use client"

import { Scan } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FacialRecognitionTab() {
  return (
    <div className="flex items-center justify-center h-[400px] text-center">
      <div className="flex flex-col items-center gap-2 max-w-md">
        <Scan className="h-10 w-10 text-muted-foreground/60" />
        <h3 className="text-xl font-semibold">Facial Recognition</h3>
        <p className="text-muted-foreground">
          This section will allow you to configure facial recognition features including enrollment and threshold
          settings.
        </p>
        <Button className="mt-4">Coming Soon</Button>
      </div>
    </div>
  )
}

