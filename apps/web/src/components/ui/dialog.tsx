"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from 'lucide-react';
import { animated, useTransition, config } from '@react-spring/web';

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

type DialogContentType = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  open: boolean;
  handleToggleOpen: () => void;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentType
>(({ className, children, open, handleToggleOpen, ...props }, ref) => {
  const transitions = useTransition(open, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    // leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    config: config.default,
  });

  return (
    <>
    {transitions((styles, item) =>
      item ? (
        <DialogPortal>
          <DialogOverlay>
            <animated.div style={{ opacity: styles.opacity }} />
          </DialogOverlay>
          <DialogPrimitive.Content ref={ref} {...props} asChild>
            <animated.div style={styles} className={cn(
              "fixed overflow-y-scroll right-0 top-[0] z-50 grid gap-4 border-l bg-background p-6 pt-14 md:px-16 md:py-10 shadow-lg",
              "w-full h-full !max-w-xl",
              className
            )}>
              {children}
              <DialogPrimitive.Close onClick={handleToggleOpen} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <XIcon className="h-8 w-8" />
                <span className="sr-only">Fechar</span>
              </DialogPrimitive.Close>
            </animated.div>
          </DialogPrimitive.Content>
        </DialogPortal>
        ) : null
      )}
    </>
  )}
)
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "scroll-m-20 pb-2 text-3xl text-center font-semibold tracking-tight transition-colors first:mt-0",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("leading-7 [&:not(:first-child)]:mt-6 text-sm text-center text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
