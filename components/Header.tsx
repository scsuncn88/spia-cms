import React from 'react'
import { Bell, Settings, User, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface HeaderProps {
  user?: {
    name: string
    avatar?: string
    role: string
  }
  onNotificationClick?: () => void
  onSettingsClick?: () => void
  onProfileClick?: () => void
}

export function Header({ 
  user, 
  onNotificationClick, 
  onSettingsClick, 
  onProfileClick 
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <h1 className="text-xl font-bold">小程序旅客服务管理平台</h1>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索内容、投诉、通知..."
                className="pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>
          
          <nav className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onNotificationClick}
              aria-label="通知"
            >
              <Bell className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onSettingsClick}
              aria-label="设置"
            >
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onProfileClick}
              aria-label="用户资料"
            >
              <User className="h-4 w-4" />
            </Button>
            
            {user && (
              <div className="ml-2 flex items-center space-x-2">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
                {user.avatar && (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}