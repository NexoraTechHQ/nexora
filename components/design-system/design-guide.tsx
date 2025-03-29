import { MsButton } from "@/components/ui/ms-button"
import { MsInput } from "@/components/ui/ms-input"
import {
  MsCard,
  MsCardContent,
  MsCardDescription,
  MsCardFooter,
  MsCardHeader,
  MsCardTitle,
} from "@/components/ui/ms-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Settings, User, Home, Calendar, FileText, Mail, Plus, Check, X } from "lucide-react"

export function DesignGuide() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Microsoft-Style Design System</h1>
        <p className="text-sm text-muted-foreground">
          A comprehensive design system following Microsoft's Fluent UI design principles.
        </p>
      </div>

      <Tabs defaultValue="typography">
        <TabsList>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>

        <TabsContent value="typography" className="space-y-6 mt-6">
          <MsCard>
            <MsCardHeader>
              <MsCardTitle>Typography</MsCardTitle>
              <MsCardDescription>Microsoft-style typography scale and styles.</MsCardDescription>
            </MsCardHeader>
            <MsCardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-semibold">Heading 1 (24px)</h1>
                  <p className="text-sm text-muted-foreground">Used for main page titles</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Heading 2 (20px)</h2>
                  <p className="text-sm text-muted-foreground">Used for section titles</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Heading 3 (18px)</h3>
                  <p className="text-sm text-muted-foreground">Used for card titles and subsections</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold">Heading 4 (16px)</h4>
                  <p className="text-sm text-muted-foreground">Used for smaller section titles</p>
                </div>
                <Separator />
                <div>
                  <p className="text-base">Body (16px)</p>
                  <p className="text-sm text-muted-foreground">Used for main content</p>
                </div>
                <div>
                  <p className="text-sm">Small Text (14px)</p>
                  <p className="text-sm text-muted-foreground">Used for secondary content</p>
                </div>
                <div>
                  <p className="text-xs">Extra Small Text (12px)</p>
                  <p className="text-sm text-muted-foreground">Used for captions and helper text</p>
                </div>
              </div>
            </MsCardContent>
          </MsCard>
        </TabsContent>

        <TabsContent value="buttons" className="space-y-6 mt-6">
          <MsCard>
            <MsCardHeader>
              <MsCardTitle>Buttons</MsCardTitle>
              <MsCardDescription>Microsoft-style button variants and sizes.</MsCardDescription>
            </MsCardHeader>
            <MsCardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-semibold mb-3">Button Variants</h4>
                  <div className="flex flex-wrap gap-4">
                    <MsButton variant="default">Default</MsButton>
                    <MsButton variant="secondary">Secondary</MsButton>
                    <MsButton variant="outline">Outline</MsButton>
                    <MsButton variant="ghost">Ghost</MsButton>
                    <MsButton variant="link">Link</MsButton>
                    <MsButton variant="destructive">Destructive</MsButton>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold mb-3">Button Sizes</h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <MsButton size="sm">Small</MsButton>
                    <MsButton size="default">Default</MsButton>
                    <MsButton size="lg">Large</MsButton>
                    <MsButton size="icon">
                      <Settings className="h-4 w-4" />
                    </MsButton>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold mb-3">Button States</h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <MsButton>Normal</MsButton>
                    <MsButton disabled>Disabled</MsButton>
                    <MsButton isLoading>Loading</MsButton>
                    <MsButton variant="outline" className="border-primary">
                      Active
                    </MsButton>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold mb-3">Button with Icons</h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <MsButton>
                      <Plus className="mr-2 h-4 w-4" /> Add New
                    </MsButton>
                    <MsButton variant="outline">
                      <Check className="mr-2 h-4 w-4" /> Confirm
                    </MsButton>
                    <MsButton variant="destructive">
                      <X className="mr-2 h-4 w-4" /> Cancel
                    </MsButton>
                  </div>
                </div>
              </div>
            </MsCardContent>
          </MsCard>
        </TabsContent>

        <TabsContent value="inputs" className="space-y-6 mt-6">
          <MsCard>
            <MsCardHeader>
              <MsCardTitle>Inputs</MsCardTitle>
              <MsCardDescription>Microsoft-style input components.</MsCardDescription>
            </MsCardHeader>
            <MsCardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-base font-semibold">Text Input</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-input">Default Input</Label>
                      <MsInput id="default-input" placeholder="Enter text..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="disabled-input">Disabled Input</Label>
                      <MsInput id="disabled-input" placeholder="Disabled input" disabled />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold">Input with Icon</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="search-input">Search Input</Label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <MsInput id="search-input" placeholder="Search..." className="pl-8" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-input">Email Input</Label>
                      <div className="relative">
                        <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <MsInput id="email-input" type="email" placeholder="Email address" className="pl-8" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold">Toggle Controls</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          Accept terms and conditions
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="newsletter" defaultChecked />
                        <Label htmlFor="newsletter" className="text-sm">
                          Subscribe to newsletter
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label htmlFor="airplane-mode" className="text-sm">
                          Airplane Mode
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="notifications" defaultChecked />
                        <Label htmlFor="notifications" className="text-sm">
                          Enable notifications
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MsCardContent>
          </MsCard>
        </TabsContent>

        <TabsContent value="cards" className="space-y-6 mt-6">
          <MsCard>
            <MsCardHeader>
              <MsCardTitle>Cards</MsCardTitle>
              <MsCardDescription>Microsoft-style card components.</MsCardDescription>
            </MsCardHeader>
            <MsCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MsCard>
                  <MsCardHeader>
                    <MsCardTitle>Basic Card</MsCardTitle>
                    <MsCardDescription>A simple card with header and content</MsCardDescription>
                  </MsCardHeader>
                  <MsCardContent>
                    <p className="text-sm">This is a basic card component following Microsoft's design principles.</p>
                  </MsCardContent>
                </MsCard>

                <MsCard>
                  <MsCardHeader>
                    <MsCardTitle>Card with Footer</MsCardTitle>
                    <MsCardDescription>A card with header, content, and footer</MsCardDescription>
                  </MsCardHeader>
                  <MsCardContent>
                    <p className="text-sm">This card includes a footer with actions.</p>
                  </MsCardContent>
                  <MsCardFooter className="flex justify-between">
                    <MsButton variant="ghost" size="sm">
                      Cancel
                    </MsButton>
                    <MsButton size="sm">Save</MsButton>
                  </MsCardFooter>
                </MsCard>

                <MsCard>
                  <MsCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <MsCardTitle className="text-base">Metric Card</MsCardTitle>
                      <MsCardDescription>A card for displaying metrics</MsCardDescription>
                    </div>
                    <div className="h-8 w-8 rounded-sm bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  </MsCardHeader>
                  <MsCardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-emerald-500">+12%</span> from last month
                    </p>
                  </MsCardContent>
                </MsCard>

                <MsCard>
                  <img
                    src="/placeholder.svg?height=120&width=400"
                    alt="Card header image"
                    className="w-full h-[120px] object-cover rounded-t-sm"
                  />
                  <MsCardHeader>
                    <MsCardTitle>Card with Image</MsCardTitle>
                    <MsCardDescription>A card with a header image</MsCardDescription>
                  </MsCardHeader>
                  <MsCardContent>
                    <p className="text-sm">This card includes an image at the top.</p>
                  </MsCardContent>
                  <MsCardFooter>
                    <MsButton variant="outline" size="sm" className="w-full">
                      View Details
                    </MsButton>
                  </MsCardFooter>
                </MsCard>
              </div>
            </MsCardContent>
          </MsCard>
        </TabsContent>

        <TabsContent value="components" className="space-y-6 mt-6">
          <MsCard>
            <MsCardHeader>
              <MsCardTitle>Components</MsCardTitle>
              <MsCardDescription>Additional Microsoft-style components.</MsCardDescription>
            </MsCardHeader>
            <MsCardContent>
              <div className="space-y-8">
                <div className="space-y-3">
                  <h4 className="text-base font-semibold">Badges</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold">Navigation</h4>
                  <div className="flex flex-col space-y-2 w-full max-w-xs border rounded-sm p-2">
                    <MsButton variant="ghost" className="justify-start h-8 text-sm">
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </MsButton>
                    <MsButton variant="ghost" className="justify-start h-8 text-sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Messages
                    </MsButton>
                    <MsButton variant="ghost" className="justify-start h-8 text-sm bg-muted">
                      <FileText className="mr-2 h-4 w-4" />
                      Documents
                    </MsButton>
                    <MsButton variant="ghost" className="justify-start h-8 text-sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Calendar
                    </MsButton>
                    <MsButton variant="ghost" className="justify-start h-8 text-sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </MsButton>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold">Tabs</h4>
                  <Tabs defaultValue="tab1" className="w-full max-w-md">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="tab1">Overview</TabsTrigger>
                      <TabsTrigger value="tab2">Analytics</TabsTrigger>
                      <TabsTrigger value="tab3">Reports</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className="p-4 border rounded-sm mt-2">
                      <p className="text-sm">This is the overview tab content.</p>
                    </TabsContent>
                    <TabsContent value="tab2" className="p-4 border rounded-sm mt-2">
                      <p className="text-sm">This is the analytics tab content.</p>
                    </TabsContent>
                    <TabsContent value="tab3" className="p-4 border rounded-sm mt-2">
                      <p className="text-sm">This is the reports tab content.</p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </MsCardContent>
          </MsCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}

