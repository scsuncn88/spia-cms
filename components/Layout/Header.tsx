'use client'

import { useState } from 'react'
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Moon, 
  Sun, 
  Globe,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { mockUser } from '@/lib/permissions'

interface HeaderProps {
  onMenuToggle?: () => void
  showMenuButton?: boolean
  className?: string
}

export default function Header({ onMenuToggle, showMenuButton = false, className }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light')

  const notifications = [
    { id: 1, title: '新投诉待处理', content: '有3个新的投诉需要处理', time: '5分钟前', type: 'warning' },
    { id: 2, title: '应急通知已发布', content: '天气预警通知已成功发布', time: '15分钟前', type: 'info' },
    { id: 3, title: '系统维护提醒', content: '今晚23:00-02:00进行系统维护', time: '1小时前', type: 'info' }
  ]

  const toggleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun size={20} />
      case 'dark': return <Moon size={20} />
      case 'system': return <Globe size={20} />
      default: return <Sun size={20} />
    }
  }

  return (
    <header className={`bg-header-bg border-b border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {showMenuButton && (
            <button
              onClick={onMenuToggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors lg:hidden"
            >
              <Menu size={20} />
            </button>
          )}
          
          {/* Search */}
          <div className="relative">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <Search size={20} />
              </button>
              
              {showSearch && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-3">
                    <input
                      type="text"
                      placeholder="搜索内容、用户、设置..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                    />
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">快速搜索</div>
                    <div className="space-y-1">
                      <button className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        内容管理
                      </button>
                      <button className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        用户设置
                      </button>
                      <button className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        系统日志
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            title={`当前主题: ${theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '系统'}`}
          >
            {getThemeIcon()}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">通知</h3>
                    <button className="text-xs text-primary hover:underline">
                      标记全部已读
                    </button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'warning' ? 'bg-yellow-500' : 
                          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{notification.title}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {notification.content}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {notification.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full text-sm text-primary hover:underline">
                    查看全部通知
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{mockUser.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{mockUser.position}</div>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="font-medium text-sm">{mockUser.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{mockUser.email}</div>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center space-x-2">
                    <User size={16} />
                    <span>个人资料</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center space-x-2">
                    <Settings size={16} />
                    <span>账户设置</span>
                  </button>
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <LogOut size={16} />
                    <span>退出登录</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showSearch || showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowSearch(false)
            setShowNotifications(false)
            setShowUserMenu(false)
          }}
        />
      )}
    </header>
  )
}