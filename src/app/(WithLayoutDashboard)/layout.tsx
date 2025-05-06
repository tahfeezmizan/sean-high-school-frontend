"use client";
import type React from "react";
import { Inter } from "next/font/google";
import { useState } from "react";
import Sidebar from "@/Components/dashboard/Sidebar/Sidebar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          {/* Main Content px-4 md:px-6 */}
          <div
            className={`flex-1 transition-all duration-300 md:ml-80  ${
              collapsed ? "ml-0" : "md:ml-80"
            }`}
          >
            {children}
            <Toaster position="top-right"
              className="!fixed !top-4 !right-4 !w-auto !z-[100]" />
          </div>
        </div>
      </body>
    </html>
  );
}
