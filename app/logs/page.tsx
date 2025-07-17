'use client'

import React, { useState, useEffect } from 'react'
import { 
  Activity, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar, 
  Clock, 
  User, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info, 
  Shield, 
  Database, 
  FileText, 
  Users, 
  Lock, 
  Unlock, 
  Trash2, 
  Edit, 
  Plus, 
  Mail, 
  Bell, 
  Globe, 
  Server,
  Cpu,
  Memory,
  HardDrive,
  Wifi,
  Zap,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Target,
  MousePointer,
  Smartphone,
  Monitor,
  Tablet,
  Chrome,
  ExternalLink,
  MapPin,
  Timer,
  Layers,
  Code,
  Terminal,
  Bug,
  Wrench,
  Key
} from 'lucide-react'
import MainLayout from '@/components/Layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { OperationLog } from '@/types'
import { mockUser, DEFAULT_ROLES } from '@/lib/permissions'

// Mock operation logs data
const mockOperationLogs: OperationLog[] = [
  {
    id: '1',
    action: 'user_login',
    resource: 'authentication',
    resourceId: 'user-123',
    description: '用户登录系统',
    user: mockUser,
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    timestamp: new Date('2024-01-15T09:30:00'),
    status: 'success',
    duration: 245,
    details: {
      loginMethod: 'password',
      sessionId: 'sess_abc123def456',
      location: {
        country: '中国',
        city: '上海',
        coordinates: [121.4737, 31.2304]
      },
      device: {
        type: 'desktop',
        os: 'Windows 10',
        browser: 'Chrome 91.0'
      }
    },
    changes: [],
    metadata: {
      request_id: 'req_789xyz',
      correlation_id: 'corr_456abc'
    }
  },
  {
    id: '2',
    action: 'content_create',
    resource: 'content',
    resourceId: 'content-456',
    description: '创建新内容《浦东机场T3航站楼建设进展》',
    user: {
      id: '2',
      username: 'editor',
      name: '内容编辑',
      email: 'editor@pudongairport.com',
      avatar: '/avatars/editor.jpg'
    },
    ipAddress: '10.0.2.50',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    timestamp: new Date('2024-01-15T10:15:00'),
    status: 'success',
    duration: 1850,
    details: {
      contentType: 'article',
      category: '机场建设',
      wordCount: 1200,
      images: 5,
      tags: ['T3航站楼', '建设进展', '基础设施']
    },
    changes: [
      {
        field: 'title',
        oldValue: null,
        newValue: '浦东机场T3航站楼建设进展'
      },
      {
        field: 'status',
        oldValue: null,
        newValue: 'draft'
      }
    ],
    metadata: {
      auto_save: false,
      draft_count: 3
    }
  },
  {
    id: '3',
    action: 'user_permission_change',
    resource: 'user',
    resourceId: 'user-789',
    description: '修改用户权限',
    user: mockUser,
    ipAddress: '172.16.10.5',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    timestamp: new Date('2024-01-15T11:45:00'),
    status: 'success',
    duration: 320,
    details: {
      targetUser: '张三',
      targetUserId: 'user-789',
      operation: 'role_assignment'
    },
    changes: [
      {
        field: 'roles',
        oldValue: ['viewer'],
        newValue: ['viewer', 'editor']
      }
    ],
    metadata: {
      approval_required: true,
      approved_by: 'admin'
    }
  },
  {
    id: '4',
    action: 'system_backup',
    resource: 'system',
    resourceId: 'backup-001',
    description: '系统自动备份',
    user: {
      id: 'system',
      username: 'system',
      name: '系统',
      email: 'system@pudongairport.com',
      avatar: null
    },
    ipAddress: '127.0.0.1',
    userAgent: 'System/1.0',
    timestamp: new Date('2024-01-15T02:00:00'),
    status: 'success',
    duration: 45000,
    details: {
      backupType: 'full',
      size: '2.5GB',
      destination: 's3://pudong-cms-backups/',
      compression: true,
      encryption: true
    },
    changes: [],
    metadata: {
      scheduled: true,
      retention_days: 30
    }
  },
  {
    id: '5',
    action: 'emergency_publish',
    resource: 'emergency',
    resourceId: 'emergency-123',
    description: '发布紧急通知：T2航站楼临时关闭',
    user: {
      id: '5',
      username: 'emergency',
      name: '应急管理员',
      email: 'emergency@pudongairport.com',
      avatar: '/avatars/emergency.jpg'
    },
    ipAddress: '192.168.10.200',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
    timestamp: new Date('2024-01-15T14:30:00'),
    status: 'success',
    duration: 180,
    details: {
      notificationType: 'emergency',
      channels: ['website', 'app', 'sms', 'email'],
      priority: 'critical',
      affectedArea: 'T2航站楼',
      estimatedUsers: 15000
    },
    changes: [
      {
        field: 'status',
        oldValue: 'draft',
        newValue: 'published'
      }
    ],
    metadata: {
      emergency_level: 'high',
      auto_channels: true
    }
  },
  {
    id: '6',
    action: 'login_failed',
    resource: 'authentication',
    resourceId: null,
    description: '用户登录失败',
    user: null,
    ipAddress: '203.175.123.45',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date('2024-01-15T16:20:00'),
    status: 'error',
    duration: 120,
    details: {
      username: 'test@example.com',
      reason: 'invalid_password',
      attemptCount: 3,
      lockoutTriggered: false
    },
    changes: [],
    metadata: {
      security_alert: true,
      geolocation: 'Unknown'
    }
  },
  {
    id: '7',
    action: 'file_upload',
    resource: 'media',
    resourceId: 'file-789',
    description: '上传媒体文件',
    user: {
      id: '2',
      username: 'editor',
      name: '内容编辑',
      email: 'editor@pudongairport.com',
      avatar: '/avatars/editor.jpg'
    },
    ipAddress: '10.0.2.50',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    timestamp: new Date('2024-01-15T15:45:00'),
    status: 'success',
    duration: 3200,
    details: {
      fileName: 'airport_construction_2024.jpg',
      fileSize: '2.8MB',
      fileType: 'image/jpeg',
      uploadMethod: 'direct',
      folder: '/images/construction/',
      thumbnails: ['150x150', '300x300', '600x600']
    },
    changes: [],
    metadata: {
      virus_scan: 'clean',
      compression_applied: true
    }
  },
  {
    id: '8',
    action: 'settings_update',
    resource: 'settings',
    resourceId: 'email_config',
    description: '更新邮件配置',
    user: mockUser,
    ipAddress: '172.16.10.5',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    timestamp: new Date('2024-01-15T13:15:00'),
    status: 'success',
    duration: 450,
    details: {
      settingType: 'email',
      configSection: 'smtp'
    },
    changes: [
      {
        field: 'smtp_host',
        oldValue: 'old-smtp.pudongairport.com',
        newValue: 'smtp.pudongairport.com'
      },
      {
        field: 'smtp_port',
        oldValue: '25',
        newValue: '587'
      }
    ],
    metadata: {
      config_backup: true,
      test_sent: true
    }
  }
]

const actionConfig = {
  user_login: { label: '用户登录', color: 'bg-green-100 text-green-800', icon: User },
  user_logout: { label: '用户登出', color: 'bg-gray-100 text-gray-600', icon: User },
  login_failed: { label: '登录失败', color: 'bg-red-100 text-red-800', icon: XCircle },
  content_create: { label: '创建内容', color: 'bg-blue-100 text-blue-800', icon: Plus },
  content_update: { label: '更新内容', color: 'bg-yellow-100 text-yellow-800', icon: Edit },
  content_delete: { label: '删除内容', color: 'bg-red-100 text-red-800', icon: Trash2 },
  user_permission_change: { label: '权限变更', color: 'bg-purple-100 text-purple-800', icon: Shield },
  system_backup: { label: '系统备份', color: 'bg-cyan-100 text-cyan-800', icon: Database },
  emergency_publish: { label: '紧急发布', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
  file_upload: { label: '文件上传', color: 'bg-indigo-100 text-indigo-800', icon: FileText },
  settings_update: { label: '设置更新', color: 'bg-orange-100 text-orange-800', icon: Settings }
}

const statusConfig = {
  success: { label: '成功', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  error: { label: '失败', color: 'bg-red-100 text-red-800', icon: XCircle },
  warning: { label: '警告', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
  info: { label: '信息', color: 'bg-blue-100 text-blue-800', icon: Info }
}

const resourceConfig = {
  authentication: { label: '身份认证', color: 'bg-purple-100 text-purple-800' },
  content: { label: '内容管理', color: 'bg-blue-100 text-blue-800' },
  user: { label: '用户管理', color: 'bg-green-100 text-green-800' },
  system: { label: '系统', color: 'bg-gray-100 text-gray-600' },
  emergency: { label: '应急通知', color: 'bg-red-100 text-red-800' },
  media: { label: '媒体文件', color: 'bg-indigo-100 text-indigo-800' },
  settings: { label: '系统设置', color: 'bg-orange-100 text-orange-800' }
}

export default function LogsPage() {
  const [logs, setLogs] = useState<OperationLog[]>(mockOperationLogs)
  const [filteredLogs, setFilteredLogs] = useState<OperationLog[]>(mockOperationLogs)
  const [searchTerm, setSearchTerm] = useState('')
  const [actionFilter, setActionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [resourceFilter, setResourceFilter] = useState('all')
  const [userFilter, setUserFilter] = useState('all')
  const [dateRange, setDateRange] = useState('today')
  const [selectedLog, setSelectedLog] = useState<OperationLog | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(false)

  // Auto refresh logs every 30 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (autoRefresh) {
      interval = setInterval(() => {
        // In a real app, this would fetch new logs from the API
        console.log('Refreshing logs...')
      }, 30000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh])

  // Filter logs based on criteria
  useEffect(() => {
    let filtered = logs

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.includes(searchTerm)
      )
    }

    // Action filter
    if (actionFilter !== 'all') {
      filtered = filtered.filter(log => log.action === actionFilter)
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(log => log.status === statusFilter)
    }

    // Resource filter
    if (resourceFilter !== 'all') {
      filtered = filtered.filter(log => log.resource === resourceFilter)
    }

    // User filter
    if (userFilter !== 'all') {
      filtered = filtered.filter(log => log.user?.id === userFilter)
    }

    // Date range filter
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    if (dateRange === 'today') {
      filtered = filtered.filter(log => log.timestamp >= today)
    } else if (dateRange === 'yesterday') {
      filtered = filtered.filter(log => log.timestamp >= yesterday && log.timestamp < today)
    } else if (dateRange === 'week') {
      filtered = filtered.filter(log => log.timestamp >= weekAgo)
    }

    setFilteredLogs(filtered)
  }, [logs, searchTerm, actionFilter, statusFilter, resourceFilter, userFilter, dateRange])

  const handleExportLogs = () => {
    const csvContent = [
      ['时间', '操作', '资源', '用户', 'IP地址', '状态', '描述'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp.toISOString(),
        log.action,
        log.resource,
        log.user?.name || '系统',
        log.ipAddress,
        log.status,
        `"${log.description}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `operation_logs_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDuration = (duration: number) => {
    if (duration < 1000) return `${duration}ms`
    if (duration < 60000) return `${(duration / 1000).toFixed(1)}s`
    return `${(duration / 60000).toFixed(1)}m`
  }

  const getIcon = (config: any, key: string) => {
    const IconComponent = config[key]?.icon || Activity
    return <IconComponent className="w-4 h-4" />
  }

  const getUniqueUsers = () => {
    const users = logs
      .filter(log => log.user)
      .map(log => log.user!)
      .filter((user, index, self) => 
        index === self.findIndex(u => u.id === user.id)
      )
    return users
  }

  const getLogStats = () => {
    const total = filteredLogs.length
    const success = filteredLogs.filter(log => log.status === 'success').length
    const errors = filteredLogs.filter(log => log.status === 'error').length
    const warnings = filteredLogs.filter(log => log.status === 'warning').length
    const avgDuration = filteredLogs.reduce((sum, log) => sum + log.duration, 0) / total || 0

    return { total, success, errors, warnings, avgDuration }
  }

  const stats = getLogStats()

  return (
    <MainLayout>
      <div className="container-dashboard py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              操作日志
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              查看和分析系统操作记录
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? 'bg-green-50 border-green-200' : ''}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? '自动刷新' : '手动刷新'}
            </Button>
            <Button onClick={handleExportLogs} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              导出日志
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">总操作</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">成功</p>
                  <p className="text-2xl font-bold text-green-600">{stats.success}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">失败</p>
                  <p className="text-2xl font-bold text-red-600">{stats.errors}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">警告</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.warnings}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">平均耗时</p>
                  <p className="text-2xl font-bold text-purple-600">{formatDuration(stats.avgDuration)}</p>
                </div>
                <Timer className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索日志..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="操作类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部操作</SelectItem>
                  {Object.entries(actionConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={resourceFilter} onValueChange={setResourceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="资源类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部资源</SelectItem>
                  {Object.entries(resourceConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="操作用户" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部用户</SelectItem>
                  {getUniqueUsers().map(user => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">今天</SelectItem>
                  <SelectItem value="yesterday">昨天</SelectItem>
                  <SelectItem value="week">最近7天</SelectItem>
                  <SelectItem value="all">全部时间</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Logs List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              操作记录 ({filteredLogs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div key={log.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge className={actionConfig[log.action as keyof typeof actionConfig]?.color || 'bg-gray-100 text-gray-600'}>
                        {getIcon(actionConfig, log.action)}
                        <span className="ml-1">{actionConfig[log.action as keyof typeof actionConfig]?.label || log.action}</span>
                      </Badge>
                      <Badge className={statusConfig[log.status].color}>
                        {getIcon(statusConfig, log.status)}
                        <span className="ml-1">{statusConfig[log.status].label}</span>
                      </Badge>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {log.description}
                        </p>
                        <Badge variant="outline" className={resourceConfig[log.resource]?.color || 'bg-gray-100 text-gray-600'}>
                          {resourceConfig[log.resource]?.label || log.resource}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{log.user?.name || '系统'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          <span>{log.ipAddress}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDate(log.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Timer className="w-4 h-4" />
                          <span>{formatDuration(log.duration)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedLog(log)
                      setShowDetails(true)
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    详情
                  </Button>
                </div>
              ))}
            </div>

            {filteredLogs.length === 0 && (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  暂无日志记录
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  没有找到符合条件的操作日志，请调整筛选条件。
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Log Details Modal */}
        {showDetails && selectedLog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    操作详情
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">基本信息</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">操作ID</label>
                        <p className="text-sm font-mono">{selectedLog.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">操作类型</label>
                        <Badge className={actionConfig[selectedLog.action as keyof typeof actionConfig]?.color || 'bg-gray-100 text-gray-600'}>
                          {actionConfig[selectedLog.action as keyof typeof actionConfig]?.label || selectedLog.action}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">资源类型</label>
                        <Badge variant="outline" className={resourceConfig[selectedLog.resource]?.color || 'bg-gray-100 text-gray-600'}>
                          {resourceConfig[selectedLog.resource]?.label || selectedLog.resource}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">状态</label>
                        <Badge className={statusConfig[selectedLog.status].color}>
                          {statusConfig[selectedLog.status].label}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">执行时间</label>
                        <p className="text-sm">{formatDate(selectedLog.timestamp)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">耗时</label>
                        <p className="text-sm">{formatDuration(selectedLog.duration)}</p>
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">用户信息</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">操作用户</label>
                        <p className="text-sm">{selectedLog.user?.name || '系统'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">用户名</label>
                        <p className="text-sm">{selectedLog.user?.username || 'system'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">IP地址</label>
                        <p className="text-sm font-mono">{selectedLog.ipAddress}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">User Agent</label>
                        <p className="text-sm truncate" title={selectedLog.userAgent}>
                          {selectedLog.userAgent}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  {selectedLog.details && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">详细信息</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="text-sm whitespace-pre-wrap">
                          {JSON.stringify(selectedLog.details, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Changes */}
                  {selectedLog.changes && selectedLog.changes.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">变更记录</h3>
                      <div className="space-y-3">
                        {selectedLog.changes.map((change, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <div className="font-medium text-sm mb-2">字段: {change.field}</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-600">旧值: </span>
                                <span className="font-mono bg-red-50 px-2 py-1 rounded">
                                  {change.oldValue === null ? 'null' : JSON.stringify(change.oldValue)}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">新值: </span>
                                <span className="font-mono bg-green-50 px-2 py-1 rounded">
                                  {JSON.stringify(change.newValue)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  {selectedLog.metadata && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">元数据</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="text-sm whitespace-pre-wrap">
                          {JSON.stringify(selectedLog.metadata, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  )
}