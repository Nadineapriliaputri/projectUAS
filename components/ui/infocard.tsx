import * as React from "react"

import { cn } from "@/lib/utils"

function InfoCard({
  title,
  description,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title: string
  description: string
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      <h3 className="text-lg font-semibold leading-none tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export { InfoCard }
