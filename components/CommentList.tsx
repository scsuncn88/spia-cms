'use client'

import React, { useState } from 'react'
import { MessageSquare, ThumbsUp, ThumbsDown, Eye, MoreHorizontal, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatRelativeTime, cn } from '@/lib/utils'
import { Comment } from '@/types'

interface CommentListProps {
  comments: Comment[]
  onApprove?: (commentId: string) => void
  onReject?: (commentId: string) => void
  onReply?: (commentId: string, content: string) => void
  onView?: (commentId: string) => void
  isLoading?: boolean
}

interface CommentItemProps {
  comment: Comment
  onApprove?: (commentId: string) => void
  onReject?: (commentId: string) => void
  onReply?: (commentId: string, content: string) => void
  onView?: (commentId: string) => void
  isLoading?: boolean
}

const statusConfig = {
  pending: { label: '待审核', color: 'text-yellow-600 bg-yellow-50' },
  approved: { label: '已通过', color: 'text-green-600 bg-green-50' },
  rejected: { label: '已拒绝', color: 'text-red-600 bg-red-50' }
}

function CommentItem({ 
  comment, 
  onApprove, 
  onReject, 
  onReply, 
  onView,
  isLoading = false 
}: CommentItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [showReplyForm, setShowReplyForm] = useState(false)

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply?.(comment.id, replyContent)
      setReplyContent('')
      setShowReplyForm(false)
    }
  }

  const handleView = () => {
    onView?.(comment.id)
    setIsExpanded(true)
  }

  const truncatedContent = comment.content.length > 200 
    ? comment.content.slice(0, 200) + '...'
    : comment.content

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{comment.author.name}</span>
            </div>
            <span className={cn(
              'px-2 py-1 rounded-full text-xs',
              statusConfig[comment.status].color
            )}>
              {statusConfig[comment.status].label}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatRelativeTime(comment.createdAt)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-sm">
          <p className={cn(
            'whitespace-pre-wrap',
            !isExpanded && comment.content.length > 200 && 'text-muted-foreground'
          )}>
            {isExpanded ? comment.content : truncatedContent}
          </p>
          {!isExpanded && comment.content.length > 200 && (
            <button
              onClick={handleView}
              className="text-blue-600 hover:text-blue-800 text-sm mt-1"
            >
              查看全文
            </button>
          )}
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="border-l-2 border-muted pl-4 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {comment.replies.length} 条回复
            </p>
            {comment.replies.map((reply) => (
              <div key={reply.id} className="bg-muted/50 p-3 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-medium">{reply.author.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(reply.createdAt)}
                  </span>
                </div>
                <p className="text-sm">{reply.content}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            {comment.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onApprove?.(comment.id)}
                  disabled={isLoading}
                  className="text-green-600 hover:text-green-700"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  通过
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReject?.(comment.id)}
                  disabled={isLoading}
                  className="text-red-600 hover:text-red-700"
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  拒绝
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowReplyForm(!showReplyForm)}
              disabled={isLoading}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              回复
            </Button>
          </div>

          {!isExpanded && comment.content.length > 200 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleView}
              disabled={isLoading}
            >
              <Eye className="h-4 w-4 mr-1" />
              查看详情
            </Button>
          )}
        </div>

        {showReplyForm && (
          <div className="border-t pt-3 space-y-2">
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="输入回复内容..."
              className="min-h-[80px]"
            />
            <div className="flex justify-end space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowReplyForm(false)}
              >
                取消
              </Button>
              <Button
                size="sm"
                onClick={handleReply}
                disabled={!replyContent.trim() || isLoading}
              >
                发送回复
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function CommentList({ 
  comments, 
  onApprove, 
  onReject, 
  onReply, 
  onView,
  isLoading = false 
}: CommentListProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredComments = comments.filter(comment => {
    const matchesFilter = filter === 'all' || comment.status === filter
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const pendingCount = comments.filter(c => c.status === 'pending').length
  const approvedCount = comments.filter(c => c.status === 'approved').length
  const rejectedCount = comments.filter(c => c.status === 'rejected').length

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            评论管理
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="搜索评论内容或用户名..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                全部 ({comments.length})
              </Button>
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                待审核 ({pendingCount})
              </Button>
              <Button
                variant={filter === 'approved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('approved')}
              >
                已通过 ({approvedCount})
              </Button>
              <Button
                variant={filter === 'rejected' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('rejected')}
              >
                已拒绝 ({rejectedCount})
              </Button>
            </div>
          </div>

          {filteredComments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? '没有找到匹配的评论' : '暂无评论'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onApprove={onApprove}
                  onReject={onReject}
                  onReply={onReply}
                  onView={onView}
                  isLoading={isLoading}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}