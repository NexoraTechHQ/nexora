import * as React from "react"
import { cn } from "@/lib/utils"

const MsCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-sm border bg-card text-card-foreground shadow-sm", className)} {...props} />
  ),
)
MsCard.displayName = "MsCard"

const MsCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-4", className)} {...props} />
  ),
)
MsCardHeader.displayName = "MsCardHeader"

const MsCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
MsCardTitle.displayName = "MsCardTitle"

const MsCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
MsCardDescription.displayName = "MsCardDescription"

const MsCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-4 pt-0", className)} {...props} />,
)
MsCardContent.displayName = "MsCardContent"

const MsCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-4 pt-0", className)} {...props} />
  ),
)
MsCardFooter.displayName = "MsCardFooter"

export { MsCard, MsCardHeader, MsCardFooter, MsCardTitle, MsCardDescription, MsCardContent }

