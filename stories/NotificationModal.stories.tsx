import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { NotificationModal } from '@/components/NotificationModal'

const meta: Meta<typeof NotificationModal> = {
  title: 'Components/NotificationModal',
  component: NotificationModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '模态框是否打开',
    },
    isLoading: {
      control: 'boolean',
      description: '加载状态',
    },
  },
  args: {
    onClose: fn(),
    onSubmit: fn(),
    onConfirm: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
  },
}

export const Loading: Story = {
  args: {
    isOpen: true,
    isLoading: true,
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
  },
}

// 由于模态框的交互性，这里提供一个可以操作的版本
export const Interactive: Story = {
  args: {
    isOpen: true,
  },
  play: async ({ args }) => {
    // 这里可以添加一些交互测试
    console.log('NotificationModal opened')
  },
}