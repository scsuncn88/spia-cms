'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  MessageSquare, 
  Users, 
  Shield, 
  Image, 
  Tag, 
  Settings, 
  Activity, 
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User
} from 'lucide-react'
import { NavigationItem } from '@/types'
import { hasPermission } from '@/lib/permissions'
import { mockUser } from '@/lib/permissions'

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: '仪表板',
    icon: 'LayoutDashboard',
    path: '/dashboard',
    permissions: [{ id: 'dashboard:read', name: 'View Dashboard', resource: 'dashboard', action: 'read' }]
  },
  {
    id: 'content',
    label: '内容管理',
    icon: 'FileText',
    path: '/content',
    permissions: [{ id: 'content:read', name: 'View Content', resource: 'content', action: 'read' }]
  },
  {
    id: 'emergency',
    label: '应急通知',
    icon: 'AlertTriangle',
    path: '/emergency',
    permissions: [{ id: 'emergency:read', name: 'View Emergency', resource: 'emergency', action: 'read' }]
  },
  {
    id: 'complaint',
    label: '投诉服务',
    icon: 'MessageSquare',
    path: '/complaint',
    permissions: [{ id: 'complaint:read', name: 'View Complaint', resource: 'complaint', action: 'read' }]
  },
  {
    id: 'users',
    label: '用户管理',
    icon: 'Users',
    path: '/users',
    permissions: [{ id: 'user:read', name: 'View User', resource: 'user', action: 'read' }]
  },
  {
    id: 'roles',
    label: '角色权限',
    icon: 'Shield',
    path: '/roles',
    permissions: [{ id: 'role:read', name: 'View Role', resource: 'role', action: 'read' }]
  },
  {
    id: 'media',
    label: '媒体库',
    icon: 'Image',
    path: '/media',
    permissions: [{ id: 'media:read', name: 'View Media', resource: 'media', action: 'read' }]
  },
  {
    id: 'taxonomy',
    label: '分类标签',
    icon: 'Tag',
    path: '/taxonomy',
    permissions: [{ id: 'taxonomy:read', name: 'View Taxonomy', resource: 'taxonomy', action: 'read' }]
  },
  {
    id: 'settings',
    label: '系统设置',
    icon: 'Settings',
    path: '/settings',
    permissions: [{ id: 'settings:read', name: 'View Settings', resource: 'settings', action: 'read' }]
  },
  {
    id: 'logs',
    label: '操作日志',
    icon: 'Activity',
    path: '/logs',
    permissions: [{ id: 'logs:read', name: 'View Logs', resource: 'logs', action: 'read' }]
  },
  {
    id: 'analytics',
    label: '数据分析',
    icon: 'BarChart3',
    path: '/analytics',
    permissions: [{ id: 'analytics:read', name: 'View Analytics', resource: 'analytics', action: 'read' }]
  }
]

const iconComponents = {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  MessageSquare,
  Users,
  Shield,
  Image,
  Tag,
  Settings,
  Activity,
  BarChart3
}

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const filteredNavItems = navigationItems.filter(item => {
    if (!item.permissions || item.permissions.length === 0) return true
    return item.permissions.some(permission => 
      hasPermission(mockUser, permission.resource, permission.action)
    )
  })

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === '/dashboard' || pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <div className={`bg-sidebar-bg text-white transition-all duration-300 shadow-xl border-r border-white/10 ${collapsed ? 'w-16' : 'w-64'} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-sidebar-bg to-sidebar-hover">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">浦</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">浦东机场</span>
              <span className="text-xs text-blue-200">内容管理系统</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center w-full">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">浦</span>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {filteredNavItems.map((item) => {
          const IconComponent = iconComponents[item.icon as keyof typeof iconComponents]
          const active = isActive(item.path || '')
          
          return (
            <Link
              key={item.id}
              href={item.path || '#'}
              className={`group relative flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                collapsed ? 'justify-center' : 'justify-start'
              } ${
                active 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <IconComponent size={20} className={active ? 'text-white' : 'text-gray-300 group-hover:text-white'} />
              {!collapsed && <span className="ml-3">{item.label}</span>}
              {collapsed && (
                <div className="absolute left-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                </div>
              )}
              {active && !collapsed && (
                <div className="absolute right-3 w-2 h-2 bg-white rounded-full"></div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10 bg-gradient-to-r from-sidebar-bg to-sidebar-hover">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} space-x-3`}>
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <User size={18} className="text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{mockUser.name}</div>
              <div className="text-xs text-blue-200">{mockUser.position}</div>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <LogOut size={16} />
              <span className="ml-3">退出登录</span>
            </button>
          </div>
        )}
        
        {collapsed && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <button className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}