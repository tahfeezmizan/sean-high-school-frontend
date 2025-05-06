"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface TabsContextType {
  activeTab: string
  setActiveTab: (id: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a TabsProvider")
  }
  return context
}

interface TabsProps {
  defaultValue: string
  className?: string
  children: React.ReactNode
}

export function CustomTabs({ defaultValue, className = "", children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  className?: string
  children: React.ReactNode
}




export function CustomTabsList({ className = "", children }: TabsListProps) {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 ${className}`}>
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  className?: string
  children: React.ReactNode
}

export function CustomTabsTrigger({ value, className = "", children }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext()
  const isActive = activeTab === value

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
      ${isActive ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"} ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  value: string
  className?: string
  children: React.ReactNode
}

export function CustomTabsContent({ value, className = "", children }: TabsContentProps) {
  const { activeTab } = useTabsContext()

  if (activeTab !== value) {
    return null
  }

  return (
    <div
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </div>
  )
}
