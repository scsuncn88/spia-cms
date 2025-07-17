'use client'

import React, { useState } from 'react'
import { Calendar, Upload, Eye, Send, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ContentFormProps {
  onSubmit?: (data: ContentFormData) => void
  onPreview?: (data: ContentFormData) => void
  onSave?: (data: ContentFormData) => void
  initialData?: Partial<ContentFormData>
  isLoading?: boolean
}

export interface ContentFormData {
  title: string
  content: string
  type: 'article' | 'notice' | 'announcement'
  tags: string[]
  images: File[]
  videos: File[]
  scheduledAt?: Date
  priority: 'low' | 'medium' | 'high'
}

export function ContentForm({ 
  onSubmit, 
  onPreview, 
  onSave, 
  initialData, 
  isLoading = false 
}: ContentFormProps) {
  const [formData, setFormData] = useState<ContentFormData>({
    title: '',
    content: '',
    type: 'article',
    tags: [],
    images: [],
    videos: [],
    priority: 'medium',
    ...initialData
  })

  const [tagInput, setTagInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }))
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'images' | 'videos') => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...files]
    }))
  }

  const handleRemoveFile = (index: number, type: 'images' | 'videos') => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>内容发布</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                标题 <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="请输入内容标题"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                内容类型
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as ContentFormData['type'] }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="article">文章</option>
                <option value="notice">通知</option>
                <option value="announcement">公告</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              内容 <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="请输入内容详情"
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                标签
              </label>
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="输入标签后按回车添加"
              />
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">
                优先级
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as ContentFormData['priority'] }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">媒体文件</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="images" className="block text-sm text-muted-foreground mb-2">
                    图片
                  </label>
                  <input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'images')}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('images')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    上传图片
                  </Button>
                  {formData.images.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.images.map((file, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index, 'images')}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="videos" className="block text-sm text-muted-foreground mb-2">
                    视频
                  </label>
                  <input
                    id="videos"
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'videos')}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('videos')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    上传视频
                  </Button>
                  {formData.videos.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.videos.map((file, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index, 'videos')}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="scheduledAt" className="text-sm font-medium">
                定时发布
              </label>
              <Input
                id="scheduledAt"
                type="datetime-local"
                value={formData.scheduledAt?.toISOString().slice(0, 16) || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  scheduledAt: e.target.value ? new Date(e.target.value) : undefined 
                }))}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onPreview?.(formData)}
              disabled={isLoading}
            >
              <Eye className="h-4 w-4 mr-2" />
              预览
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => onSave?.(formData)}
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              保存草稿
            </Button>
            
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? '发布中...' : '发布'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}