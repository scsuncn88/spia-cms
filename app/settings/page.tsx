'use client'

import React, { useState } from 'react'
import { 
  Settings, 
  Search, 
  Save, 
  RefreshCw, 
  Monitor, 
  Lock, 
  Mail, 
  Bell, 
  Globe, 
  Shield, 
  Database, 
  Cloud, 
  Key, 
  Palette, 
  Clock, 
  Users, 
  FileText, 
  Image, 
  Zap,
  Server,
  Wifi,
  HardDrive,
  Cpu,
  Memory,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Eye,
  EyeOff,
  Copy,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  Minus,
  RotateCcw,
  Power,
  Activity,
  BarChart3,
  TrendingUp,
  Calendar,
  User,
  Building,
  Phone,
  MapPin,
  Languages,
  Smartphone,
  Tablet,
  Laptop
} from 'lucide-react'
import MainLayout from '@/components/Layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { SystemSettings } from '@/types'
import { mockUser } from '@/lib/permissions'

// Mock system settings data
const mockSystemSettings: SystemSettings = {
  general: {
    siteName: '浦东机场内容管理系统',
    siteDescription: '上海浦东国际机场官方内容管理与发布平台',
    siteUrl: 'https://cms.pudongairport.com',
    adminEmail: 'admin@pudongairport.com',
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h',
    maintenanceMode: false,
    registrationEnabled: false,
    guestCommentsEnabled: true,
    maxFileSize: 10485760, // 10MB
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'mp4', 'avi', 'mov']
  },
  security: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      passwordExpiry: 90
    },
    sessionTimeout: 3600,
    maxLoginAttempts: 5,
    lockoutDuration: 1800,
    twoFactorRequired: false,
    ipWhitelist: ['127.0.0.1', '10.0.0.0/8', '192.168.0.0/16'],
    corsOrigins: ['https://pudongairport.com', 'https://www.pudongairport.com'],
    sslEnabled: true,
    encryptionKey: '***ENCRYPTED***'
  },
  email: {
    provider: 'smtp',
    host: 'smtp.pudongairport.com',
    port: 587,
    username: 'noreply@pudongairport.com',
    password: '***ENCRYPTED***',
    encryption: 'tls',
    fromName: '浦东机场CMS',
    fromAddress: 'noreply@pudongairport.com',
    replyToAddress: 'support@pudongairport.com',
    testMode: false
  },
  notifications: {
    enableEmail: true,
    enableSms: true,
    enablePush: true,
    enableWebhook: false,
    emailTemplates: {
      welcome: {
        subject: '欢迎使用浦东机场CMS',
        template: 'welcome-email.html'
      },
      passwordReset: {
        subject: '密码重置请求',
        template: 'password-reset.html'
      },
      contentApproval: {
        subject: '内容审核通知',
        template: 'content-approval.html'
      }
    },
    smsProvider: 'aliyun',
    pushProvider: 'fcm',
    webhookUrl: 'https://webhook.pudongairport.com/notifications'
  },
  storage: {
    provider: 'local',
    localPath: '/var/www/uploads',
    maxFileSize: 10485760,
    allowedTypes: ['image/*', 'video/*', 'audio/*', 'application/pdf', 'application/msword'],
    cdnEnabled: true,
    cdnUrl: 'https://cdn.pudongairport.com',
    s3Config: {
      bucket: 'pudong-cms-assets',
      region: 'ap-northeast-1',
      accessKeyId: '***ENCRYPTED***',
      secretAccessKey: '***ENCRYPTED***'
    },
    compressionEnabled: true,
    thumbnailSizes: [150, 300, 600, 1200]
  },
  cache: {
    enabled: true,
    provider: 'redis',
    ttl: 3600,
    redisConfig: {
      host: 'localhost',
      port: 6379,
      password: '***ENCRYPTED***',
      database: 0
    },
    pageCacheEnabled: true,
    apiCacheEnabled: true,
    staticCacheEnabled: true,
    compressionEnabled: true
  },
  backup: {
    enabled: true,
    frequency: 'daily',
    retention: 30,
    includeDatabases: true,
    includeFiles: true,
    includeSettings: true,
    destination: 's3',
    s3Config: {
      bucket: 'pudong-cms-backups',
      region: 'ap-northeast-1',
      accessKeyId: '***ENCRYPTED***',
      secretAccessKey: '***ENCRYPTED***'
    },
    compression: true,
    encryption: true,
    lastBackup: new Date('2024-01-15T02:00:00')
  },
  analytics: {
    enabled: true,
    googleAnalyticsId: 'GA-XXXXXXXXX',
    baiduAnalyticsId: '',
    customTrackingCode: '',
    trackPageViews: true,
    trackEvents: true,
    trackUsers: true,
    retentionDays: 365,
    exportEnabled: true
  },
  integrations: {
    wechat: {
      enabled: true,
      appId: 'wx1234567890abcdef',
      appSecret: '***ENCRYPTED***',
      token: '***ENCRYPTED***',
      encodingAESKey: '***ENCRYPTED***'
    },
    alipay: {
      enabled: false,
      appId: '',
      privateKey: '***ENCRYPTED***',
      publicKey: '***ENCRYPTED***'
    },
    dingtalk: {
      enabled: true,
      appKey: 'dingxxxxxxxxxx',
      appSecret: '***ENCRYPTED***',
      webhookUrl: 'https://oapi.dingtalk.com/robot/send?access_token=xxx'
    },
    feishu: {
      enabled: false,
      appId: '',
      appSecret: '***ENCRYPTED***',
      webhookUrl: ''
    }
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>(mockSystemSettings)
  const [activeTab, setActiveTab] = useState('general')
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)
  const [testEmailSent, setTestEmailSent] = useState(false)

  const handleSettingChange = (category: keyof SystemSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
    setUnsavedChanges(true)
  }

  const handleNestedSettingChange = (category: keyof SystemSettings, parentKey: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parentKey]: {
          ...prev[category][parentKey],
          [key]: value
        }
      }
    }))
    setUnsavedChanges(true)
  }

  const handleSaveSettings = () => {
    // Simulate saving settings
    setTimeout(() => {
      setUnsavedChanges(false)
      alert('设置已保存')
    }, 1000)
  }

  const handleResetSettings = () => {
    if (confirm('确定要重置所有设置吗？此操作不可撤销。')) {
      setSettings(mockSystemSettings)
      setUnsavedChanges(false)
    }
  }

  const handleTestEmail = () => {
    setTestEmailSent(true)
    setTimeout(() => setTestEmailSent(false), 3000)
  }

  const handleBackupNow = () => {
    alert('备份任务已启动，请查看系统日志了解进度')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getSystemStatus = () => {
    return {
      cpu: 45,
      memory: 62,
      disk: 38,
      network: 78
    }
  }

  const systemStatus = getSystemStatus()

  return (
    <MainLayout>
      <div className="container-dashboard py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              系统设置
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              管理系统配置和集成设置
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unsavedChanges && (
              <Badge variant="destructive" className="animate-pulse">
                未保存更改
              </Badge>
            )}
            <Button
              variant="outline"
              onClick={handleResetSettings}
              disabled={!unsavedChanges}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重置
            </Button>
            <Button
              onClick={handleSaveSettings}
              disabled={!unsavedChanges}
              className="btn-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              保存设置
            </Button>
          </div>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">CPU 使用率</span>
                </div>
                <span className="text-sm font-bold">{systemStatus.cpu}%</span>
              </div>
              <Progress value={systemStatus.cpu} className="h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Memory className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">内存使用率</span>
                </div>
                <span className="text-sm font-bold">{systemStatus.memory}%</span>
              </div>
              <Progress value={systemStatus.memory} className="h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium">磁盘使用率</span>
                </div>
                <span className="text-sm font-bold">{systemStatus.disk}%</span>
              </div>
              <Progress value={systemStatus.disk} className="h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium">网络带宽</span>
                </div>
                <span className="text-sm font-bold">{systemStatus.network}%</span>
              </div>
              <Progress value={systemStatus.network} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
            <TabsTrigger value="general">
              <Settings className="w-4 h-4 mr-2" />
              常规
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              安全
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="w-4 h-4 mr-2" />
              邮件
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              通知
            </TabsTrigger>
            <TabsTrigger value="storage">
              <Database className="w-4 h-4 mr-2" />
              存储
            </TabsTrigger>
            <TabsTrigger value="cache">
              <Zap className="w-4 h-4 mr-2" />
              缓存
            </TabsTrigger>
            <TabsTrigger value="backup">
              <Cloud className="w-4 h-4 mr-2" />
              备份
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <Globe className="w-4 h-4 mr-2" />
              集成
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  常规设置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">站点名称</label>
                    <Input
                      value={settings.general.siteName}
                      onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                      placeholder="输入站点名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">站点URL</label>
                    <Input
                      value={settings.general.siteUrl}
                      onChange={(e) => handleSettingChange('general', 'siteUrl', e.target.value)}
                      placeholder="输入站点URL"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">站点描述</label>
                  <Textarea
                    value={settings.general.siteDescription}
                    onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                    placeholder="输入站点描述"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">管理员邮箱</label>
                    <Input
                      type="email"
                      value={settings.general.adminEmail}
                      onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
                      placeholder="输入管理员邮箱"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">时区</label>
                    <Select value={settings.general.timezone} onValueChange={(value) => handleSettingChange('general', 'timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
                        <SelectItem value="Asia/Beijing">Asia/Beijing</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">语言</label>
                    <Select value={settings.general.language} onValueChange={(value) => handleSettingChange('general', 'language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh-CN">简体中文</SelectItem>
                        <SelectItem value="zh-TW">繁体中文</SelectItem>
                        <SelectItem value="en-US">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">日期格式</label>
                    <Select value={settings.general.dateFormat} onValueChange={(value) => handleSettingChange('general', 'dateFormat', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">时间格式</label>
                    <Select value={settings.general.timeFormat} onValueChange={(value) => handleSettingChange('general', 'timeFormat', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">24小时制</SelectItem>
                        <SelectItem value="12h">12小时制</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">维护模式</label>
                      <p className="text-sm text-gray-600">启用后，网站将显示维护页面</p>
                    </div>
                    <Switch
                      checked={settings.general.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange('general', 'maintenanceMode', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">用户注册</label>
                      <p className="text-sm text-gray-600">允许新用户注册账户</p>
                    </div>
                    <Switch
                      checked={settings.general.registrationEnabled}
                      onCheckedChange={(checked) => handleSettingChange('general', 'registrationEnabled', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">游客评论</label>
                      <p className="text-sm text-gray-600">允许未登录用户发表评论</p>
                    </div>
                    <Switch
                      checked={settings.general.guestCommentsEnabled}
                      onCheckedChange={(checked) => handleSettingChange('general', 'guestCommentsEnabled', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  安全设置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">密码策略</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">最小长度</label>
                      <Input
                        type="number"
                        value={settings.security.passwordPolicy.minLength}
                        onChange={(e) => handleNestedSettingChange('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
                        min="4"
                        max="128"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">密码过期天数</label>
                      <Input
                        type="number"
                        value={settings.security.passwordPolicy.passwordExpiry}
                        onChange={(e) => handleNestedSettingChange('security', 'passwordPolicy', 'passwordExpiry', parseInt(e.target.value))}
                        min="0"
                        max="365"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">需要大写字母</span>
                      <Switch
                        checked={settings.security.passwordPolicy.requireUppercase}
                        onCheckedChange={(checked) => handleNestedSettingChange('security', 'passwordPolicy', 'requireUppercase', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">需要小写字母</span>
                      <Switch
                        checked={settings.security.passwordPolicy.requireLowercase}
                        onCheckedChange={(checked) => handleNestedSettingChange('security', 'passwordPolicy', 'requireLowercase', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">需要数字</span>
                      <Switch
                        checked={settings.security.passwordPolicy.requireNumbers}
                        onCheckedChange={(checked) => handleNestedSettingChange('security', 'passwordPolicy', 'requireNumbers', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">需要特殊字符</span>
                      <Switch
                        checked={settings.security.passwordPolicy.requireSpecialChars}
                        onCheckedChange={(checked) => handleNestedSettingChange('security', 'passwordPolicy', 'requireSpecialChars', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">会话管理</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">会话超时 (秒)</label>
                      <Input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                        min="300"
                        max="86400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">最大登录失败次数</label>
                      <Input
                        type="number"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                        min="3"
                        max="10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">锁定时间 (秒)</label>
                      <Input
                        type="number"
                        value={settings.security.lockoutDuration}
                        onChange={(e) => handleSettingChange('security', 'lockoutDuration', parseInt(e.target.value))}
                        min="300"
                        max="86400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">访问控制</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">IP 白名单</label>
                      <Textarea
                        value={settings.security.ipWhitelist.join('\n')}
                        onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value.split('\n').filter(ip => ip.trim()))}
                        placeholder="每行一个 IP 地址或 CIDR 网段"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CORS 允许的域名</label>
                      <Textarea
                        value={settings.security.corsOrigins.join('\n')}
                        onChange={(e) => handleSettingChange('security', 'corsOrigins', e.target.value.split('\n').filter(origin => origin.trim()))}
                        placeholder="每行一个域名"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">强制双因素认证</label>
                      <p className="text-sm text-gray-600">要求所有用户启用2FA</p>
                    </div>
                    <Switch
                      checked={settings.security.twoFactorRequired}
                      onCheckedChange={(checked) => handleSettingChange('security', 'twoFactorRequired', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">SSL 加密</label>
                      <p className="text-sm text-gray-600">启用 HTTPS 安全传输</p>
                    </div>
                    <Switch
                      checked={settings.security.sslEnabled}
                      onCheckedChange={(checked) => handleSettingChange('security', 'sslEnabled', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  邮件设置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">SMTP 配置</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">SMTP 服务器</label>
                      <Input
                        value={settings.email.host}
                        onChange={(e) => handleSettingChange('email', 'host', e.target.value)}
                        placeholder="smtp.example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">端口</label>
                      <Input
                        type="number"
                        value={settings.email.port}
                        onChange={(e) => handleSettingChange('email', 'port', parseInt(e.target.value))}
                        min="1"
                        max="65535"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">用户名</label>
                      <Input
                        value={settings.email.username}
                        onChange={(e) => handleSettingChange('email', 'username', e.target.value)}
                        placeholder="username@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">密码</label>
                      <div className="relative">
                        <Input
                          type={showPasswords ? 'text' : 'password'}
                          value={settings.email.password}
                          onChange={(e) => handleSettingChange('email', 'password', e.target.value)}
                          placeholder="输入密码"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPasswords(!showPasswords)}
                        >
                          {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">加密方式</label>
                    <Select value={settings.email.encryption} onValueChange={(value) => handleSettingChange('email', 'encryption', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">无</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">发件人信息</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">发件人姓名</label>
                      <Input
                        value={settings.email.fromName}
                        onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
                        placeholder="发件人姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">发件人邮箱</label>
                      <Input
                        type="email"
                        value={settings.email.fromAddress}
                        onChange={(e) => handleSettingChange('email', 'fromAddress', e.target.value)}
                        placeholder="noreply@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">回复邮箱</label>
                      <Input
                        type="email"
                        value={settings.email.replyToAddress}
                        onChange={(e) => handleSettingChange('email', 'replyToAddress', e.target.value)}
                        placeholder="support@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">测试模式</label>
                    <p className="text-sm text-gray-600">在测试模式下，邮件不会实际发送</p>
                  </div>
                  <Switch
                    checked={settings.email.testMode}
                    onCheckedChange={(checked) => handleSettingChange('email', 'testMode', checked)}
                  />
                </div>

                <div className="pt-4 border-t">
                  <Button
                    onClick={handleTestEmail}
                    disabled={testEmailSent}
                    className="w-full"
                  >
                    {testEmailSent ? (
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    ) : (
                      <Mail className="w-4 h-4 mr-2" />
                    )}
                    {testEmailSent ? '测试邮件已发送' : '发送测试邮件'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Storage Settings */}
          <TabsContent value="storage">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  存储设置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">存储提供商</label>
                  <Select value={settings.storage.provider} onValueChange={(value) => handleSettingChange('storage', 'provider', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">本地存储</SelectItem>
                      <SelectItem value="s3">Amazon S3</SelectItem>
                      <SelectItem value="oss">阿里云 OSS</SelectItem>
                      <SelectItem value="cos">腾讯云 COS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">最大文件大小</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={settings.storage.maxFileSize / 1024 / 1024}
                      onChange={(e) => handleSettingChange('storage', 'maxFileSize', parseInt(e.target.value) * 1024 * 1024)}
                      min="1"
                      max="1024"
                    />
                    <span className="text-sm text-gray-600">MB</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">允许的文件类型</label>
                  <Textarea
                    value={settings.storage.allowedTypes.join('\n')}
                    onChange={(e) => handleSettingChange('storage', 'allowedTypes', e.target.value.split('\n').filter(type => type.trim()))}
                    placeholder="每行一种文件类型，如 image/*, video/*, .pdf"
                    rows={4}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">启用 CDN</label>
                      <p className="text-sm text-gray-600">使用 CDN 加速文件访问</p>
                    </div>
                    <Switch
                      checked={settings.storage.cdnEnabled}
                      onCheckedChange={(checked) => handleSettingChange('storage', 'cdnEnabled', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">图片压缩</label>
                      <p className="text-sm text-gray-600">自动压缩上传的图片</p>
                    </div>
                    <Switch
                      checked={settings.storage.compressionEnabled}
                      onCheckedChange={(checked) => handleSettingChange('storage', 'compressionEnabled', checked)}
                    />
                  </div>
                </div>

                {settings.storage.cdnEnabled && (
                  <div>
                    <label className="block text-sm font-medium mb-2">CDN 域名</label>
                    <Input
                      value={settings.storage.cdnUrl}
                      onChange={(e) => handleSettingChange('storage', 'cdnUrl', e.target.value)}
                      placeholder="https://cdn.example.com"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">缩略图尺寸</label>
                  <div className="flex flex-wrap gap-2">
                    {settings.storage.thumbnailSizes.map((size, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={size}
                          onChange={(e) => {
                            const newSizes = [...settings.storage.thumbnailSizes]
                            newSizes[index] = parseInt(e.target.value)
                            handleSettingChange('storage', 'thumbnailSizes', newSizes)
                          }}
                          className="w-20"
                          min="50"
                          max="2000"
                        />
                        <span className="text-xs text-gray-500">px</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup Settings */}
          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5" />
                  备份设置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">启用自动备份</label>
                    <p className="text-sm text-gray-600">定期自动备份系统数据</p>
                  </div>
                  <Switch
                    checked={settings.backup.enabled}
                    onCheckedChange={(checked) => handleSettingChange('backup', 'enabled', checked)}
                  />
                </div>

                {settings.backup.enabled && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">备份频率</label>
                        <Select value={settings.backup.frequency} onValueChange={(value) => handleSettingChange('backup', 'frequency', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">每小时</SelectItem>
                            <SelectItem value="daily">每天</SelectItem>
                            <SelectItem value="weekly">每周</SelectItem>
                            <SelectItem value="monthly">每月</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">保留天数</label>
                        <Input
                          type="number"
                          value={settings.backup.retention}
                          onChange={(e) => handleSettingChange('backup', 'retention', parseInt(e.target.value))}
                          min="1"
                          max="365"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">备份数据库</span>
                        <Switch
                          checked={settings.backup.includeDatabases}
                          onCheckedChange={(checked) => handleSettingChange('backup', 'includeDatabases', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">备份文件</span>
                        <Switch
                          checked={settings.backup.includeFiles}
                          onCheckedChange={(checked) => handleSettingChange('backup', 'includeFiles', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">备份设置</span>
                        <Switch
                          checked={settings.backup.includeSettings}
                          onCheckedChange={(checked) => handleSettingChange('backup', 'includeSettings', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">压缩备份</span>
                        <Switch
                          checked={settings.backup.compression}
                          onCheckedChange={(checked) => handleSettingChange('backup', 'compression', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">加密备份</span>
                        <Switch
                          checked={settings.backup.encryption}
                          onCheckedChange={(checked) => handleSettingChange('backup', 'encryption', checked)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">备份目标</label>
                      <Select value={settings.backup.destination} onValueChange={(value) => handleSettingChange('backup', 'destination', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">本地存储</SelectItem>
                          <SelectItem value="s3">Amazon S3</SelectItem>
                          <SelectItem value="oss">阿里云 OSS</SelectItem>
                          <SelectItem value="ftp">FTP 服务器</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">最近备份时间</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(settings.backup.lastBackup)}
                        </p>
                      </div>
                      <Button onClick={handleBackupNow} variant="outline">
                        <Cloud className="w-4 h-4 mr-2" />
                        立即备份
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    第三方集成
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* WeChat Integration */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <span className="text-green-600 font-bold">微</span>
                        </div>
                        <div>
                          <h3 className="font-medium">微信集成</h3>
                          <p className="text-sm text-gray-600">连接微信公众号和小程序</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.integrations.wechat.enabled}
                        onCheckedChange={(checked) => handleNestedSettingChange('integrations', 'wechat', 'enabled', checked)}
                      />
                    </div>
                    {settings.integrations.wechat.enabled && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">App ID</label>
                            <Input
                              value={settings.integrations.wechat.appId}
                              onChange={(e) => handleNestedSettingChange('integrations', 'wechat', 'appId', e.target.value)}
                              placeholder="wx1234567890abcdef"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">App Secret</label>
                            <Input
                              type={showPasswords ? 'text' : 'password'}
                              value={settings.integrations.wechat.appSecret}
                              onChange={(e) => handleNestedSettingChange('integrations', 'wechat', 'appSecret', e.target.value)}
                              placeholder="输入 App Secret"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* DingTalk Integration */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold">钉</span>
                        </div>
                        <div>
                          <h3 className="font-medium">钉钉集成</h3>
                          <p className="text-sm text-gray-600">连接钉钉企业应用</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.integrations.dingtalk.enabled}
                        onCheckedChange={(checked) => handleNestedSettingChange('integrations', 'dingtalk', 'enabled', checked)}
                      />
                    </div>
                    {settings.integrations.dingtalk.enabled && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">App Key</label>
                          <Input
                            value={settings.integrations.dingtalk.appKey}
                            onChange={(e) => handleNestedSettingChange('integrations', 'dingtalk', 'appKey', e.target.value)}
                            placeholder="dingxxxxxxxxxx"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Webhook URL</label>
                          <Input
                            value={settings.integrations.dingtalk.webhookUrl}
                            onChange={(e) => handleNestedSettingChange('integrations', 'dingtalk', 'webhookUrl', e.target.value)}
                            placeholder="https://oapi.dingtalk.com/robot/send?access_token=..."
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Feishu Integration */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 font-bold">飞</span>
                        </div>
                        <div>
                          <h3 className="font-medium">飞书集成</h3>
                          <p className="text-sm text-gray-600">连接飞书企业应用</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.integrations.feishu.enabled}
                        onCheckedChange={(checked) => handleNestedSettingChange('integrations', 'feishu', 'enabled', checked)}
                      />
                    </div>
                    {settings.integrations.feishu.enabled && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">App ID</label>
                            <Input
                              value={settings.integrations.feishu.appId}
                              onChange={(e) => handleNestedSettingChange('integrations', 'feishu', 'appId', e.target.value)}
                              placeholder="输入 App ID"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">App Secret</label>
                            <Input
                              type={showPasswords ? 'text' : 'password'}
                              value={settings.integrations.feishu.appSecret}
                              onChange={(e) => handleNestedSettingChange('integrations', 'feishu', 'appSecret', e.target.value)}
                              placeholder="输入 App Secret"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}