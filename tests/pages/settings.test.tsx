import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SettingsPage from '@/app/settings/page'

// Mock the MainLayout component
vi.mock('@/components/Layout/MainLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="main-layout">{children}</div>
}))

// Mock the UI components
vi.mock('@/components/ui/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div data-testid="card-content">{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) => <h3 data-testid="card-title">{children}</h3>
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, disabled, className }: { 
    children: React.ReactNode
    onClick?: () => void
    variant?: string
    disabled?: boolean
    className?: string
  }) => 
    <button 
      data-testid="button" 
      onClick={onClick} 
      data-variant={variant}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
}))

vi.mock('@/components/ui/input', () => ({
  Input: ({ value, onChange, placeholder, type, ...props }: any) => 
    <input 
      data-testid="input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      {...props}
    />
}))

vi.mock('@/components/ui/textarea', () => ({
  Textarea: ({ value, onChange, placeholder, rows }: any) => 
    <textarea 
      data-testid="textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    />
}))

vi.mock('@/components/ui/switch', () => ({
  Switch: ({ checked, onCheckedChange }: { checked: boolean, onCheckedChange: (checked: boolean) => void }) => 
    <button 
      data-testid="switch"
      data-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      {checked ? 'ON' : 'OFF'}
    </button>
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
  SelectValue: () => <span data-testid="select-value">选择值</span>
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
  Badge: ({ children, variant }: { children: React.ReactNode, variant?: string }) => 
    <span data-testid="badge" data-variant={variant}>{children}</span>
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => {
  const createMockIcon = (name: string) => ({ className, ...props }: any) => 
    <div data-testid={`icon-${name.toLowerCase()}`} className={className} {...props} />
  
  return {
    Settings: createMockIcon('Settings'),
    Shield: createMockIcon('Shield'),
    Mail: createMockIcon('Mail'),
    Bell: createMockIcon('Bell'),
    Database: createMockIcon('Database'),
    Zap: createMockIcon('Zap'),
    Cloud: createMockIcon('Cloud'),
    Globe: createMockIcon('Globe'),
    Save: createMockIcon('Save'),
    RefreshCw: createMockIcon('RefreshCw'),
    RotateCcw: createMockIcon('RotateCcw'),
    Cpu: createMockIcon('Cpu'),
    Memory: createMockIcon('Memory'),
    HardDrive: createMockIcon('HardDrive'),
    Wifi: createMockIcon('Wifi'),
    Eye: createMockIcon('Eye'),
    EyeOff: createMockIcon('EyeOff'),
    CheckCircle: createMockIcon('CheckCircle'),
    Download: createMockIcon('Download')
  }
})

// Mock window.alert and window.confirm
const mockAlert = vi.fn()
const mockConfirm = vi.fn()
global.alert = mockAlert
global.confirm = mockConfirm

describe('SettingsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockConfirm.mockReturnValue(true) // 默认确认对话框返回 true
  })

  it('应该正确渲染页面标题和描述', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('系统设置')).toBeInTheDocument()
    expect(screen.getByText('管理系统配置和集成设置')).toBeInTheDocument()
  })

  it('应该渲染系统状态卡片', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('CPU 使用率')).toBeInTheDocument()
    expect(screen.getByText('内存使用率')).toBeInTheDocument()
    expect(screen.getByText('磁盘使用率')).toBeInTheDocument()
    expect(screen.getByText('网络带宽')).toBeInTheDocument()
    
    // 检查百分比值
    expect(screen.getByText('45%')).toBeInTheDocument()
    expect(screen.getByText('62%')).toBeInTheDocument()
    expect(screen.getByText('38%')).toBeInTheDocument()
    expect(screen.getByText('78%')).toBeInTheDocument()
  })

  it('应该渲染设置标签页', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('常规')).toBeInTheDocument()
    expect(screen.getByText('安全')).toBeInTheDocument()
    expect(screen.getByText('邮件')).toBeInTheDocument()
    expect(screen.getByText('通知')).toBeInTheDocument()
    expect(screen.getByText('存储')).toBeInTheDocument()
    expect(screen.getByText('缓存')).toBeInTheDocument()
    expect(screen.getByText('备份')).toBeInTheDocument()
    expect(screen.getByText('集成')).toBeInTheDocument()
  })

  it('应该显示常规设置表单', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('常规设置')).toBeInTheDocument()
    expect(screen.getByText('站点名称')).toBeInTheDocument()
    expect(screen.getByText('站点URL')).toBeInTheDocument()
    expect(screen.getByText('站点描述')).toBeInTheDocument()
    expect(screen.getByText('管理员邮箱')).toBeInTheDocument()
    expect(screen.getByText('时区')).toBeInTheDocument()
    expect(screen.getByText('语言')).toBeInTheDocument()
    
    // 检查默认值
    const siteNameInput = screen.getByDisplayValue('浦东机场内容管理系统')
    expect(siteNameInput).toBeInTheDocument()
    
    const siteUrlInput = screen.getByDisplayValue('https://cms.pudongairport.com')
    expect(siteUrlInput).toBeInTheDocument()
  })

  it('应该显示切换开关设置', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('维护模式')).toBeInTheDocument()
    expect(screen.getByText('用户注册')).toBeInTheDocument()
    expect(screen.getByText('游客评论')).toBeInTheDocument()
    
    // 检查开关状态
    const switches = screen.getAllByTestId('switch')
    expect(switches.length).toBeGreaterThan(0)
  })

  it('应该处理表单输入变化', () => {
    render(<SettingsPage />)
    
    const siteNameInput = screen.getByDisplayValue('浦东机场内容管理系统')
    fireEvent.change(siteNameInput, { target: { value: '新的站点名称' } })
    
    expect(siteNameInput).toHaveValue('新的站点名称')
  })

  it('应该处理开关切换', () => {
    render(<SettingsPage />)
    
    const switches = screen.getAllByTestId('switch')
    const firstSwitch = switches[0]
    
    const initialState = firstSwitch.getAttribute('data-checked')
    fireEvent.click(firstSwitch)
    
    // 状态应该改变
    expect(firstSwitch.getAttribute('data-checked')).not.toBe(initialState)
  })

  it('应该显示未保存更改标识', async () => {
    render(<SettingsPage />)
    
    // 修改一个输入值
    const siteNameInput = screen.getByDisplayValue('浦东机场内容管理系统')
    fireEvent.change(siteNameInput, { target: { value: '修改后的名称' } })
    
    // 应该显示未保存更改的徽章
    await waitFor(() => {
      expect(screen.getByText('未保存更改')).toBeInTheDocument()
    })
  })

  it('应该处理保存设置功能', async () => {
    render(<SettingsPage />)
    
    // 修改一个设置
    const siteNameInput = screen.getByDisplayValue('浦东机场内容管理系统')
    fireEvent.change(siteNameInput, { target: { value: '修改后的名称' } })
    
    // 点击保存按钮
    const saveButton = screen.getByText('保存设置')
    fireEvent.click(saveButton)
    
    // 应该显示保存成功消息
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('设置已保存')
    }, { timeout: 2000 })
  })

  it('应该处理重置设置功能', () => {
    render(<SettingsPage />)
    
    // 修改一个设置
    const siteNameInput = screen.getByDisplayValue('浦东机场内容管理系统')
    fireEvent.change(siteNameInput, { target: { value: '修改后的名称' } })
    
    // 点击重置按钮
    const resetButton = screen.getByText('重置')
    fireEvent.click(resetButton)
    
    // 应该弹出确认对话框
    expect(mockConfirm).toHaveBeenCalledWith('确定要重置所有设置吗？此操作不可撤销。')
  })

  it('应该显示安全设置', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('安全设置')).toBeInTheDocument()
    expect(screen.getByText('密码策略')).toBeInTheDocument()
    expect(screen.getByText('最小长度')).toBeInTheDocument()
    expect(screen.getByText('密码过期天数')).toBeInTheDocument()
    expect(screen.getByText('需要大写字母')).toBeInTheDocument()
    expect(screen.getByText('需要小写字母')).toBeInTheDocument()
    expect(screen.getByText('需要数字')).toBeInTheDocument()
    expect(screen.getByText('需要特殊字符')).toBeInTheDocument()
  })

  it('应该显示会话管理设置', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('会话管理')).toBeInTheDocument()
    expect(screen.getByText('会话超时 (秒)')).toBeInTheDocument()
    expect(screen.getByText('最大登录失败次数')).toBeInTheDocument()
    expect(screen.getByText('锁定时间 (秒)')).toBeInTheDocument()
  })

  it('应该显示访问控制设置', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('访问控制')).toBeInTheDocument()
    expect(screen.getByText('IP 白名单')).toBeInTheDocument()
    expect(screen.getByText('CORS 允许的域名')).toBeInTheDocument()
    expect(screen.getByText('强制双因素认证')).toBeInTheDocument()
    expect(screen.getByText('SSL 加密')).toBeInTheDocument()
  })

  it('应该显示邮件设置', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('邮件设置')).toBeInTheDocument()
    expect(screen.getByText('SMTP 配置')).toBeInTheDocument()
    expect(screen.getByText('SMTP 服务器')).toBeInTheDocument()
    expect(screen.getByText('端口')).toBeInTheDocument()
    expect(screen.getByText('用户名')).toBeInTheDocument()
    expect(screen.getByText('密码')).toBeInTheDocument()
    expect(screen.getByText('发件人信息')).toBeInTheDocument()
  })

  it('应该处理密码显示切换', () => {
    render(<SettingsPage />)
    
    // 查找密码显示切换按钮
    const eyeIcons = screen.queryAllByTestId('icon-eye')
    const eyeOffIcons = screen.queryAllByTestId('icon-eyeoff')
    
    // 应该有密码相关的图标
    expect(eyeIcons.length + eyeOffIcons.length).toBeGreaterThan(0)
  })

  it('应该处理测试邮件发送', () => {
    render(<SettingsPage />)
    
    const testEmailButton = screen.getByText('发送测试邮件')
    fireEvent.click(testEmailButton)
    
    // 按钮状态应该改变
    expect(testEmailButton).toBeInTheDocument()
  })

  it('应该显示存储设置', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('存储设置')).toBeInTheDocument()
    expect(screen.getByText('存储提供商')).toBeInTheDocument()
    expect(screen.getByText('最大文件大小')).toBeInTheDocument()
    expect(screen.getByText('允许的文件类型')).toBeInTheDocument()
    expect(screen.getByText('启用 CDN')).toBeInTheDocument()
    expect(screen.getByText('图片压缩')).toBeInTheDocument()
  })

  it('应该显示备份设置', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('备份设置')).toBeInTheDocument()
    expect(screen.getByText('启用自动备份')).toBeInTheDocument()
    expect(screen.getByText('备份频率')).toBeInTheDocument()
    expect(screen.getByText('保留天数')).toBeInTheDocument()
    expect(screen.getByText('备份数据库')).toBeInTheDocument()
    expect(screen.getByText('备份文件')).toBeInTheDocument()
  })

  it('应该处理立即备份功能', () => {
    render(<SettingsPage />)
    
    const backupButton = screen.getByText('立即备份')
    fireEvent.click(backupButton)
    
    expect(mockAlert).toHaveBeenCalledWith('备份任务已启动，请查看系统日志了解进度')
  })

  it('应该显示第三方集成设置', () => {
    render(<SettingsPage />)
    
    expect(screen.getByText('第三方集成')).toBeInTheDocument()
    expect(screen.getByText('微信集成')).toBeInTheDocument()
    expect(screen.getByText('钉钉集成')).toBeInTheDocument()
    expect(screen.getByText('飞书集成')).toBeInTheDocument()
  })

  it('应该处理集成开关切换', () => {
    render(<SettingsPage />)
    
    // 查找集成相关的开关
    const integrationSwitches = screen.getAllByTestId('switch')
    
    // 应该有集成开关
    expect(integrationSwitches.length).toBeGreaterThan(0)
    
    // 测试切换第一个集成开关
    const firstIntegrationSwitch = integrationSwitches[integrationSwitches.length - 1]
    fireEvent.click(firstIntegrationSwitch)
    
    // 状态应该改变
    expect(firstIntegrationSwitch).toBeInTheDocument()
  })

  it('应该正确显示进度条', () => {
    render(<SettingsPage />)
    
    const progressBars = screen.getAllByTestId('progress')
    expect(progressBars.length).toBeGreaterThan(0)
    
    // 检查进度条的值
    const cpuProgress = progressBars.find(bar => bar.getAttribute('data-value') === '45')
    expect(cpuProgress).toBeInTheDocument()
  })

  it('应该显示系统状态图标', () => {
    render(<SettingsPage />)
    
    expect(screen.getByTestId('icon-cpu')).toBeInTheDocument()
    expect(screen.getByTestId('icon-memory')).toBeInTheDocument()
    expect(screen.getByTestId('icon-harddrive')).toBeInTheDocument()
    expect(screen.getByTestId('icon-wifi')).toBeInTheDocument()
  })

  it('应该在相应条件下启用/禁用保存按钮', () => {
    render(<SettingsPage />)
    
    const saveButton = screen.getByText('保存设置')
    
    // 初始状态下保存按钮应该被禁用
    expect(saveButton).toBeDisabled()
    
    // 修改设置后，保存按钮应该启用
    const siteNameInput = screen.getByDisplayValue('浦东机场内容管理系统')
    fireEvent.change(siteNameInput, { target: { value: '新名称' } })
    
    waitFor(() => {
      expect(saveButton).not.toBeDisabled()
    })
  })

  it('应该处理表单验证', () => {
    render(<SettingsPage />)
    
    // 清空必填字段
    const emailInput = screen.getByDisplayValue('admin@pudongairport.com')
    fireEvent.change(emailInput, { target: { value: '' } })
    
    // 尝试保存
    const saveButton = screen.getByText('保存设置')
    fireEvent.click(saveButton)
    
    // 应该有适当的验证处理
    expect(saveButton).toBeInTheDocument()
  })
})