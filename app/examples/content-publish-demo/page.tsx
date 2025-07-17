'use client'

import React, { useState } from 'react'
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Tag,
  User,
  MoreHorizontal
} from 'lucide-react'
import MainLayout from '@/components/Layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Content } from '@/types'
import { mockUser } from '@/lib/permissions'

// Mock data with enhanced content structure
const mockContents: Content[] = [
  {
    id: '1',
    title: '春运期间出行提醒',
    content: '亲爱的旅客朋友们，春运即将开始，为了您的顺利出行，请提前做好以下准备工作。建议提前2小时到达机场，准备好有效证件，关注航班动态信息。',
    excerpt: '春运即将开始，为了您的顺利出行，请提前做好准备工作...',
    type: 'notice',
    status: 'published',
    priority: 'high',
    author: mockUser,
    assignee: mockUser,
    reviewers: [mockUser],
    categories: [
      { id: '1', name: '出行提醒', slug: 'travel-tips', description: '', parent: undefined, children: [], order: 1, metadata: {}, createdAt: new Date(), updatedAt: new Date() }
    ],
    tags: [
      { id: '1', name: '春运', slug: 'spring-travel', count: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: '2', name: '出行提醒', slug: 'travel-tips', count: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: '3', name: '交通', slug: 'transport', count: 8, createdAt: new Date(), updatedAt: new Date() }
    ],
    media: [],
    metadata: {
      seoTitle: '春运期间出行提醒 - 浦东机场',
      seoDescription: '春运期间出行提醒，提前准备避免延误',
      seoKeywords: ['春运', '出行', '提醒'],
      featured: true,
      sticky: false,
      allowComments: true,
      customFields: {}
    },
    auditLog: [],
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00'),
    publishedAt: new Date('2024-01-15T10:00:00'),
    scheduledAt: undefined,
    expiresAt: undefined,
    viewCount: 1234,
    rating: 4.5,
    ratingCount: 89
  },
  {
    id: '2',
    title: '车站设施维护通知',
    content: '为了提供更好的服务，本站将于明日凌晨2:00-5:00进行设施维护，期间可能影响部分服务。请旅客朋友们合理安排出行时间，如有疑问请联系客服。',
    excerpt: '设施维护通知，明日凌晨2:00-5:00进行维护作业...',
    type: 'announcement',
    status: 'pending',
    priority: 'medium',
    author: mockUser,
    assignee: mockUser,
    reviewers: [mockUser],
    categories: [
      { id: '2', name: '设施维护', slug: 'maintenance', description: '', parent: undefined, children: [], order: 2, metadata: {}, createdAt: new Date(), updatedAt: new Date() }
    ],
    tags: [
      { id: '4', name: '维护', slug: 'maintenance', count: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: '5', name: '设施', slug: 'facility', count: 20, createdAt: new Date(), updatedAt: new Date() },
      { id: '6', name: '通知', slug: 'notice', count: 45, createdAt: new Date(), updatedAt: new Date() }
    ],
    media: [],
    metadata: {
      featured: false,
      sticky: true,
      allowComments: false,
      customFields: {}
    },
    auditLog: [],
    createdAt: new Date('2024-01-14T14:30:00'),
    updatedAt: new Date('2024-01-14T14:30:00'),
    publishedAt: undefined,
    scheduledAt: new Date('2024-01-16T02:00:00'),
    expiresAt: new Date('2024-01-17T08:00:00'),
    viewCount: 456,
    rating: 0,
    ratingCount: 0
  },
  {
    id: '3',
    title: '安全检查流程更新',
    content: '为了提高安全检查效率，即日起启用新的安全检查流程。请旅客配合安检人员的工作，主动配合检查，确保出行安全。',
    excerpt: '安全检查流程更新，提高效率确保安全...',
    type: 'policy',
    status: 'approved',
    priority: 'urgent',
    author: mockUser,
    assignee: mockUser,
    reviewers: [mockUser],
    categories: [
      { id: '3', name: '安全管理', slug: 'security', description: '', parent: undefined, children: [], order: 3, metadata: {}, createdAt: new Date(), updatedAt: new Date() }
    ],
    tags: [
      { id: '7', name: '安全', slug: 'security', count: 30, createdAt: new Date(), updatedAt: new Date() },
      { id: '8', name: '检查', slug: 'check', count: 18, createdAt: new Date(), updatedAt: new Date() },
      { id: '9', name: '流程', slug: 'process', count: 25, createdAt: new Date(), updatedAt: new Date() }
    ],
    media: [],
    metadata: {
      featured: true,
      sticky: true,
      allowComments: true,
      customFields: {}
    },
    auditLog: [],
    createdAt: new Date('2024-01-13T09:15:00'),
    updatedAt: new Date('2024-01-13T16:20:00'),
    publishedAt: undefined,
    scheduledAt: new Date('2024-01-15T08:00:00'),
    expiresAt: undefined,
    viewCount: 789,
    rating: 4.2,
    ratingCount: 156
  }
]

const statusConfig = {
  draft: { label: '草稿', color: 'bg-gray-100 text-gray-800', icon: Edit },
  pending: { label: '待审核', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  approved: { label: '已通过', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: '已拒绝', color: 'bg-red-100 text-red-800', icon: XCircle },
  published: { label: '已发布', color: 'bg-blue-100 text-blue-800', icon: Eye },
  archived: { label: '已归档', color: 'bg-gray-100 text-gray-600', icon: FileText }
}

const typeConfig = {
  article: { label: '文章', color: 'bg-purple-100 text-purple-800' },
  notice: { label: '通知', color: 'bg-orange-100 text-orange-800' },
  announcement: { label: '公告', color: 'bg-green-100 text-green-800' },
  policy: { label: '政策', color: 'bg-indigo-100 text-indigo-800' },
  faq: { label: 'FAQ', color: 'bg-teal-100 text-teal-800' }
}

const priorityConfig = {
  low: { label: '低', color: 'bg-gray-100 text-gray-600' },
  medium: { label: '中', color: 'bg-blue-100 text-blue-800' },
  high: { label: '高', color: 'bg-orange-100 text-orange-800' },
  urgent: { label: '紧急', color: 'bg-red-100 text-red-800' }
}

export default function ContentPublishDemo() {
  const [contents, setContents] = useState<Content[]>(mockContents)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter
    const matchesType = typeFilter === 'all' || content.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const handleEdit = (content: Content) => {
    setSelectedContent(content)
    alert(`编辑内容: ${content.title}`)
  }

  const handleDelete = (contentId: string) => {
    if (confirm('确定要删除此内容吗？')) {
      setContents(prev => prev.filter(c => c.id !== contentId))
    }
  }

  const handlePublish = (contentId: string) => {
    setContents(prev => prev.map(content => 
      content.id === contentId 
        ? { ...content, status: 'published' as const, publishedAt: new Date() }
        : content
    ))
  }

  const handleApprove = (contentId: string) => {
    setContents(prev => prev.map(content => 
      content.id === contentId 
        ? { ...content, status: 'approved' as const, updatedAt: new Date() }
        : content
    ))
  }

  const handleReject = (contentId: string) => {
    setContents(prev => prev.map(content => 
      content.id === contentId 
        ? { ...content, status: 'rejected' as const, updatedAt: new Date() }
        : content
    ))
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

  const getStatusIcon = (status: string) => {
    const StatusIcon = statusConfig[status as keyof typeof statusConfig]?.icon || FileText
    return <StatusIcon className="w-4 h-4" />
  }

  return (
    <MainLayout>
      <div className="container-dashboard py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              内容管理
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              管理和发布各类内容，支持多级审核流程
            </p>
          </div>
          <Button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            新建内容
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索内容..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="draft">草稿</SelectItem>
                  <SelectItem value="pending">待审核</SelectItem>
                  <SelectItem value="approved">已通过</SelectItem>
                  <SelectItem value="published">已发布</SelectItem>
                  <SelectItem value="rejected">已拒绝</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="类型筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="article">文章</SelectItem>
                  <SelectItem value="notice">通知</SelectItem>
                  <SelectItem value="announcement">公告</SelectItem>
                  <SelectItem value="policy">政策</SelectItem>
                  <SelectItem value="faq">FAQ</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                高级筛选
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content List */}
        <div className="grid gap-4">
          {filteredContents.map((content) => (
            <Card key={content.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {content.title}
                      </h3>
                      <Badge className={statusConfig[content.status].color}>
                        {getStatusIcon(content.status)}
                        <span className="ml-1">{statusConfig[content.status].label}</span>
                      </Badge>
                      <Badge className={typeConfig[content.type].color}>
                        {typeConfig[content.type].label}
                      </Badge>
                      <Badge className={priorityConfig[content.priority].color}>
                        {priorityConfig[content.priority].label}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {content.excerpt || content.content}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{content.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(content.createdAt)}</span>
                      </div>
                      {content.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{content.viewCount} 次浏览</span>
                        </div>
                      )}
                      {content.scheduledAt && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>定时: {formatDate(content.scheduledAt)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {content.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag.id} variant="secondary" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag.name}
                        </Badge>
                      ))}
                      {content.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{content.tags.length - 3} 更多
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {content.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(content.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          通过
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(content.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          拒绝
                        </Button>
                      </>
                    )}
                    {content.status === 'approved' && (
                      <Button
                        size="sm"
                        onClick={() => handlePublish(content.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        发布
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(content)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      编辑
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(content.id)}
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

        {filteredContents.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                暂无内容
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                没有找到符合条件的内容，请调整筛选条件或创建新内容。
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                新建内容
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}