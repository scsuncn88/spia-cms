'use client'

import React, { useState } from 'react'
import { AlertTriangle, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { NotificationModal, EmergencyNotificationData } from '@/components/NotificationModal'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate, formatRelativeTime, cn } from '@/lib/utils'
import { EmergencyNotice } from '@/types'

// Mock 数据
const mockUser = {
  name: '李四',
  role: '应急管理员',
  avatar: 'https://via.placeholder.com/32'
}

const mockNotices: EmergencyNotice[] = [
  {
    id: '1',
    title: '临时停电通知',
    content: '因设备维护需要，本站将于今晚22:00-次日06:00进行临时停电，请提前做好相关准备。',
    priority: 'high',
    status: 'published',
    author: mockUser,
    createdAt: new Date('2024-01-15T20:00:00'),
    publishedAt: new Date('2024-01-15T20:00:00'),
    expiresAt: new Date('2024-01-16T06:00:00'),
    targetAudience: 'all',
    channels: ['app', 'sms', 'broadcast']
  },
  {
    id: '2',
    title: '极端天气预警',
    content: '根据气象部门预报，明日将有大雪天气，请注意出行安全，合理安排行程。',
    priority: 'urgent',
    status: 'published',
    author: mockUser,
    createdAt: new Date('2024-01-14T16:30:00'),
    publishedAt: new Date('2024-01-14T16:30:00'),
    expiresAt: new Date('2024-01-16T00:00:00'),
    targetAudience: 'passengers',
    channels: ['app', 'sms', 'email', 'broadcast']
  },
  {
    id: '3',
    title: '系统维护通知',
    content: '购票系统将于明日凌晨2:00-4:00进行维护升级，期间无法购票，请提前安排。',
    priority: 'medium',
    status: 'draft',
    author: mockUser,
    createdAt: new Date('2024-01-14T10:00:00'),
    targetAudience: 'passengers',
    channels: ['app', 'email']
  }
]

const priorityConfig = {
  low: { label: '低', color: 'text-green-600 bg-green-50', icon: '●' },
  medium: { label: '中', color: 'text-yellow-600 bg-yellow-50', icon: '●' },
  high: { label: '高', color: 'text-orange-600 bg-orange-50', icon: '●' },
  urgent: { label: '紧急', color: 'text-red-600 bg-red-50', icon: '⚠' }
}

const statusConfig = {
  draft: { label: '草稿', color: 'text-gray-600 bg-gray-50' },
  published: { label: '已发布', color: 'text-green-600 bg-green-50' },
  expired: { label: '已过期', color: 'text-gray-600 bg-gray-50' }
}

const audienceConfig = {
  all: '全部用户',
  staff: '工作人员',
  passengers: '乘客'
}

const channelConfig = {
  app: '小程序',
  sms: '短信',
  email: '邮件',
  broadcast: '广播'
}

export default function EmergencyNoticeDemo() {
  const [notices, setNotices] = useState<EmergencyNotice[]>(mockNotices)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedNotice, setSelectedNotice] = useState<EmergencyNotice | null>(null)

  const handleSubmit = async (data: EmergencyNotificationData) => {
    setIsLoading(true)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newNotice: EmergencyNotice = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      priority: data.priority,
      status: data.skipApproval ? 'published' : 'draft',
      author: mockUser,
      createdAt: new Date(),
      publishedAt: data.skipApproval ? new Date() : undefined,
      expiresAt: data.expiresAt,
      targetAudience: data.targetAudience,
      channels: data.channels
    }
    
    setNotices(prev => [newNotice, ...prev])
    setIsModalOpen(false)
    setIsLoading(false)
    
    // 如果没有跳过审核，模拟审核和发布流程
    if (!data.skipApproval) {
      setTimeout(() => {
        setNotices(prev => prev.map(notice => 
          notice.id === newNotice.id 
            ? { ...notice, status: 'published', publishedAt: new Date() }
            : notice
        ))
      }, 3000)
    }
  }

  const handleConfirm = async (data: EmergencyNotificationData) => {
    setIsLoading(true)
    
    // 模拟紧急发布
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const newNotice: EmergencyNotice = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      priority: data.priority,
      status: 'published',
      author: mockUser,
      createdAt: new Date(),
      publishedAt: new Date(),
      expiresAt: data.expiresAt,
      targetAudience: data.targetAudience,
      channels: data.channels
    }
    
    setNotices(prev => [newNotice, ...prev])
    setIsModalOpen(false)
    setIsLoading(false)
    
    // 显示紧急发布成功提示
    alert('紧急通知已成功发布！')
  }

  const handleEdit = (notice: EmergencyNotice) => {
    setSelectedNotice(notice)
    setIsModalOpen(true)
  }

  const handleDelete = (noticeId: string) => {
    if (confirm('确定要删除此通知吗？')) {
      setNotices(prev => prev.filter(n => n.id !== noticeId))
    }
  }

  const handleView = (notice: EmergencyNotice) => {
    alert(`查看通知详情：\n\n标题：${notice.title}\n内容：${notice.content}\n优先级：${priorityConfig[notice.priority].label}\n目标受众：${audienceConfig[notice.targetAudience]}\n发送渠道：${notice.channels.map(c => channelConfig[c]).join(', ')}`)
  }

  const getNoticeStatus = (notice: EmergencyNotice) => {
    if (notice.expiresAt && new Date() > notice.expiresAt) {
      return 'expired'
    }
    return notice.status
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={mockUser} 
        onNotificationClick={() => alert('通知功能演示')}
        onSettingsClick={() => alert('设置功能演示')}
        onProfileClick={() => alert('个人资料演示')}
      />
      
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            应急通知管理
          </h1>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            发布紧急通知
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">今日发布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {notices.filter(n => 
                  n.publishedAt && 
                  new Date(n.publishedAt).toDateString() === new Date().toDateString()
                ).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">紧急通知</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {notices.filter(n => n.priority === 'urgent' && getNoticeStatus(n) === 'published').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">活跃通知</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {notices.filter(n => getNoticeStatus(n) === 'published').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>通知列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notices.map((notice) => {
                const currentStatus = getNoticeStatus(notice)
                return (
                  <div 
                    key={notice.id}
                    className={cn(
                      'border rounded-lg p-4 transition-colors',
                      notice.priority === 'urgent' && 'border-red-200 bg-red-50/50',
                      notice.priority === 'high' && 'border-orange-200 bg-orange-50/50',
                      'hover:bg-muted/50'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={cn(
                            'text-sm font-medium',
                            priorityConfig[notice.priority].icon
                          )}>
                            {priorityConfig[notice.priority].icon}
                          </span>
                          <h3 className="font-semibold">{notice.title}</h3>
                          <span className={cn(
                            'px-2 py-1 rounded-full text-xs',
                            priorityConfig[notice.priority].color
                          )}>
                            {priorityConfig[notice.priority].label}
                          </span>
                          <span className={cn(
                            'px-2 py-1 rounded-full text-xs',
                            statusConfig[currentStatus].color
                          )}>
                            {statusConfig[currentStatus].label}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {notice.content}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>目标: {audienceConfig[notice.targetAudience]}</span>
                          <span>渠道: {notice.channels.map(c => channelConfig[c]).join(', ')}</span>
                          <span>创建: {formatRelativeTime(notice.createdAt)}</span>
                          {notice.publishedAt && (
                            <span>发布: {formatRelativeTime(notice.publishedAt)}</span>
                          )}
                          {notice.expiresAt && (
                            <span>过期: {formatDate(notice.expiresAt)}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(notice)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(notice)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(notice.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedNotice(null)
        }}
        onSubmit={handleSubmit}
        onConfirm={handleConfirm}
        isLoading={isLoading}
      />
    </div>
  )
}