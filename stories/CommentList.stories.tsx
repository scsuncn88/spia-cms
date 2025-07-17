import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { CommentList } from '@/components/CommentList'
import { Comment } from '@/types'

const mockComments: Comment[] = [
  {
    id: '1',
    content: '这个候车室的空调确实有点冷，建议可以在不同区域设置不同温度。',
    author: {
      id: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      role: 'admin'
    },
    targetId: '1',
    targetType: 'content',
    status: 'pending',
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00'),
  },
  {
    id: '2',
    content: '服务人员的态度问题确实需要重视，希望能够加强培训。这是一个比较长的评论内容，用来测试评论显示的效果。我们需要确保长评论也能正确显示，并且可以正常进行各种操作。',
    author: {
      id: '2',
      name: '李四',
      email: 'lisi@example.com',
      role: 'admin'
    },
    targetId: '2',
    targetType: 'content',
    status: 'approved',
    createdAt: new Date('2024-01-14T16:30:00'),
    updatedAt: new Date('2024-01-14T16:30:00'),
    replies: [
      {
        id: '3',
        content: '感谢您的建议，我们会认真考虑并改进。',
        author: {
          id: '3',
          name: '客服小王',
          email: 'service@example.com',
          role: 'admin'
        },
        targetId: '2',
        targetType: 'content',
        status: 'approved',
        createdAt: new Date('2024-01-14T17:00:00'),
        updatedAt: new Date('2024-01-14T17:00:00'),
        parentId: '2'
      }
    ]
  },
  {
    id: '4',
    content: '这个功能很实用，希望能够继续完善。',
    author: {
      id: '4',
      name: '王五',
      email: 'wangwu@example.com',
      role: 'admin'
    },
    targetId: '3',
    targetType: 'content',
    status: 'rejected',
    createdAt: new Date('2024-01-13T09:15:00'),
    updatedAt: new Date('2024-01-13T09:15:00'),
  }
]

const meta: Meta<typeof CommentList> = {
  title: 'Components/CommentList',
  component: CommentList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    comments: {
      control: 'object',
      description: '评论列表',
    },
    isLoading: {
      control: 'boolean',
      description: '加载状态',
    },
  },
  args: {
    onApprove: fn(),
    onReject: fn(),
    onReply: fn(),
    onView: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    comments: mockComments,
  },
}

export const Empty: Story = {
  args: {
    comments: [],
  },
}

export const Loading: Story = {
  args: {
    comments: mockComments,
    isLoading: true,
  },
}

export const OnlyPending: Story = {
  args: {
    comments: mockComments.filter(comment => comment.status === 'pending'),
  },
}

export const OnlyApproved: Story = {
  args: {
    comments: mockComments.filter(comment => comment.status === 'approved'),
  },
}

export const OnlyRejected: Story = {
  args: {
    comments: mockComments.filter(comment => comment.status === 'rejected'),
  },
}

export const WithLongComments: Story = {
  args: {
    comments: [
      {
        id: '1',
        content: '这是一个非常长的评论内容，用来测试评论组件在处理长文本时的显示效果。我们需要确保长评论可以正确显示，并且可以展开和收起。这个评论应该超过200个字符的限制，从而触发截断和展开功能。希望这个测试案例能够帮助我们验证组件的正确性。',
        author: {
          id: '1',
          name: '测试用户',
          email: 'test@example.com',
          role: 'admin'
        },
        targetId: '1',
        targetType: 'content',
        status: 'pending',
        createdAt: new Date('2024-01-15T10:00:00'),
        updatedAt: new Date('2024-01-15T10:00:00'),
      }
    ],
  },
}