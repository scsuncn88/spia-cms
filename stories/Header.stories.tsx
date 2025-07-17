import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Header } from '@/components/Header'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    user: {
      control: 'object',
      description: '用户信息对象',
    },
  },
  args: {
    onNotificationClick: fn(),
    onSettingsClick: fn(),
    onProfileClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithUser: Story = {
  args: {
    user: {
      name: '张三',
      role: '系统管理员',
      avatar: 'https://via.placeholder.com/32x32/007bff/ffffff?text=张'
    },
  },
}

export const WithLongUserName: Story = {
  args: {
    user: {
      name: '张三四五六七八九十',
      role: '内容管理员',
      avatar: 'https://via.placeholder.com/32x32/28a745/ffffff?text=张'
    },
  },
}

export const AdminUser: Story = {
  args: {
    user: {
      name: '李四',
      role: '超级管理员',
      avatar: 'https://via.placeholder.com/32x32/dc3545/ffffff?text=李'
    },
  },
}

export const EditorUser: Story = {
  args: {
    user: {
      name: '王五',
      role: '内容编辑',
      avatar: 'https://via.placeholder.com/32x32/ffc107/ffffff?text=王'
    },
  },
}