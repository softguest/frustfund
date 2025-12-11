import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Provider from "@/provider";
import { Toaster } from "react-hot-toast";
import Sidebar from '@/components/dashboardtwo/Sidebar';
import DashboardHeader from '@/components/dashboardtwo/DashboardHeader';
import { elements } from 'chart.js';

export const metadata: Metadata = {
  title: 'TRUSTFUND',
  description: 'Online Banking With Trust',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider appearance={{
      theme: "simple",
      elements: {
        headerTitle: {
          fontSize: "32px",
        }
      }
    }}>
      <html lang="en">
        <body 
        >
          <Provider>
            <div className="flex">
              {/* Sidebar handles both desktop and mobile */}
              <Sidebar />
                <main className="flex-1 bg-gray-50 min-h-screen">
                  <DashboardHeader />
                    {/* Main content */}
                    {children}
                </main>
            </div>
            <Toaster position="top-right" />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}