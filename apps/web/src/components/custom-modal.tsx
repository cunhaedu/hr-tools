"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { XIcon } from 'lucide-react';
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const CustomModal = Dialog.Root

const CustomModalTrigger = Dialog.Trigger

const CustomModalClose = Dialog.Close

const CustomModalPortal = Dialog.Portal

const CustomModalOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
CustomModalOverlay.displayName = Dialog.Overlay.displayName

const CustomModalVariants = cva(
  "fixed overflow-y-scroll z-50 gap-4 w-full !max-w-xl bg-background p-6 pt-14 md:px-16 md:py-10 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface CustomModalContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content>,
    VariantProps<typeof CustomModalVariants> {
      handleToggleOpen: () => void;
    }

const CustomModalContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  CustomModalContentProps
>(({ side = "right", className, handleToggleOpen, children, ...props }, ref) => (
  <CustomModalPortal>
    <CustomModalOverlay />
    <Dialog.Content
      ref={ref}
      className={cn(CustomModalVariants({ side }), className)}
      {...props}
    >
      {children}
      <Dialog.Close onClick={handleToggleOpen} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <XIcon className="h-7 w-7" />
        <span className="sr-only">Close</span>
      </Dialog.Close>
    </Dialog.Content>
  </CustomModalPortal>
))
CustomModalContent.displayName = Dialog.Content.displayName

const CustomModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center space-y-2 text-center mb-4",
      className
    )}
    {...props}
  />
)
CustomModalHeader.displayName = "CustomModalHeader"

const CustomModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex sm:justify-end sm:space-x-2 mt-4",
      className
    )}
    {...props}
  />
)
CustomModalFooter.displayName = "CustomModalFooter"

const CustomModalTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn("text-2xl font-semibold text-foreground", className)}
    {...props}
  />
))
CustomModalTitle.displayName = Dialog.Title.displayName

const CustomModalDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CustomModalDescription.displayName = Dialog.Description.displayName

export {
  CustomModal,
  CustomModalPortal,
  CustomModalOverlay,
  CustomModalTrigger,
  CustomModalClose,
  CustomModalContent,
  CustomModalHeader,
  CustomModalFooter,
  CustomModalTitle,
  CustomModalDescription,
}
