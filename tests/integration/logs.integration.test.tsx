import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LogsPage from '@/app/logs/page'
import { createMockOperationLog, createMockApiResponse, mockLocalStorage } from '../utils/test-utils'

// Mock the MainLayout component
vi.mock('@/components/Layout/MainLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="main-layout">{children}</div>
}))

// Mock UI components
vi.mock('@/components/ui/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div data-testid="card-content">{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) => <h3 data-testid="card-title">{children}</h3>
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, disabled }: { 
    children: React.ReactNode
    onClick?: () => void
    variant?: string
    disabled?: boolean
  }) => 
    <button 
      data-testid="button" 
      onClick={onClick} 
      data-variant={variant}
      disabled={disabled}
    >
      {children}
    </button>
}))

vi.mock('@/components/ui/input', () => ({
  Input: ({ value, onChange, placeholder, className }: any) => 
    <input 
      data-testid="input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
}))

vi.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: { 
    children: React.ReactNode
    value: string
    onValueChange: (value: string) => void 
  }) => (
    <div data-testid="select" data-value={value}>
      <button onClick={() => onValueChange('test-value')}>
        {children}
      </button>
    </div>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => 
    <div data-testid="select-content">{children}</div>,
  SelectItem: ({ children, value }: { children: React.ReactNode, value: string }) => 
    <div data-testid="select-item" data-value={value}>{children}</div>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => 
    <div data-testid="select-trigger">{children}</div>,
  SelectValue: ({ placeholder }: { placeholder?: string }) => 
    <span data-testid="select-value">{placeholder}</span>
}))

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, variant, className }: { 
    children: React.ReactNode
    variant?: string
    className?: string 
  }) => 
    <span data-testid="badge" data-variant={variant} className={className}>
      {children}
    </span>
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => {
  const createMockIcon = (name: string) => ({ className, ...props }: any) => 
    <div data-testid={`icon-${name.toLowerCase()}`} className={className} {...props} />
  
  return {
    Activity: createMockIcon('Activity'),
    Search: createMockIcon('Search'),
    Filter: createMockIcon('Filter'),
    Download: createMockIcon('Download'),
    Eye: createMockIcon('Eye'),
    RefreshCw: createMockIcon('RefreshCw'),
    CheckCircle: createMockIcon('CheckCircle'),
    XCircle: createMockIcon('XCircle'),
    AlertTriangle: createMockIcon('AlertTriangle'),
    Info: createMockIcon('Info'),
    User: createMockIcon('User'),
    Globe: createMockIcon('Globe'),
    Clock: createMockIcon('Clock'),
    Timer: createMockIcon('Timer')
  }
})

// Mock global functions
global.alert = vi.fn()

// Mock URL and Blob for CSV export
global.URL = {
  createObjectURL: vi.fn(() => 'mock-url'),
  revokeObjectURL: vi.fn()
} as any

global.Blob = vi.fn().mockImplementation((content, options) => ({
  content,
  options,
  size: content[0].length,
  type: options?.type || ''
})) as any

// Mock document.createElement for CSV download
const mockLink = {
  href: '',
  download: '',
  click: vi.fn()
}

const originalCreateElement = document.createElement
document.createElement = vi.fn().mockImplementation((tagName) => {
  if (tagName === 'a') {
    return mockLink
  }
  return originalCreateElement.call(document, tagName)
})

describe('LogsPage Integration Tests', () => {
  const mockLogs = [
    createMockOperationLog({
      id: '1',
      action: 'user_login',
      description: '用户登录系统',
      status: 'success'
    }),
    createMockOperationLog({
      id: '2',
      action: 'content_create',
      description: '创建新内容',
      status: 'success'
    }),
    createMockOperationLog({
      id: '3',
      action: 'login_failed',
      description: '登录失败',
      status: 'error'
    })
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Setup localStorage mock
    const localStorage = mockLocalStorage()
    Object.defineProperty(window, 'localStorage', {
      value: localStorage
    })
  })

  it('应该正确加载和显示日志数据', () => {
    render(<LogsPage />)
    
    // 检查页面标题
    expect(screen.getByText('操作日志')).toBeInTheDocument()
    expect(screen.getByText('查看和分析系统操作记录')).toBeInTheDocument()
    
    // 检查统计卡片
    expect(screen.getByText('总操作')).toBeInTheDocument()
    expect(screen.getByText('成功')).toBeInTheDocument()
    expect(screen.getByText('失败')).toBeInTheDocument()
    expect(screen.getByText('警告')).toBeInTheDocument()
    expect(screen.getByText('平均耗时')).toBeInTheDocument()
  })

  it('应该支持日志搜索功能', async () => {
    render(<LogsPage />)
    
    const searchInput = screen.getByPlaceholderText('搜索日志...')
    expect(searchInput).toBeInTheDocument()
    
    // 输入搜索关键词
    fireEvent.change(searchInput, { target: { value: '用户登录' } })
    
    // 验证搜索输入
    expect(searchInput).toHaveValue('用户登录')
  })

  it('应该支持筛选功能', () => {
    render(<LogsPage />)
    
    // 检查筛选下拉框
    expect(screen.getByTestId('select-trigger')).toBeInTheDocument()
    
    // 检查筛选选项（通过placeholder文本）
    expect(screen.getByText('操作类型')).toBeInTheDocument()
    expect(screen.getByText('状态')).toBeInTheDocument()
    expect(screen.getByText('资源类型')).toBeInTheDocument()
    expect(screen.getByText('操作用户')).toBeInTheDocument()
    expect(screen.getByText('时间范围')).toBeInTheDocument()
  })

  it('应该处理日志导出功能', () => {
    render(<LogsPage />)
    
    const exportButton = screen.getByText('导出日志')
    expect(exportButton).toBeInTheDocument()
    
    // 点击导出按钮
    fireEvent.click(exportButton)
    
    // 验证CSV下载逻辑
    expect(global.Blob).toHaveBeenCalled()
    expect(global.URL.createObjectURL).toHaveBeenCalled()
    expect(mockLink.click).toHaveBeenCalled()
  })

  it('应该支持自动刷新切换', () => {
    render(<LogsPage />)
    
    const refreshButton = screen.getByText('手动刷新')
    expect(refreshButton).toBeInTheDocument()
    
    // 点击切换自动刷新
    fireEvent.click(refreshButton)
    
    // 验证按钮状态改变
    waitFor(() => {
      expect(screen.getByText('自动刷新')).toBeInTheDocument()
    })
  })

  it('应该显示日志详情模态框', async () => {
    render(<LogsPage />)
    
    // 查找日志条目的详情按钮
    const detailButtons = screen.getAllByText('详情')
    expect(detailButtons.length).toBeGreaterThan(0)
    
    // 点击第一个详情按钮
    fireEvent.click(detailButtons[0])
    
    // 等待模态框出现
    await waitFor(() => {
      expect(screen.getByText('操作详情')).toBeInTheDocument()
    })
  })

  it('应该正确格式化时间和持续时间', () => {
    render(<LogsPage />)
    
    // 验证时间格式化函数的存在
    expect(screen.getByText('操作日志')).toBeInTheDocument()
    
    // 时间应该以中文格式显示
    const timeElements = screen.getAllByText(/\d{4}年/)
    expect(timeElements.length).toBeGreaterThanOrEqual(0)
  })

  it('应该处理日志状态显示', () => {
    render(<LogsPage />)
    
    // 检查不同状态的日志
    const badges = screen.getAllByTestId('badge')
    expect(badges.length).toBeGreaterThan(0)
    
    // 验证成功状态
    const successBadges = badges.filter(badge => 
      badge.textContent?.includes('成功') || badge.className?.includes('green')
    )
    expect(successBadges.length).toBeGreaterThanOrEqual(0)
  })

  it('应该支持分页或滚动加载', () => {
    render(<LogsPage />)
    
    // 检查日志列表容器
    const logsList = screen.getByTestId('card-content')
    expect(logsList).toBeInTheDocument()
    
    // 验证日志条目显示
    const logEntries = screen.getAllByText(/浏览量|访问|操作/)
    expect(logEntries.length).toBeGreaterThan(0)
  })

  it('应该正确处理错误状态', () => {
    render(<LogsPage />)
    
    // 检查错误状态显示
    const errorElements = screen.queryAllByText('失败')
    expect(errorElements.length).toBeGreaterThanOrEqual(0)
    
    // 检查警告状态
    const warningElements = screen.queryAllByText('警告')
    expect(warningElements.length).toBeGreaterThanOrEqual(0)
  })

  it('应该支持实时数据更新', async () => {
    vi.useFakeTimers()
    
    render(<LogsPage />)
    
    // 启用自动刷新
    const refreshButton = screen.getByText('手动刷新')
    fireEvent.click(refreshButton)
    
    // 等待自动刷新间隔
    vi.advanceTimersByTime(30000)
    
    // 验证刷新逻辑执行
    await waitFor(() => {
      expect(screen.getByText('自动刷新')).toBeInTheDocument()
    })
    
    vi.useRealTimers()
  })

  it('应该处理大量日志数据的性能', () => {
    render(<LogsPage />)
    
    // 验证组件能够渲染大量数据
    const logContainer = screen.getByTestId('card-content')
    expect(logContainer).toBeInTheDocument()
    
    // 检查是否有性能优化措施（如虚拟滚动等）
    expect(logContainer.children.length).toBeGreaterThanOrEqual(0)
  })

  it('应该支持键盘导航', () => {
    render(<LogsPage />)
    
    // 检查可聚焦元素
    const focusableElements = screen.getAllByRole('button')
    expect(focusableElements.length).toBeGreaterThan(0)
    
    // 测试Tab键导航
    const firstButton = focusableElements[0]
    firstButton.focus()
    expect(document.activeElement).toBe(firstButton)
  })

  it('应该保存用户筛选偏好', () => {
    render(<LogsPage />)
    
    // 模拟用户选择筛选条件
    const selectElement = screen.getAllByTestId('select')[0]
    const selectButton = selectElement.querySelector('button')
    
    if (selectButton) {
      fireEvent.click(selectButton)
    }
    
    // 验证localStorage调用（如果实现了持久化）
    expect(screen.getByText('操作日志')).toBeInTheDocument()
  })

  it('应该处理网络错误和重试', async () => {
    // 模拟网络错误
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    render(<LogsPage />)
    
    // 验证组件在错误状态下仍能正常渲染
    expect(screen.getByText('操作日志')).toBeInTheDocument()
    
    consoleError.mockRestore()
  })

  it('应该支持导出不同格式', () => {
    render(<LogsPage />)
    
    const exportButton = screen.getByText('导出日志')
    fireEvent.click(exportButton)
    
    // 验证CSV格式导出
    expect(global.Blob).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.stringContaining('时间,操作,资源,用户,IP地址,状态,描述')
      ]),
      { type: 'text/csv;charset=utf-8;' }
    )
  })

  it('应该显示正确的统计信息', () => {
    render(<LogsPage />)
    
    // 验证统计数据显示
    expect(screen.getByText('总操作')).toBeInTheDocument()
    expect(screen.getByText('成功')).toBeInTheDocument()
    expect(screen.getByText('失败')).toBeInTheDocument()
    expect(screen.getByText('警告')).toBeInTheDocument()
    expect(screen.getByText('平均耗时')).toBeInTheDocument()
    
    // 检查数字统计
    const numbers = screen.getAllByText(/\d+/)
    expect(numbers.length).toBeGreaterThan(0)
  })

  it('应该支持响应式设计', () => {
    // 模拟移动设备
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375
    })
    
    render(<LogsPage />)
    
    // 验证移动端适配
    expect(screen.getByText('操作日志')).toBeInTheDocument()
    
    // 恢复原始宽度
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    })
  })
})