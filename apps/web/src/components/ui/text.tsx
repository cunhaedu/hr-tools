import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        muted:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      },
      size: {
        default: "text-sm",
        xs: "text-xs",
        base: "text-base",
        lg: "text-lg",
        xl: "text-17px md:text-xl tracking-[-0.16px]",
        '2xl': "text-2xl tracking-[-0.288px]",
      },
      weight: {
        regular: "font-normal",
        medium: "font-medium",
        bold: "font-bold",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TextProps
  extends React.ParamHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p"
    return (
      <Comp
        className={cn(textVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants }
