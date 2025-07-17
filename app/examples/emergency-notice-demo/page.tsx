'use client'

import React, { useState } from 'react'
import { 
  AlertTriangle, 
  Cloud, 
  Shield, 
  Zap, 
  Settings, 
  Plus, 
  Send, 
  Eye, 
  Edit, 
  Trash2, 
  Clock, 
  Users, 
  MessageSquare, 
  Smartphone, 
  Mail, 
  Speaker, 
  Monitor,
  CheckCircle,
  XCircle,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Filter,
  Search,
  Bell,
  AlertCircle,
  Info,
  X
} from 'lucide-react'
import MainLayout from '@/components/Layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { EmergencyNotice } from '@/types'
import { mockUser } from '@/lib/permissions'

// Mock data for emergency notices
const mockNotices: EmergencyNotice[] = [
  {
    id: '1',
    title: '恶劣天气预警',
    content: '由于台风影响，今日18:00后可能出现强风暴雨，请旅客提前做好准备，关注航班动态信息。机场将加强安全措施，确保旅客安全。',
    type: 'weather',
    priority: 'critical',
    status: 'published',
    scope: 'public',
    channels: ['app', 'sms', 'email', 'display'],
    author: mockUser,
    approver: mockUser,
    targetAudience: ['passengers', 'staff'],
    geofence: {
      type: 'circle',
      coordinates: [121.8057, 31.1443],
      radius: 5000,
      name: '浦东机场周边5km'
    },
    metadata: {
      bypassApproval: true,
      autoExpire: false,
      repeatInterval: 3600,
      attachments: []
    },
    auditLog: [],
    createdAt: new Date('2024-01-15T16:00:00'),
    updatedAt: new Date('2024-01-15T16:00:00'),
    publishedAt: new Date('2024-01-15T16:00:00'),
    expiresAt: new Date('2024-01-16T08:00:00'),
    stats: {
      sentCount: 15230,
      deliveredCount: 15180,
      readCount: 12450,
      clickCount: 3200,
      errorCount: 50
    }
  },
  {
    id: '2',
    title: '系统维护通知',
    content: '机场信息系统将于今晚23:00-次日5:00进行升级维护，期间可能影响部分服务。请合理安排出行时间，如有紧急情况请联系现场工作人员。',
    type: 'system',
    priority: 'warning',
    status: 'pending',
    scope: 'internal',
    channels: ['app', 'email'],
    author: mockUser,
    targetAudience: ['staff'],
    metadata: {
      bypassApproval: false,
      autoExpire: true,
      attachments: []
    },
    auditLog: [],
    createdAt: new Date('2024-01-15T14:30:00'),
    updatedAt: new Date('2024-01-15T14:30:00'),
    publishedAt: undefined,
    expiresAt: new Date('2024-01-16T05:00:00'),
    stats: {
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      clickCount: 0,
      errorCount: 0
    }
  },
  {
    id: '3',
    title: '安全等级提升',
    content: '接上级通知，机场安全等级临时提升至二级，请所有工作人员严格执行安全检查程序，加强现场巡查。旅客请配合安检工作。',
    type: 'security',
    priority: 'error',
    status: 'published',
    scope: 'internal',
    channels: ['app', 'sms', 'broadcast'],
    author: mockUser,
    approver: mockUser,
    targetAudience: ['security_staff', 'ground_staff'],
    metadata: {
      bypassApproval: true,
      autoExpire: false,
      attachments: []
    },
    auditLog: [],
    createdAt: new Date('2024-01-15T08:00:00'),
    updatedAt: new Date('2024-01-15T08:00:00'),
    publishedAt: new Date('2024-01-15T08:00:00'),
    expiresAt: undefined,
    stats: {
      sentCount: 890,
      deliveredCount: 885,
      readCount: 865,
      clickCount: 120,
      errorCount: 5
    }
  },
  {
    id: '4',
    title: '设备故障通知',
    content: 'T2航站楼A区自助值机设备出现故障，正在紧急维修中。请旅客前往人工柜台办理值机手续，预计修复时间2小时。',
    type: 'service',
    priority: 'info',
    status: 'expired',
    scope: 'public',
    channels: ['app', 'display'],
    author: mockUser,
    approver: mockUser,
    targetAudience: ['passengers'],
    metadata: {
      bypassApproval: false,
      autoExpire: true,
      attachments: []
    },
    auditLog: [],
    createdAt: new Date('2024-01-14T10:00:00'),
    updatedAt: new Date('2024-01-14T10:00:00'),
    publishedAt: new Date('2024-01-14T10:00:00'),
    expiresAt: new Date('2024-01-14T14:00:00'),
    stats: {
      sentCount: 5420,
      deliveredCount: 5400,
      readCount: 4850,
      clickCount: 890,
      errorCount: 20
    }
  }
]

const typeConfig = {
  system: { label: '系统', color: 'bg-gray-100 text-gray-800', icon: Settings },
  safety: { label: '安全', color: 'bg-red-100 text-red-800', icon: Shield },
  weather: { label: '天气', color: 'bg-blue-100 text-blue-800', icon: Cloud },
  security: { label: '安保', color: 'bg-yellow-100 text-yellow-800', icon: Shield },
  service: { label: '服务', color: 'bg-purple-100 text-purple-800', icon: Settings }
}

const priorityConfig = {
  info: { label: '信息', color: 'bg-blue-100 text-blue-800', icon: Info },
  warning: { label: '警告', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
  error: { label: '重要', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
  critical: { label: '紧急', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
}

const statusConfig = {
  draft: { label: '草稿', color: 'bg-gray-100 text-gray-800', icon: Edit },
  pending: { label: '待审核', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  published: { label: '已发布', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  expired: { label: '已过期', color: 'bg-gray-100 text-gray-600', icon: XCircle },
  cancelled: { label: '已取消', color: 'bg-red-100 text-red-800', icon: X }
}

const channelConfig = {
  app: { label: '应用推送', icon: Smartphone },
  sms: { label: '短信', icon: MessageSquare },
  email: { label: '邮件', icon: Mail },
  broadcast: { label: '广播', icon: Speaker },
  display: { label: '显示屏', icon: Monitor }
}

export default function EmergencyNoticeDemo() {
  const [notices, setNotices] = useState<EmergencyNotice[]>(mockNotices)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedNotice, setSelectedNotice] = useState<EmergencyNotice | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    type: 'system',
    priority: 'info',
    scope: 'public',
    channels: ['app'],
    targetAudience: ['passengers'],
    bypassApproval: false,
    autoExpire: true,
    expiresAt: ''
  })

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || notice.type === typeFilter
    const matchesPriority = priorityFilter === 'all' || notice.priority === priorityFilter
    const matchesStatus = statusFilter === 'all' || notice.status === statusFilter
    
    return matchesSearch && matchesType && matchesPriority && matchesStatus
  })

  const handleCreateNotice = () => {
    if (!newNotice.title || !newNotice.content) {
      alert('请填写标题和内容')
      return
    }

    const notice: EmergencyNotice = {
      id: Date.now().toString(),
      title: newNotice.title,
      content: newNotice.content,
      type: newNotice.type as any,
      priority: newNotice.priority as any,
      status: newNotice.bypassApproval ? 'published' : 'pending',
      scope: newNotice.scope as any,
      channels: newNotice.channels as any,
      author: mockUser,
      approver: newNotice.bypassApproval ? mockUser : undefined,
      targetAudience: newNotice.targetAudience,
      metadata: {
        bypassApproval: newNotice.bypassApproval,
        autoExpire: newNotice.autoExpire,
        attachments: []
      },
      auditLog: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: newNotice.bypassApproval ? new Date() : undefined,
      expiresAt: newNotice.expiresAt ? new Date(newNotice.expiresAt) : undefined,
      stats: {
        sentCount: 0,
        deliveredCount: 0,
        readCount: 0,
        clickCount: 0,
        errorCount: 0
      }
    }

    setNotices(prev => [notice, ...prev])
    setShowCreateForm(false)
    setNewNotice({
      title: '',
      content: '',
      type: 'system',
      priority: 'info',
      scope: 'public',
      channels: ['app'],
      targetAudience: ['passengers'],
      bypassApproval: false,
      autoExpire: true,
      expiresAt: ''
    })

    // Simulate approval process if not bypassed
    if (!newNotice.bypassApproval) {
      setTimeout(() => {
        setNotices(prev => prev.map(n => 
          n.id === notice.id 
            ? { ...n, status: 'published', publishedAt: new Date(), approver: mockUser }
            : n
        ))
      }, 2000)
    }
  }

  const handlePublish = (noticeId: string) => {
    setNotices(prev => prev.map(notice => 
      notice.id === noticeId 
        ? { ...notice, status: 'published', publishedAt: new Date(), approver: mockUser }
        : notice
    ))
  }

  const handleCancel = (noticeId: string) => {
    setNotices(prev => prev.map(notice => 
      notice.id === noticeId 
        ? { ...notice, status: 'cancelled', updatedAt: new Date() }
        : notice
    ))
  }

  const handleDelete = (noticeId: string) => {
    if (confirm('确定要删除此通知吗？')) {
      setNotices(prev => prev.filter(n => n.id !== noticeId))
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getIcon = (config: any, key: string) => {
    const IconComponent = config[key]?.icon || Bell
    return <IconComponent className="w-4 h-4" />
  }

  return (
    <MainLayout>
      <div className="container-dashboard py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              应急通知管理
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              快速发布和管理应急通知，支持多渠道推送
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            发布通知
          </Button>
        </div>

        {/* Create Notice Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-red-600">
                <AlertTriangle className="w-5 h-5 mr-2 inline" />
                新建应急通知
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">标题</label>
                  <Input
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                    placeholder="输入通知标题"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">类型</label>
                  <Select value={newNotice.type} onValueChange={(value) => setNewNotice({...newNotice, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">系统</SelectItem>
                      <SelectItem value="safety">安全</SelectItem>
                      <SelectItem value="weather">天气</SelectItem>
                      <SelectItem value="security">安保</SelectItem>
                      <SelectItem value="service">服务</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">优先级</label>
                  <Select value={newNotice.priority} onValueChange={(value) => setNewNotice({...newNotice, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">信息</SelectItem>
                      <SelectItem value="warning">警告</SelectItem>
                      <SelectItem value="error">重要</SelectItem>
                      <SelectItem value="critical">紧急</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">发布范围</label>
                  <Select value={newNotice.scope} onValueChange={(value) => setNewNotice({...newNotice, scope: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">公开</SelectItem>
                      <SelectItem value="internal">内部</SelectItem>
                      <SelectItem value="passenger">旅客</SelectItem>
                      <SelectItem value="staff">员工</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">内容</label>
                <Textarea
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                  placeholder="输入通知内容"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">推送渠道</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(channelConfig).map(([key, config]) => (
                    <label key={key} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newNotice.channels.includes(key)}
                        onChange={(e) => {
                          const channels = e.target.checked 
                            ? [...newNotice.channels, key]
                            : newNotice.channels.filter(c => c !== key)
                          setNewNotice({...newNotice, channels})
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{config.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newNotice.bypassApproval}
                    onChange={(e) => setNewNotice({...newNotice, bypassApproval: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm">跳过审核</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newNotice.autoExpire}
                    onChange={(e) => setNewNotice({...newNotice, autoExpire: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm">自动过期</span>
                </label>
              </div>

              {newNotice.autoExpire && (
                <div>
                  <label className="block text-sm font-medium mb-2">过期时间</label>
                  <Input
                    type="datetime-local"
                    value={newNotice.expiresAt}
                    onChange={(e) => setNewNotice({...newNotice, expiresAt: e.target.value})}
                  />
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                >
                  取消
                </Button>
                <Button 
                  onClick={handleCreateNotice}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  发布通知
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索通知..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="类型筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="system">系统</SelectItem>
                  <SelectItem value="safety">安全</SelectItem>
                  <SelectItem value="weather">天气</SelectItem>
                  <SelectItem value="security">安保</SelectItem>
                  <SelectItem value="service">服务</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="优先级筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部优先级</SelectItem>
                  <SelectItem value="info">信息</SelectItem>
                  <SelectItem value="warning">警告</SelectItem>
                  <SelectItem value="error">重要</SelectItem>
                  <SelectItem value="critical">紧急</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="draft">草稿</SelectItem>
                  <SelectItem value="pending">待审核</SelectItem>
                  <SelectItem value="published">已发布</SelectItem>
                  <SelectItem value="expired">已过期</SelectItem>
                  <SelectItem value="cancelled">已取消</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                高级筛选
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notices List */}
        <div className="grid gap-4">
          {filteredNotices.map((notice) => (
            <Card key={notice.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {notice.title}
                      </h3>
                      <Badge className={statusConfig[notice.status].color}>
                        {getIcon(statusConfig, notice.status)}
                        <span className="ml-1">{statusConfig[notice.status].label}</span>
                      </Badge>
                      <Badge className={typeConfig[notice.type].color}>
                        {getIcon(typeConfig, notice.type)}
                        <span className="ml-1">{typeConfig[notice.type].label}</span>
                      </Badge>
                      <Badge className={priorityConfig[notice.priority].color}>
                        {getIcon(priorityConfig, notice.priority)}
                        <span className="ml-1">{priorityConfig[notice.priority].label}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {notice.content}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>发布者: {notice.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>创建: {formatDate(notice.createdAt)}</span>
                      </div>
                      {notice.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Bell className="w-4 h-4" />
                          <span>发布: {formatDate(notice.publishedAt)}</span>
                        </div>
                      )}
                      {notice.expiresAt && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>过期: {formatDate(notice.expiresAt)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">推送渠道:</span>
                        {notice.channels.map((channel) => (
                          <Badge key={channel} variant="outline" className="text-xs">
                            {getIcon(channelConfig, channel)}
                            <span className="ml-1">{channelConfig[channel as keyof typeof channelConfig].label}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {notice.status === 'published' && (
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>发送: {notice.stats.sentCount}</span>
                        <span>送达: {notice.stats.deliveredCount}</span>
                        <span>已读: {notice.stats.readCount}</span>
                        <span>点击: {notice.stats.clickCount}</span>
                        {notice.stats.errorCount > 0 && (
                          <span className="text-red-600">错误: {notice.stats.errorCount}</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {notice.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => handlePublish(notice.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        发布
                      </Button>
                    )}
                    {notice.status === 'published' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCancel(notice.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <StopCircle className="w-4 h-4 mr-1" />
                        取消
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedNotice(notice)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      详情
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(notice.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                暂无通知
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                没有找到符合条件的通知，请调整筛选条件或发布新通知。
              </p>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-red-600 hover:bg-red-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                发布通知
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}