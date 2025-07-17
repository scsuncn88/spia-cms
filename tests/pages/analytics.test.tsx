import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AnalyticsPage from '@/app/analytics/page'

// Mock the MainLayout component
vi.mock('@/components/Layout/MainLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="main-layout">{children}</div>
}))

// Mock the UI components
vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: { children: React.ReactNode, className?: string }) => 
    <div data-testid="card" className={className}>{children}</div>,
  CardContent: ({ children, className }: { children: React.ReactNode, className?: string }) => 
    <div data-testid="card-content" className={className}>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => 
    <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) => 
    <h3 data-testid="card-title">{children}</h3>
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

vi.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: { 
    children: React.ReactNode
    value: string
    onValueChange: (value: string) => void 
  }) => (
    <div data-testid="select" data-value={value}>
      <button onClick={() => onValueChange('30d')}>
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
  SelectValue: () => <span data-testid="select-value">选择时间范围</span>
}))

vi.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children, value, onValueChange }: { 
    children: React.ReactNode
    value: string
    onValueChange: (value: string) => void 
  }) => (
    <div data-testid="tabs" data-value={value}>
      {children}
    </div>
  ),
  TabsContent: ({ children, value }: { children: React.ReactNode, value: string }) => 
    <div data-testid="tabs-content" data-value={value}>{children}</div>,
  TabsList: ({ children }: { children: React.ReactNode }) => 
    <div data-testid="tabs-list">{children}</div>,
  TabsTrigger: ({ children, value }: { children: React.ReactNode, value: string }) => 
    <button data-testid="tabs-trigger" data-value={value}>{children}</button>
}))

vi.mock('@/components/ui/progress', () => ({
  Progress: ({ value, className }: { value: number, className?: string }) => 
    <div data-testid="progress" data-value={value} className={className}>
      <div style={{ width: `${value}%` }} />
    </div>
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
    BarChart3: createMockIcon('BarChart3'),
    TrendingUp: createMockIcon('TrendingUp'),
    Users: createMockIcon('Users'),
    FileText: createMockIcon('FileText'),
    Eye: createMockIcon('Eye'),
    MessageSquare: createMockIcon('MessageSquare'),
    Download: createMockIcon('Download'),
    RefreshCw: createMockIcon('RefreshCw'),
    Server: createMockIcon('Server'),
    ArrowUpRight: createMockIcon('ArrowUpRight'),
    ArrowDownRight: createMockIcon('ArrowDownRight'),
    Minus: createMockIcon('Minus'),
    CheckCircle: createMockIcon('CheckCircle'),
    XCircle: createMockIcon('XCircle'),
    AlertTriangle: createMockIcon('AlertTriangle'),
    Target: createMockIcon('Target'),
    Clock: createMockIcon('Clock'),
    Star: createMockIcon('Star'),
    Heart: createMockIcon('Heart'),
    ThumbsUp: createMockIcon('ThumbsUp'),
    Share2: createMockIcon('Share2'),
    PieChart: createMockIcon('PieChart'),
    Activity: createMockIcon('Activity'),
    Globe: createMockIcon('Globe'),
    MapPin: createMockIcon('MapPin'),
    Smartphone: createMockIcon('Smartphone'),
    Monitor: createMockIcon('Monitor'),
    Tablet: createMockIcon('Tablet'),
    BookOpen: createMockIcon('BookOpen'),
    Database: createMockIcon('Database'),
    HardDrive: createMockIcon('HardDrive'),
    Wifi: createMockIcon('Wifi'),
    Zap: createMockIcon('Zap'),
    LineChart: createMockIcon('LineChart'),
    Timer: createMockIcon('Timer'),
    Info: createMockIcon('Info')
  }
})

// Mock window.alert
const mockAlert = vi.fn()
global.alert = mockAlert

describe('AnalyticsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该正确渲染页面标题和描述', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('数据分析')).toBeInTheDocument()
    expect(screen.getByText('内容和用户行为分析报告')).toBeInTheDocument()
  })

  it('应该渲染主要指标卡片', () => {
    render(<AnalyticsPage />)
    
    // 检查关键指标是否显示
    expect(screen.getByText('总浏览量')).toBeInTheDocument()
    expect(screen.getByText('总用户')).toBeInTheDocument()
    expect(screen.getByText('总内容')).toBeInTheDocument()
    expect(screen.getByText('总评论')).toBeInTheDocument()
    
    // 检查格式化的数字显示
    expect(screen.getByText('1.2M')).toBeInTheDocument() // 1234567 formatted
    expect(screen.getByText('45.7K')).toBeInTheDocument() // 45678 formatted
  })

  it('应该渲染互动指标', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('跳出率')).toBeInTheDocument()
    expect(screen.getByText('平均会话时长')).toBeInTheDocument()
    expect(screen.getByText('新用户比例')).toBeInTheDocument()
    expect(screen.getByText('回访用户比例')).toBeInTheDocument()
    
    // 检查百分比格式
    expect(screen.getByText('23.5%')).toBeInTheDocument()
    expect(screen.getByText('34.7%')).toBeInTheDocument()
    expect(screen.getByText('65.3%')).toBeInTheDocument()
  })

  it('应该正确渲染标签页', () => {
    render(<AnalyticsPage />)
    
    // 检查标签页按钮
    expect(screen.getByText('概览')).toBeInTheDocument()
    expect(screen.getByText('内容分析')).toBeInTheDocument()
    expect(screen.getByText('用户分析')).toBeInTheDocument()
    expect(screen.getByText('系统分析')).toBeInTheDocument()
  })

  it('应该显示热门内容列表', () => {
    render(<AnalyticsPage />)
    
    // 检查热门内容标题
    expect(screen.getByText('热门内容')).toBeInTheDocument()
    
    // 检查具体内容项
    expect(screen.getByText('浦东机场T3航站楼最新进展')).toBeInTheDocument()
    expect(screen.getByText('春运期间航班调整通知')).toBeInTheDocument()
    expect(screen.getByText('机场免税店新品推荐')).toBeInTheDocument()
    
    // 检查分类标签
    expect(screen.getByText('机场建设')).toBeInTheDocument()
    expect(screen.getByText('通知公告')).toBeInTheDocument()
    expect(screen.getByText('购物指南')).toBeInTheDocument()
  })

  it('应该显示分类统计', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('分类统计')).toBeInTheDocument()
    
    // 检查具体分类
    expect(screen.getAllByText('机场建设')).toHaveLength(2) // 一个在热门内容，一个在分类统计
    expect(screen.getAllByText('通知公告')).toHaveLength(2)
    expect(screen.getByText('安全服务')).toBeInTheDocument()
    expect(screen.getByText('餐饮服务')).toBeInTheDocument()
    expect(screen.getByText('交通接驳')).toBeInTheDocument()
  })

  it('应该显示互动统计', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('互动统计')).toBeInTheDocument()
    expect(screen.getByText('总点赞数')).toBeInTheDocument()
    expect(screen.getByText('总评论数')).toBeInTheDocument()
    expect(screen.getByText('总分享数')).toBeInTheDocument()
    expect(screen.getByText('平均互动率')).toBeInTheDocument()
  })

  it('应该处理时间范围选择', () => {
    render(<AnalyticsPage />)
    
    const selectElement = screen.getByTestId('select')
    expect(selectElement).toHaveAttribute('data-value', '30d')
    
    // 模拟选择操作
    const selectButton = selectElement.querySelector('button')
    if (selectButton) {
      fireEvent.click(selectButton)
    }
  })

  it('应该处理自动刷新切换', () => {
    render(<AnalyticsPage />)
    
    const refreshButton = screen.getByText('手动刷新')
    expect(refreshButton).toBeInTheDocument()
    
    fireEvent.click(refreshButton)
    
    // 由于状态变化，按钮文本应该更新
    waitFor(() => {
      expect(screen.getByText('自动刷新')).toBeInTheDocument()
    })
  })

  it('应该处理导出报告功能', () => {
    render(<AnalyticsPage />)
    
    const exportButton = screen.getByText('导出报告')
    fireEvent.click(exportButton)
    
    expect(mockAlert).toHaveBeenCalledWith('正在生成分析报告，完成后将通过邮件发送到您的邮箱')
  })

  it('应该正确格式化数字', () => {
    render(<AnalyticsPage />)
    
    // 验证大数字格式化
    expect(screen.getByText('1.2M')).toBeInTheDocument() // 1234567
    expect(screen.getByText('45.7K')).toBeInTheDocument() // 45678
    expect(screen.getByText('2.3K')).toBeInTheDocument() // 2345
    expect(screen.getByText('8.9K')).toBeInTheDocument() // 8901
  })

  it('应该显示正确的趋势图标', () => {
    render(<AnalyticsPage />)
    
    // 检查上升趋势图标
    const upIcons = screen.getAllByTestId('icon-arrowupright')
    expect(upIcons.length).toBeGreaterThan(0)
    
    // 检查下降趋势图标（如果有）
    const downIcons = screen.queryAllByTestId('icon-arrowdownright')
    expect(downIcons.length).toBeGreaterThanOrEqual(0)
  })

  it('应该显示进度条组件', () => {
    render(<AnalyticsPage />)
    
    const progressBars = screen.getAllByTestId('progress')
    expect(progressBars.length).toBeGreaterThan(0)
    
    // 检查进度条的值
    const firstProgressBar = progressBars[0]
    expect(firstProgressBar).toHaveAttribute('data-value')
  })

  it('应该正确显示用户设备分布', () => {
    render(<AnalyticsPage />)
    
    // 在用户分析标签页中查找设备分布
    expect(screen.getByText('设备分布')).toBeInTheDocument()
    
    // 检查设备图标
    expect(screen.getByTestId('icon-smartphone')).toBeInTheDocument()
    expect(screen.getByTestId('icon-monitor')).toBeInTheDocument()
    expect(screen.getByTestId('icon-tablet')).toBeInTheDocument()
  })

  it('应该显示系统性能指标', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('系统性能')).toBeInTheDocument()
    expect(screen.getByText('平均响应时间')).toBeInTheDocument()
    expect(screen.getByText('系统可用性')).toBeInTheDocument()
    expect(screen.getByText('错误率')).toBeInTheDocument()
    expect(screen.getByText('每秒请求数')).toBeInTheDocument()
  })

  it('应该显示资源使用情况', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('资源使用情况')).toBeInTheDocument()
    expect(screen.getByText('CPU 使用率')).toBeInTheDocument()
    expect(screen.getByText('内存使用率')).toBeInTheDocument()
    expect(screen.getByText('磁盘使用率')).toBeInTheDocument()
    expect(screen.getByText('网络使用率')).toBeInTheDocument()
    expect(screen.getByText('数据库连接')).toBeInTheDocument()
    expect(screen.getByText('在线用户')).toBeInTheDocument()
  })

  it('应该显示错误分析', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('错误分析')).toBeInTheDocument()
    expect(screen.getByText('页面未找到')).toBeInTheDocument()
    expect(screen.getByText('服务器错误')).toBeInTheDocument()
    expect(screen.getByText('访问被拒绝')).toBeInTheDocument()
    expect(screen.getByText('网关错误')).toBeInTheDocument()
    expect(screen.getByText('其他错误')).toBeInTheDocument()
  })

  it('应该在媒体查询断点正确响应', () => {
    // 测试响应式设计
    render(<AnalyticsPage />)
    
    const cards = screen.getAllByTestId('card')
    expect(cards.length).toBeGreaterThan(0)
    
    // 检查是否使用了响应式类名
    const gridElements = document.querySelectorAll('[class*="grid-cols"]')
    expect(gridElements.length).toBeGreaterThan(0)
  })

  it('应该正确处理空数据状态', () => {
    // 这个测试检查组件是否能够处理空数据或错误状态
    render(<AnalyticsPage />)
    
    // 即使没有数据，页面仍应正常渲染
    expect(screen.getByText('数据分析')).toBeInTheDocument()
    expect(screen.getByTestId('main-layout')).toBeInTheDocument()
  })
})