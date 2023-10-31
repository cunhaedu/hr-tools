import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        h1:
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        h2:
          "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        h3:
          "scroll-m-20 text-2xl font-semibold tracking-tight",
        h4:
          "scroll-m-20 text-xl font-semibold tracking-tight",
      },
    },
    defaultVariants: {
      variant: "h1",
    },
  }
)

export interface HeadingProps
  extends React.ParamHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean
}

const Heading = React.forwardRef<HTMLParagraphElement, HeadingProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h1"
    return (
      <Comp
        className={cn(headingVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
