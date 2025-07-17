'use client'

import React, { useState } from 'react'
import { ContentForm, ContentFormData } from '@/components/ContentForm'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Content } from '@/types'

// Mock 数据
const mockUser = {
  name: '张三',
  role: '内容编辑',
  avatar: 'https://via.placeholder.com/32'
}

const mockContents: Content[] = [
  {
    id: '1',
    title: '春运期间出行提醒',
    content: '亲爱的旅客朋友们，春运即将开始，为了您的顺利出行，请提前做好以下准备工作...',
    type: 'notice',
    status: 'published',
    author: mockUser,
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00'),
    publishedAt: new Date('2024-01-15T10:00:00'),
    tags: ['春运', '出行提醒', '交通'],
    images: [],
    videos: []
  },
  {
    id: '2',
    title: '车站设施维护通知',
    content: '为了提供更好的服务，本站将于明日凌晨进行设施维护...',
    type: 'announcement',
    status: 'pending',
    author: mockUser,
    createdAt: new Date('2024-01-14T14:30:00'),
    updatedAt: new Date('2024-01-14T14:30:00'),
    tags: ['维护', '设施', '通知'],
    images: [],
    videos: []
  }
]

const statusConfig = {
  draft: { label: '草稿', color: 'text-gray-600 bg-gray-50' },
  pending: { label: '待审核', color: 'text-yellow-600 bg-yellow-50' },
  approved: { label: '已通过', color: 'text-green-600 bg-green-50' },
  rejected: { label: '已拒绝', color: 'text-red-600 bg-red-50' },
  published: { label: '已发布', color: 'text-blue-600 bg-blue-50' }
}

const typeConfig = {
  article: { label: '文章', color: 'text-purple-600 bg-purple-50' },
  notice: { label: '通知', color: 'text-orange-600 bg-orange-50' },
  announcement: { label: '公告', color: 'text-green-600 bg-green-50' }
}

export default function ContentPublishDemo() {
  const [contents, setContents] = useState<Content[]>(mockContents)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (data: ContentFormData) => {
    setIsLoading(true)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newContent: Content = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      type: data.type,
      status: data.scheduledAt ? 'approved' : 'pending',
      author: mockUser,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: data.scheduledAt,
      scheduledAt: data.scheduledAt,
      tags: data.tags,
      images: data.images.map(f => f.name),
      videos: data.videos.map(f => f.name)
    }
    
    setContents(prev => [newContent, ...prev])
    setShowForm(false)
    setIsLoading(false)
    
    // 模拟审核流程
    setTimeout(() => {
      setContents(prev => prev.map(content => 
        content.id === newContent.id 
          ? { ...content, status: 'approved' }
          : content
      ))
    }, 3000)
    
    // 模拟发布
    setTimeout(() => {
      setContents(prev => prev.map(content => 
        content.id === newContent.id 
          ? { ...content, status: 'published', publishedAt: new Date() }
          : content
      ))
    }, 5000)
  }

  const handlePreview = (data: ContentFormData) => {
    console.log('预览内容:', data)
    alert('预览功能演示：内容将在预览窗口中显示')
  }

  const handleSave = (data: ContentFormData) => {
    console.log('保存草稿:', data)
    alert('草稿已保存')
  }

  const handleEdit = (content: Content) => {
    setSelectedContent(content)
    setShowForm(true)
  }

  const handleDelete = (contentId: string) => {
    if (confirm('确定要删除此内容吗？')) {
      setContents(prev => prev.filter(c => c.id !== contentId))
    }
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
          <h1 className="text-2xl font-bold">内容发布管理</h1>
          <Button onClick={() => setShowForm(true)}>
            新建内容
          </Button>
        </div>

        {showForm && (
          <ContentForm
            onSubmit={handleSubmit}
            onPreview={handlePreview}
            onSave={handleSave}
            initialData={selectedContent ? {
              title: selectedContent.title,
              content: selectedContent.content,
              type: selectedContent.type,
              tags: selectedContent.tags,
              images: [],
              videos: [],
              scheduledAt: selectedContent.scheduledAt
            } : undefined}
            isLoading={isLoading}
          />
        )}

        <Card>
          <CardHeader>
            <CardTitle>内容列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contents.map((content) => (
                <div 
                  key={content.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{content.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${statusConfig[content.status].color}`}>
                          {statusConfig[content.status].label}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${typeConfig[content.type].color}`}>
                          {typeConfig[content.type].label}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {content.content}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>作者: {content.author.name}</span>
                        <span>创建: {formatDate(content.createdAt)}</span>
                        {content.publishedAt && (
                          <span>发布: {formatDate(content.publishedAt)}</span>
                        )}
                        {content.scheduledAt && (
                          <span>定时: {formatDate(content.scheduledAt)}</span>
                        )}
                      </div>
                      
                      {content.tags.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {content.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(content)}
                      >
                        编辑
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(content.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}