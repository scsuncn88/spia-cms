'use client'

import React, { useState } from 'react'
import { MessageSquare, FileText, Clock, User, Star, Filter, Search } from 'lucide-react'
import { CommentList } from '@/components/CommentList'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatDate, formatRelativeTime, cn } from '@/lib/utils'
import { Complaint, Comment } from '@/types'

// Mock 数据
const mockUser = {
  name: '王五',
  role: '客服专员',
  avatar: 'https://via.placeholder.com/32'
}

const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: '候车室空调温度过低',
    content: '今日上午在候车室等车时，空调温度设置过低，感觉非常寒冷，希望能够适当调高温度。',
    category: 'facility',
    status: 'processing',
    priority: 'medium',
    reporter: {
      name: '张先生',
      email: 'zhang@example.com',
      phone: '138****1234'
    },
    assignee: mockUser,
    createdAt: new Date('2024-01-15T09:30:00'),
    updatedAt: new Date('2024-01-15T14:20:00'),
    rating: 4,
    tags: ['空调', '温度', '候车室'],
    attachments: []
  },
  {
    id: '2',
    title: '服务态度问题',
    content: '检票员态度很差，说话很冲，希望能够改善服务态度。',
    category: 'staff',
    status: 'new',
    priority: 'high',
    reporter: {
      name: '李女士',
      email: 'li@example.com',
      phone: '139****5678'
    },
    createdAt: new Date('2024-01-15T16:45:00'),
    updatedAt: new Date('2024-01-15T16:45:00'),
    tags: ['服务态度', '检票员'],
    attachments: []
  },
  {
    id: '3',
    title: '卫生间设施故障',
    content: '2号候车室的卫生间水龙头无法正常使用，请及时维修。',
    category: 'facility',
    status: 'resolved',
    priority: 'medium',
    reporter: {
      name: '刘先生',
      email: 'liu@example.com'
    },
    assignee: mockUser,
    createdAt: new Date('2024-01-14T11:15:00'),
    updatedAt: new Date('2024-01-14T18:30:00'),
    resolvedAt: new Date('2024-01-14T18:30:00'),
    rating: 5,
    tags: ['卫生间', '水龙头', '维修'],
    attachments: []
  }
]

const mockComments: Comment[] = [
  {
    id: '1',
    content: '候车室的空调确实有点冷，建议可以在不同区域设置不同温度。',
    author: {
      id: '1',
      name: '乘客A',
      email: 'passenger1@example.com',
      role: 'admin'
    },
    targetId: '1',
    targetType: 'content',
    status: 'approved',
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00'),
    replies: [
      {
        id: '2',
        content: '感谢您的建议，我们会考虑分区域温控的解决方案。',
        author: mockUser,
        targetId: '1',
        targetType: 'content',
        status: 'approved',
        createdAt: new Date('2024-01-15T10:30:00'),
        updatedAt: new Date('2024-01-15T10:30:00'),
        parentId: '1'
      }
    ]
  },
  {
    id: '3',
    content: '服务人员的态度问题确实需要重视，希望能够加强培训。',
    author: {
      id: '2',
      name: '乘客B',
      email: 'passenger2@example.com',
      role: 'admin'
    },
    targetId: '2',
    targetType: 'content',
    status: 'pending',
    createdAt: new Date('2024-01-15T17:00:00'),
    updatedAt: new Date('2024-01-15T17:00:00')
  }
]

const statusConfig = {
  new: { label: '新投诉', color: 'text-blue-600 bg-blue-50' },
  processing: { label: '处理中', color: 'text-yellow-600 bg-yellow-50' },
  resolved: { label: '已解决', color: 'text-green-600 bg-green-50' },
  closed: { label: '已关闭', color: 'text-gray-600 bg-gray-50' }
}

const categoryConfig = {
  service: { label: '服务质量', color: 'text-purple-600 bg-purple-50' },
  facility: { label: '设施设备', color: 'text-orange-600 bg-orange-50' },
  staff: { label: '工作人员', color: 'text-red-600 bg-red-50' },
  other: { label: '其他', color: 'text-gray-600 bg-gray-50' }
}

const priorityConfig = {
  low: { label: '低', color: 'text-green-600 bg-green-50' },
  medium: { label: '中', color: 'text-yellow-600 bg-yellow-50' },
  high: { label: '高', color: 'text-red-600 bg-red-50' }
}

interface ComplaintTimelineItem {
  id: string
  type: 'created' | 'assigned' | 'updated' | 'resolved' | 'rated'
  title: string
  description: string
  timestamp: Date
  user: string
}

function ComplaintTimeline({ complaintId }: { complaintId: string }) {
  const complaint = mockComplaints.find(c => c.id === complaintId)
  if (!complaint) return null

  const timelineItems: ComplaintTimelineItem[] = [
    {
      id: '1',
      type: 'created',
      title: '投诉提交',
      description: `${complaint.reporter.name} 提交了投诉`,
      timestamp: complaint.createdAt,
      user: complaint.reporter.name
    }
  ]

  if (complaint.assignee) {
    timelineItems.push({
      id: '2',
      type: 'assigned',
      title: '投诉分配',
      description: `投诉已分配给 ${complaint.assignee.name}`,
      timestamp: new Date(complaint.createdAt.getTime() + 30 * 60 * 1000),
      user: '系统'
    })
  }

  if (complaint.status === 'processing') {
    timelineItems.push({
      id: '3',
      type: 'updated',
      title: '开始处理',
      description: `${complaint.assignee?.name} 开始处理投诉`,
      timestamp: complaint.updatedAt,
      user: complaint.assignee?.name || '系统'
    })
  }

  if (complaint.resolvedAt) {
    timelineItems.push({
      id: '4',
      type: 'resolved',
      title: '投诉解决',
      description: '投诉已解决',
      timestamp: complaint.resolvedAt,
      user: complaint.assignee?.name || '系统'
    })
  }

  if (complaint.rating) {
    timelineItems.push({
      id: '5',
      type: 'rated',
      title: '服务评价',
      description: `用户给出 ${complaint.rating} 星评价`,
      timestamp: complaint.resolvedAt || complaint.updatedAt,
      user: complaint.reporter.name
    })
  }

  return (
    <div className="space-y-4">
      {timelineItems.map((item, index) => (
        <div key={item.id} className="flex items-start space-x-3">
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium',
            item.type === 'created' && 'bg-blue-100 text-blue-600',
            item.type === 'assigned' && 'bg-purple-100 text-purple-600',
            item.type === 'updated' && 'bg-yellow-100 text-yellow-600',
            item.type === 'resolved' && 'bg-green-100 text-green-600',
            item.type === 'rated' && 'bg-orange-100 text-orange-600'
          )}>
            {index + 1}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                {formatRelativeTime(item.timestamp)}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <p className="text-xs text-muted-foreground mt-1">
              操作人：{item.user}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ComplaintServiceDemo() {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints)
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'new' | 'processing' | 'resolved'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleComplaintStatusChange = (complaintId: string, newStatus: Complaint['status']) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === complaintId 
        ? { 
            ...complaint, 
            status: newStatus,
            updatedAt: new Date(),
            resolvedAt: newStatus === 'resolved' ? new Date() : complaint.resolvedAt
          }
        : complaint
    ))
  }

  const handleCommentApprove = (commentId: string) => {
    setComments(prev => prev.map(comment =>
      comment.id === commentId
        ? { ...comment, status: 'approved' }
        : comment
    ))
  }

  const handleCommentReject = (commentId: string) => {
    setComments(prev => prev.map(comment =>
      comment.id === commentId
        ? { ...comment, status: 'rejected' }
        : comment
    ))
  }

  const handleCommentReply = (commentId: string, content: string) => {
    const newReply: Comment = {
      id: Date.now().toString(),
      content,
      author: mockUser,
      targetId: commentId,
      targetType: 'content',
      status: 'approved',
      createdAt: new Date(),
      updatedAt: new Date(),
      parentId: commentId
    }

    setComments(prev => prev.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: [...(comment.replies || []), newReply] }
        : comment
    ))
  }

  const handleComplaintReply = async () => {
    if (!selectedComplaint || !replyContent.trim()) return

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟回复功能
    alert(`已向 ${selectedComplaint.reporter.name} 发送回复：\n${replyContent}`)
    setReplyContent('')
    setIsLoading(false)
  }

  const handleRateService = (complaintId: string, rating: number) => {
    setComplaints(prev => prev.map(complaint =>
      complaint.id === complaintId
        ? { ...complaint, rating }
        : complaint
    ))
  }

  const filteredComplaints = complaints.filter(complaint => {
    const matchesFilter = filter === 'all' || complaint.status === filter
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.reporter.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: complaints.length,
    new: complaints.filter(c => c.status === 'new').length,
    processing: complaints.filter(c => c.status === 'processing').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    avgRating: complaints.filter(c => c.rating).reduce((sum, c) => sum + (c.rating || 0), 0) / complaints.filter(c => c.rating).length || 0
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
            <FileText className="h-6 w-6 text-blue-500" />
            投诉与服务管理
          </h1>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">总投诉数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">新投诉</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">处理中</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.processing}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">已解决</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">平均评分</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {stats.avgRating ? stats.avgRating.toFixed(1) : 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 投诉列表 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>投诉列表</CardTitle>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="搜索投诉..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('all')}
                    >
                      全部
                    </Button>
                    <Button
                      variant={filter === 'new' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('new')}
                    >
                      新投诉
                    </Button>
                    <Button
                      variant={filter === 'processing' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('processing')}
                    >
                      处理中
                    </Button>
                    <Button
                      variant={filter === 'resolved' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('resolved')}
                    >
                      已解决
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredComplaints.map((complaint) => (
                    <div 
                      key={complaint.id}
                      className={cn(
                        'border rounded-lg p-4 cursor-pointer transition-colors',
                        selectedComplaint?.id === complaint.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      )}
                      onClick={() => setSelectedComplaint(complaint)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{complaint.title}</h3>
                            <span className={cn(
                              'px-2 py-1 rounded-full text-xs',
                              statusConfig[complaint.status].color
                            )}>
                              {statusConfig[complaint.status].label}
                            </span>
                            <span className={cn(
                              'px-2 py-1 rounded-full text-xs',
                              categoryConfig[complaint.category].color
                            )}>
                              {categoryConfig[complaint.category].label}
                            </span>
                            <span className={cn(
                              'px-2 py-1 rounded-full text-xs',
                              priorityConfig[complaint.priority].color
                            )}>
                              {priorityConfig[complaint.priority].label}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {complaint.content}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>投诉人: {complaint.reporter.name}</span>
                            <span>创建: {formatRelativeTime(complaint.createdAt)}</span>
                            {complaint.assignee && (
                              <span>处理人: {complaint.assignee.name}</span>
                            )}
                            {complaint.rating && (
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-current text-yellow-500" />
                                {complaint.rating}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {complaint.status === 'new' && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleComplaintStatusChange(complaint.id, 'processing')
                              }}
                            >
                              开始处理
                            </Button>
                          )}
                          {complaint.status === 'processing' && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleComplaintStatusChange(complaint.id, 'resolved')
                              }}
                            >
                              标记解决
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 投诉详情 */}
          <div>
            {selectedComplaint ? (
              <Card>
                <CardHeader>
                  <CardTitle>投诉详情</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">{selectedComplaint.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {selectedComplaint.content}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>投诉人：</span>
                        <span>{selectedComplaint.reporter.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>联系方式：</span>
                        <span>{selectedComplaint.reporter.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>创建时间：</span>
                        <span>{formatDate(selectedComplaint.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>处理人：</span>
                        <span>{selectedComplaint.assignee?.name || '未分配'}</span>
                      </div>
                      {selectedComplaint.rating && (
                        <div className="flex justify-between">
                          <span>用户评分：</span>
                          <span className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={cn(
                                  'h-4 w-4',
                                  i < selectedComplaint.rating! ? 'fill-current text-yellow-500' : 'text-gray-300'
                                )}
                              />
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">处理时间轴</h4>
                    <ComplaintTimeline complaintId={selectedComplaint.id} />
                  </div>

                  {selectedComplaint.status === 'resolved' && !selectedComplaint.rating && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">服务评价</h4>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleRateService(selectedComplaint.id, rating)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <Star className="h-5 w-5 text-yellow-500 hover:fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">回复用户</h4>
                    <Textarea
                      placeholder="输入回复内容..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="mb-2"
                    />
                    <Button
                      onClick={handleComplaintReply}
                      disabled={!replyContent.trim() || isLoading}
                      className="w-full"
                    >
                      {isLoading ? '发送中...' : '发送回复'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4" />
                    <p>请选择一个投诉查看详情</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* 评论管理 */}
        <CommentList
          comments={comments}
          onApprove={handleCommentApprove}
          onReject={handleCommentReject}
          onReply={handleCommentReply}
          onView={(commentId) => console.log('查看评论:', commentId)}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}