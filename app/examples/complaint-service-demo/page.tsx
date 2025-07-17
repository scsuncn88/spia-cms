'use client'

import React, { useState } from 'react'
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ArrowRight,
  FileText,
  Calendar,
  Tag,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  AlertCircle,
  Users,
  Settings,
  Zap,
  Timer,
  Activity,
  TrendingUp,
  BarChart3
} from 'lucide-react'
import MainLayout from '@/components/Layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Complaint, TimelineEvent } from '@/types'
import { mockUser } from '@/lib/permissions'

// Mock data for complaints
const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: '安检效率问题',
    description: '今天上午10点在T2航站楼安检处排队超过1小时，严重影响了行程安排。安检人员态度较差，希望能够改善服务质量。',
    category: 'service',
    subcategory: '安全检查',
    severity: 'high',
    status: 'assigned',
    priority: 'high',
    source: 'mobile',
    reporter: {
      name: '张先生',
      email: 'zhang@example.com',
      phone: '+86 138 0000 0001',
      id: 'P001',
      type: 'passenger'
    },
    assignee: mockUser,
    watchers: [mockUser],
    location: {
      terminal: 'T2',
      floor: '2F',
      area: '安检区域',
      gate: 'A12',
      coordinates: [121.8057, 31.1443]
    },
    timeline: [
      {
        id: '1',
        type: 'created',
        user: mockUser,
        description: '投诉已创建',
        timestamp: new Date('2024-01-15T10:30:00'),
        visibility: 'public'
      },
      {
        id: '2',
        type: 'assigned',
        user: mockUser,
        description: '已分配给客服专员处理',
        timestamp: new Date('2024-01-15T10:35:00'),
        visibility: 'internal'
      },
      {
        id: '3',
        type: 'commented',
        user: mockUser,
        description: '已联系安检部门调查此事',
        timestamp: new Date('2024-01-15T11:00:00'),
        visibility: 'public'
      }
    ],
    attachments: [],
    tags: [
      { id: '1', name: '安检', slug: 'security-check', count: 25, createdAt: new Date(), updatedAt: new Date() },
      { id: '2', name: '效率', slug: 'efficiency', count: 18, createdAt: new Date(), updatedAt: new Date() },
      { id: '3', name: '服务态度', slug: 'service-attitude', count: 32, createdAt: new Date(), updatedAt: new Date() }
    ],
    metadata: {
      escalationLevel: 1,
      businessImpact: 'medium',
      customerTier: 'standard',
      relatedComplaints: ['2', '3'],
      rootCause: '人员配置不足',
      compensationOffered: '无'
    },
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T11:00:00'),
    resolvedAt: undefined,
    closedAt: undefined,
    sla: {
      responseTime: 4,
      resolutionTime: 24,
      escalationThreshold: 72,
      breached: false,
      remainingTime: 20
    }
  },
  {
    id: '2',
    title: '餐厅服务质量差',
    description: '在T1航站楼3层的餐厅用餐，服务员态度恶劣，食物质量很差，价格却很高。作为机场的配套服务，这样的质量完全不能接受。',
    category: 'facility',
    subcategory: '餐饮服务',
    severity: 'medium',
    status: 'in-progress',
    priority: 'medium',
    source: 'web',
    reporter: {
      name: '李女士',
      email: 'li@example.com',
      phone: '+86 138 0000 0002',
      id: 'P002',
      type: 'passenger'
    },
    assignee: mockUser,
    watchers: [mockUser],
    location: {
      terminal: 'T1',
      floor: '3F',
      area: '餐饮区',
      coordinates: [121.8057, 31.1443]
    },
    timeline: [
      {
        id: '1',
        type: 'created',
        user: mockUser,
        description: '投诉已创建',
        timestamp: new Date('2024-01-14T14:20:00'),
        visibility: 'public'
      },
      {
        id: '2',
        type: 'assigned',
        user: mockUser,
        description: '已分配给餐饮部门处理',
        timestamp: new Date('2024-01-14T14:25:00'),
        visibility: 'internal'
      },
      {
        id: '3',
        type: 'updated',
        user: mockUser,
        description: '已与餐厅经理沟通，正在调查',
        timestamp: new Date('2024-01-14T16:00:00'),
        visibility: 'public'
      }
    ],
    attachments: [],
    tags: [
      { id: '4', name: '餐饮', slug: 'dining', count: 45, createdAt: new Date(), updatedAt: new Date() },
      { id: '5', name: '服务质量', slug: 'service-quality', count: 28, createdAt: new Date(), updatedAt: new Date() },
      { id: '6', name: '价格', slug: 'price', count: 15, createdAt: new Date(), updatedAt: new Date() }
    ],
    metadata: {
      escalationLevel: 0,
      businessImpact: 'low',
      customerTier: 'premium',
      relatedComplaints: [],
      rootCause: '餐厅管理不善'
    },
    createdAt: new Date('2024-01-14T14:20:00'),
    updatedAt: new Date('2024-01-14T16:00:00'),
    resolvedAt: undefined,
    closedAt: undefined,
    sla: {
      responseTime: 2,
      resolutionTime: 48,
      escalationThreshold: 72,
      breached: false,
      remainingTime: 32
    }
  },
  {
    id: '3',
    title: '行李托运问题',
    description: '行李托运后在目的地机场没有找到，工作人员态度消极，没有及时处理。现在已经过去3天了还没有消息，严重影响了我的旅行计划。',
    category: 'staff',
    subcategory: '行李服务',
    severity: 'critical',
    status: 'resolved',
    priority: 'urgent',
    source: 'phone',
    reporter: {
      name: '王先生',
      email: 'wang@example.com',
      phone: '+86 138 0000 0003',
      id: 'P003',
      type: 'passenger'
    },
    assignee: mockUser,
    watchers: [mockUser],
    location: {
      terminal: 'T2',
      floor: '1F',
      area: '行李托运区',
      coordinates: [121.8057, 31.1443]
    },
    timeline: [
      {
        id: '1',
        type: 'created',
        user: mockUser,
        description: '投诉已创建',
        timestamp: new Date('2024-01-12T09:00:00'),
        visibility: 'public'
      },
      {
        id: '2',
        type: 'assigned',
        user: mockUser,
        description: '已分配给行李服务部门处理',
        timestamp: new Date('2024-01-12T09:05:00'),
        visibility: 'internal'
      },
      {
        id: '3',
        type: 'updated',
        user: mockUser,
        description: '已联系目的地机场，正在追踪行李',
        timestamp: new Date('2024-01-12T10:00:00'),
        visibility: 'public'
      },
      {
        id: '4',
        type: 'resolved',
        user: mockUser,
        description: '行李已找到并送达客户住处',
        timestamp: new Date('2024-01-15T14:30:00'),
        visibility: 'public'
      }
    ],
    attachments: [],
    tags: [
      { id: '7', name: '行李', slug: 'luggage', count: 20, createdAt: new Date(), updatedAt: new Date() },
      { id: '8', name: '托运', slug: 'check-in', count: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: '9', name: '丢失', slug: 'lost', count: 8, createdAt: new Date(), updatedAt: new Date() }
    ],
    metadata: {
      escalationLevel: 2,
      businessImpact: 'high',
      customerTier: 'vip',
      relatedComplaints: [],
      rootCause: '行李追踪系统故障',
      compensationOffered: '200元代金券'
    },
    resolution: {
      solution: '通过与目的地机场协调，成功找回行李并安排专人送达',
      category: '服务补救',
      preventiveMeasures: '加强行李追踪系统维护',
      followUpRequired: true,
      followUpDate: new Date('2024-01-22T14:30:00'),
      satisfactionRating: 4,
      internalNotes: '客户对处理结果满意'
    },
    feedback: {
      rating: 4,
      comment: '虽然问题解决了，但希望以后不要再出现这样的问题',
      helpful: true,
      anonymous: false,
      createdAt: new Date('2024-01-15T15:00:00')
    },
    createdAt: new Date('2024-01-12T09:00:00'),
    updatedAt: new Date('2024-01-15T15:00:00'),
    resolvedAt: new Date('2024-01-15T14:30:00'),
    closedAt: new Date('2024-01-15T15:00:00'),
    sla: {
      responseTime: 0.1,
      resolutionTime: 77,
      escalationThreshold: 72,
      breached: true,
      remainingTime: 0
    }
  }
]

const categoryConfig = {
  service: { label: '服务', color: 'bg-blue-100 text-blue-800', icon: Settings },
  facility: { label: '设施', color: 'bg-green-100 text-green-800', icon: MapPin },
  staff: { label: '员工', color: 'bg-purple-100 text-purple-800', icon: Users },
  system: { label: '系统', color: 'bg-gray-100 text-gray-800', icon: Settings },
  safety: { label: '安全', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
  other: { label: '其他', color: 'bg-yellow-100 text-yellow-800', icon: FileText }
}

const severityConfig = {
  low: { label: '低', color: 'bg-gray-100 text-gray-600', icon: MessageCircle },
  medium: { label: '中', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
  high: { label: '高', color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
  critical: { label: '严重', color: 'bg-red-100 text-red-800', icon: Zap }
}

const statusConfig = {
  new: { label: '新建', color: 'bg-blue-100 text-blue-800', icon: Plus },
  assigned: { label: '已分配', color: 'bg-purple-100 text-purple-800', icon: User },
  'in-progress': { label: '处理中', color: 'bg-yellow-100 text-yellow-800', icon: Activity },
  resolved: { label: '已解决', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  closed: { label: '已关闭', color: 'bg-gray-100 text-gray-600', icon: XCircle },
  escalated: { label: '已升级', color: 'bg-red-100 text-red-800', icon: TrendingUp }
}

const priorityConfig = {
  low: { label: '低', color: 'bg-gray-100 text-gray-600' },
  medium: { label: '中', color: 'bg-blue-100 text-blue-800' },
  high: { label: '高', color: 'bg-orange-100 text-orange-800' },
  urgent: { label: '紧急', color: 'bg-red-100 text-red-800' }
}

const sourceConfig = {
  web: { label: '网站', icon: MessageSquare },
  mobile: { label: '移动端', icon: Phone },
  email: { label: '邮件', icon: Mail },
  phone: { label: '电话', icon: Phone },
  'walk-in': { label: '现场', icon: MapPin }
}

export default function ComplaintServiceDemo() {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter
    const matchesSeverity = severityFilter === 'all' || complaint.severity === severityFilter
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesSeverity && matchesStatus
  })

  const handleAssign = (complaintId: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === complaintId 
        ? { 
            ...complaint, 
            status: 'assigned',
            assignee: mockUser,
            updatedAt: new Date(),
            timeline: [
              ...complaint.timeline,
              {
                id: Date.now().toString(),
                type: 'assigned',
                user: mockUser,
                description: '投诉已分配给当前用户处理',
                timestamp: new Date(),
                visibility: 'internal'
              }
            ]
          }
        : complaint
    ))
  }

  const handleUpdateStatus = (complaintId: string, newStatus: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === complaintId 
        ? { 
            ...complaint, 
            status: newStatus as any,
            updatedAt: new Date(),
            resolvedAt: newStatus === 'resolved' ? new Date() : complaint.resolvedAt,
            closedAt: newStatus === 'closed' ? new Date() : complaint.closedAt,
            timeline: [
              ...complaint.timeline,
              {
                id: Date.now().toString(),
                type: 'updated',
                user: mockUser,
                description: `状态更新为: ${statusConfig[newStatus as keyof typeof statusConfig].label}`,
                timestamp: new Date(),
                visibility: 'public'
              }
            ]
          }
        : complaint
    ))
  }

  const handleDelete = (complaintId: string) => {
    if (confirm('确定要删除此投诉吗？')) {
      setComplaints(prev => prev.filter(c => c.id !== complaintId))
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
    const IconComponent = config[key]?.icon || MessageSquare
    return <IconComponent className="w-4 h-4" />
  }

  const getSLAProgress = (sla: any) => {
    const totalTime = sla.responseTime + sla.resolutionTime
    const usedTime = totalTime - sla.remainingTime
    return (usedTime / totalTime) * 100
  }

  const getSLAStatus = (sla: any) => {
    if (sla.breached) return { label: '已超期', color: 'text-red-600' }
    if (sla.remainingTime < 4) return { label: '即将超期', color: 'text-orange-600' }
    return { label: '正常', color: 'text-green-600' }
  }

  return (
    <MainLayout>
      <div className="container-dashboard py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              投诉服务管理
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              处理和跟踪旅客投诉，提升服务质量
            </p>
          </div>
          <Button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            新建投诉
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">总投诉</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{complaints.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">处理中</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {complaints.filter(c => c.status === 'in-progress').length}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">已解决</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {complaints.filter(c => c.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">超期</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {complaints.filter(c => c.sla.breached).length}
                  </p>
                </div>
                <Timer className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索投诉..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="类别筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类别</SelectItem>
                  <SelectItem value="service">服务</SelectItem>
                  <SelectItem value="facility">设施</SelectItem>
                  <SelectItem value="staff">员工</SelectItem>
                  <SelectItem value="system">系统</SelectItem>
                  <SelectItem value="safety">安全</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="严重程度筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部严重程度</SelectItem>
                  <SelectItem value="low">低</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="high">高</SelectItem>
                  <SelectItem value="critical">严重</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="new">新建</SelectItem>
                  <SelectItem value="assigned">已分配</SelectItem>
                  <SelectItem value="in-progress">处理中</SelectItem>
                  <SelectItem value="resolved">已解决</SelectItem>
                  <SelectItem value="closed">已关闭</SelectItem>
                  <SelectItem value="escalated">已升级</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                高级筛选
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Complaints List */}
        <div className="grid gap-4">
          {filteredComplaints.map((complaint) => (
            <Card key={complaint.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {complaint.title}
                      </h3>
                      <Badge className={statusConfig[complaint.status].color}>
                        {getIcon(statusConfig, complaint.status)}
                        <span className="ml-1">{statusConfig[complaint.status].label}</span>
                      </Badge>
                      <Badge className={categoryConfig[complaint.category].color}>
                        {getIcon(categoryConfig, complaint.category)}
                        <span className="ml-1">{categoryConfig[complaint.category].label}</span>
                      </Badge>
                      <Badge className={severityConfig[complaint.severity].color}>
                        {getIcon(severityConfig, complaint.severity)}
                        <span className="ml-1">{severityConfig[complaint.severity].label}</span>
                      </Badge>
                      <Badge className={priorityConfig[complaint.priority].color}>
                        {priorityConfig[complaint.priority].label}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {complaint.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>投诉人: {complaint.reporter.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>{complaint.reporter.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{complaint.location?.terminal} {complaint.location?.area}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>创建: {formatDate(complaint.createdAt)}</span>
                        </div>
                        {complaint.assignee && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>处理人: {complaint.assignee.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* SLA Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">SLA进度</span>
                        <span className={`text-sm font-medium ${getSLAStatus(complaint.sla).color}`}>
                          {getSLAStatus(complaint.sla).label}
                        </span>
                      </div>
                      <Progress value={getSLAProgress(complaint.sla)} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>剩余时间: {complaint.sla.remainingTime}小时</span>
                        <span>目标: {complaint.sla.resolutionTime}小时</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      {complaint.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag.id} variant="secondary" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag.name}
                        </Badge>
                      ))}
                      {complaint.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{complaint.tags.length - 3} 更多
                        </span>
                      )}
                    </div>

                    {/* Resolution & Feedback */}
                    {complaint.resolution && (
                      <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800 dark:text-green-200">
                            解决方案
                          </span>
                        </div>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {complaint.resolution.solution}
                        </p>
                        {complaint.feedback && (
                          <div className="mt-2 pt-2 border-t border-green-200 dark:border-green-700">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">满意度: {complaint.feedback.rating}/5</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                "{complaint.feedback.comment}"
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {complaint.status === 'new' && (
                      <Button
                        size="sm"
                        onClick={() => handleAssign(complaint.id)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <User className="w-4 h-4 mr-1" />
                        分配
                      </Button>
                    )}
                    {complaint.status === 'assigned' && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(complaint.id, 'in-progress')}
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        <Activity className="w-4 h-4 mr-1" />
                        开始处理
                      </Button>
                    )}
                    {complaint.status === 'in-progress' && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(complaint.id, 'resolved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        解决
                      </Button>
                    )}
                    {complaint.status === 'resolved' && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(complaint.id, 'closed')}
                        className="bg-gray-600 hover:bg-gray-700"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        关闭
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedComplaint(complaint)
                        setShowDetails(true)
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      详情
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(complaint.id)}
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

        {filteredComplaints.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                暂无投诉
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                没有找到符合条件的投诉，请调整筛选条件。
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                新建投诉
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Complaint Details Modal */}
        {showDetails && selectedComplaint && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    投诉详情
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
                    <h4 className="font-medium mb-3">基本信息</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">标题</label>
                        <p className="text-sm">{selectedComplaint.title}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">状态</label>
                        <p className="text-sm">
                          <Badge className={statusConfig[selectedComplaint.status].color}>
                            {statusConfig[selectedComplaint.status].label}
                          </Badge>
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">类别</label>
                        <p className="text-sm">{selectedComplaint.subcategory}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">严重程度</label>
                        <p className="text-sm">
                          <Badge className={severityConfig[selectedComplaint.severity].color}>
                            {severityConfig[selectedComplaint.severity].label}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-medium mb-3">投诉内容</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {selectedComplaint.description}
                    </p>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h4 className="font-medium mb-3">处理时间线</h4>
                    <div className="space-y-3">
                      {selectedComplaint.timeline.map((event, index) => (
                        <div key={event.id} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">{event.description}</span>
                              <Badge variant="outline" className="text-xs">
                                {event.visibility === 'public' ? '公开' : '内部'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{event.user.name}</span>
                              <span>•</span>
                              <span>{formatDate(event.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  )
}