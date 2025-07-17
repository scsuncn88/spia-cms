import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from '@/components/Header'

describe('Header', () => {
  const mockUser = {
    name: '测试用户',
    avatar: 'https://example.com/avatar.jpg',
    role: '管理员'
  }

  it('应该正确渲染标题', () => {
    render(<Header />)
    expect(screen.getByText('小程序旅客服务管理平台')).toBeInTheDocument()
  })

  it('应该正确渲染用户信息', () => {
    render(<Header user={mockUser} />)
    expect(screen.getByText('测试用户')).toBeInTheDocument()
    expect(screen.getByText('管理员')).toBeInTheDocument()
  })

  it('应该渲染搜索框', () => {
    render(<Header />)
    expect(screen.getByPlaceholderText('搜索内容、投诉、通知...')).toBeInTheDocument()
  })

  it('应该正确处理通知按钮点击', () => {
    const mockOnNotificationClick = vi.fn()
    render(<Header onNotificationClick={mockOnNotificationClick} />)
    
    const notificationButton = screen.getByRole('button', { name: '通知' })
    fireEvent.click(notificationButton)
    
    expect(mockOnNotificationClick).toHaveBeenCalledTimes(1)
  })

  it('应该正确处理设置按钮点击', () => {
    const mockOnSettingsClick = vi.fn()
    render(<Header onSettingsClick={mockOnSettingsClick} />)
    
    const settingsButton = screen.getByRole('button', { name: '设置' })
    fireEvent.click(settingsButton)
    
    expect(mockOnSettingsClick).toHaveBeenCalledTimes(1)
  })

  it('应该正确处理用户资料按钮点击', () => {
    const mockOnProfileClick = vi.fn()
    render(<Header onProfileClick={mockOnProfileClick} />)
    
    const profileButton = screen.getByRole('button', { name: '用户资料' })
    fireEvent.click(profileButton)
    
    expect(mockOnProfileClick).toHaveBeenCalledTimes(1)
  })

  it('应该在移动端隐藏用户信息文本', () => {
    render(<Header user={mockUser} />)
    const userInfoDiv = screen.getByText('测试用户').parentElement
    expect(userInfoDiv).toHaveClass('hidden', 'md:block')
  })
})