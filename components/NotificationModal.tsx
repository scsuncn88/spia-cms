'use client'

import React, { useState } from 'react'
import { AlertTriangle, Send, Clock, Users, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: EmergencyNotificationData) => void
  onConfirm?: (data: EmergencyNotificationData) => void
  isLoading?: boolean
}

export interface EmergencyNotificationData {
  title: string
  content: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  targetAudience: 'all' | 'staff' | 'passengers'
  channels: ('app' | 'sms' | 'email' | 'broadcast')[]
  expiresAt?: Date
  skipApproval?: boolean
}

const priorityConfig = {
  low: { label: '低', color: 'text-green-600 bg-green-50', icon: '●' },
  medium: { label: '中', color: 'text-yellow-600 bg-yellow-50', icon: '●' },
  high: { label: '高', color: 'text-orange-600 bg-orange-50', icon: '●' },
  urgent: { label: '紧急', color: 'text-red-600 bg-red-50', icon: '⚠' }
}

export function NotificationModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onConfirm, 
  isLoading = false 
}: NotificationModalProps) {
  const [formData, setFormData] = useState<EmergencyNotificationData>({
    title: '',
    content: '',
    priority: 'medium',
    targetAudience: 'all',
    channels: ['app'],
    skipApproval: false
  })

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.priority === 'urgent' && formData.skipApproval) {
      setShowConfirmDialog(true)
    } else {
      onSubmit?.(formData)
    }
  }

  const handleConfirm = () => {
    onConfirm?.(formData)
    setShowConfirmDialog(false)
  }

  const handleChannelChange = (channel: EmergencyNotificationData['channels'][0]) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
      targetAudience: 'all',
      channels: ['app'],
      skipApproval: false
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px]" onClose={handleClose}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              应急通知发布
            </DialogTitle>
            <DialogDescription>
              快速发布紧急通知，确保重要信息及时传达给目标受众
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                通知标题 <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="请输入通知标题"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                通知内容 <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="请输入通知内容详情"
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  优先级
                </label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as EmergencyNotificationData['priority'] }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {Object.entries(priorityConfig).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.icon} {config.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="targetAudience" className="text-sm font-medium">
                  目标受众
                </label>
                <select
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value as EmergencyNotificationData['targetAudience'] }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="all">全部用户</option>
                  <option value="staff">工作人员</option>
                  <option value="passengers">乘客</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">发送渠道</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'app', label: '小程序通知', icon: MessageSquare },
                  { key: 'sms', label: '短信', icon: MessageSquare },
                  { key: 'email', label: '邮件', icon: MessageSquare },
                  { key: 'broadcast', label: '广播', icon: MessageSquare }
                ].map(({ key, label, icon: Icon }) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.channels.includes(key as any)}
                      onChange={() => handleChannelChange(key as any)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="expiresAt" className="text-sm font-medium">
                过期时间 (可选)
              </label>
              <Input
                id="expiresAt"
                type="datetime-local"
                value={formData.expiresAt?.toISOString().slice(0, 16) || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  expiresAt: e.target.value ? new Date(e.target.value) : undefined 
                }))}
              />
            </div>

            {formData.priority === 'urgent' && (
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.skipApproval}
                    onChange={(e) => setFormData(prev => ({ ...prev, skipApproval: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">跳过审核流程（仅限紧急情况）</span>
                </label>
                {formData.skipApproval && (
                  <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                    ⚠️ 启用此选项将直接发布通知，请确保内容准确无误
                  </p>
                )}
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                取消
              </Button>
              <Button type="submit" disabled={isLoading}>
                <Send className="h-4 w-4 mr-2" />
                {isLoading ? '发布中...' : '发布通知'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 确认对话框 */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[400px]" onClose={() => setShowConfirmDialog(false)}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              确认紧急发布
            </DialogTitle>
            <DialogDescription>
              您即将跳过审核流程直接发布紧急通知。此操作不可撤销，请确认：
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 text-sm">
            <div><strong>标题：</strong>{formData.title}</div>
            <div><strong>优先级：</strong>
              <span className={cn('px-2 py-1 rounded-full text-xs ml-2', priorityConfig[formData.priority].color)}>
                {priorityConfig[formData.priority].icon} {priorityConfig[formData.priority].label}
              </span>
            </div>
            <div><strong>目标受众：</strong>
              {formData.targetAudience === 'all' ? '全部用户' : 
               formData.targetAudience === 'staff' ? '工作人员' : '乘客'}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={isLoading}>
              确认发布
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}