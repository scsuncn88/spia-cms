import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ContentForm } from '@/components/ContentForm'

const meta: Meta<typeof ContentForm> = {
  title: 'Components/ContentForm',
  component: ContentForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: '加载状态',
    },
    initialData: {
      control: 'object',
      description: '初始数据',
    },
  },
  args: {
    onSubmit: fn(),
    onPreview: fn(),
    onSave: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithInitialData: Story = {
  args: {
    initialData: {
      title: '春运出行提醒',
      content: '亲爱的旅客朋友们，春运即将开始，请提前做好出行准备。',
      type: 'notice',
      tags: ['春运', '出行', '提醒'],
      images: [],
      videos: [],
      priority: 'high',
    },
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    initialData: {
      title: '正在发布的内容',
      content: '这是一个正在发布的内容示例。',
      type: 'article',
      tags: ['示例'],
      images: [],
      videos: [],
      priority: 'medium',
    },
  },
}

export const ArticleType: Story = {
  args: {
    initialData: {
      title: '旅游指南文章',
      content: '这是一篇关于旅游的详细指南文章，包含了各种实用信息。',
      type: 'article',
      tags: ['旅游', '指南', '攻略'],
      images: [],
      videos: [],
      priority: 'low',
    },
  },
}

export const AnnouncementType: Story = {
  args: {
    initialData: {
      title: '重要系统公告',
      content: '系统将于本周末进行维护升级，请用户提前做好准备。',
      type: 'announcement',
      tags: ['系统', '维护', '公告'],
      images: [],
      videos: [],
      priority: 'high',
    },
  },
}

export const WithScheduled: Story = {
  args: {
    initialData: {
      title: '定时发布的内容',
      content: '这是一个设置了定时发布的内容示例。',
      type: 'notice',
      tags: ['定时', '发布'],
      images: [],
      videos: [],
      priority: 'medium',
      scheduledAt: new Date('2024-02-01T09:00:00'),
    },
  },
}