"use client"

import React, { createContext, useContext, useState } from "react"

interface DialogContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

function useDialogContext() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used within a DialogProvider")
  }
  return context
}

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function CustomDialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(newOpen)
    } else {
      setUncontrolledOpen(newOpen)
    }
  }

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>
}

interface DialogTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

export function CustomDialogTrigger({ asChild = false, children }: DialogTriggerProps) {
  const { setOpen } = useDialogContext()

  if (asChild) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
      onClick: () => setOpen(true),
    })
  }

  return <button onClick={() => setOpen(true)}>{children}</button>
}



interface DialogContentProps {
  className?: string
  children: React.ReactNode
}

export function CustomDialogContent({ className = "", children }: DialogContentProps) {
  const { open, setOpen } = useDialogContext()

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50">
      <div className="relative">
        <div
          className={`relative max-h-[85vh] w-full max-w-md overflow-auto rounded-lg bg-white p-6 shadow-lg ${className}`}
        >
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span className="sr-only">Close</span>
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}

export function CustomDialogHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

export function CustomDialogTitle({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
}

export function CustomDialogFooter({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mt-4 flex justify-end space-x-2 ${className}`}>{children}</div>
}
