'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function MainLayout({ children, className }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-dashboard-bg">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-dashboard-bg">
        <Header 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={true}
        />
        
        <main className={`flex-1 overflow-auto bg-dashboard-bg ${className}`}>
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}