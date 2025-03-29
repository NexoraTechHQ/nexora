"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  const [fontSize, setFontSize] = useState("medium")
  const [fontFamily, setFontFamily] = useState("segoe")
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)

    // Simulate saving
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold tracking-tight">Appearance Settings</h1>
        <p className="text-muted-foreground">Customize the look and feel of your application.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Theme</CardTitle>
          <CardDescription className="text-sm">Choose between light and dark mode.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue={theme}
            onValueChange={(value) => setTheme(value)}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">Dark</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system">System</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Typography</CardTitle>
          <CardDescription className="text-sm">Adjust the font size and family for better readability.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <Select id="font-size" value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Select id="font-family" value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="segoe">Segoe UI (Default)</SelectItem>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="opensans">Open Sans</SelectItem>
                  <SelectItem value="arial">Arial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Animations</CardTitle>
          <CardDescription className="text-sm">Control motion and animations in the interface.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="animations">Enable animations</Label>
              <Switch id="animations" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion">Reduced motion</Label>
              <Switch id="reduced-motion" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

