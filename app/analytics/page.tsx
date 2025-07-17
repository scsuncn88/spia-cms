'use client'

import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Eye, 
  MessageSquare, 
  Calendar, 
  Download, 
  Filter, 
  RefreshCw, 
  PieChart, 
  LineChart, 
  Activity, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet,
  Clock,
  Star,
  ThumbsUp,
  Share2,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Target,
  Zap,
  Heart,
  BookOpen,
  Image,
  Video,
  FileAudio,
  MapPin,
  Wifi,
  Server,
  Database,
  HardDrive
} from 'lucide-react'
import MainLayout from '@/components/Layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { AnalyticsData, ContentAnalytics, UserAnalytics, SystemAnalytics } from '@/types'

// Mock analytics data
const mockAnalyticsData: AnalyticsData = {
  overview: {
    totalViews: 1234567,
    totalUsers: 45678,
    totalContent: 2345,
    totalComments: 8901,
    bounceRate: 23.5,
    avgSessionDuration: 4.2,
    newUsersRate: 34.7,
    returnUsersRate: 65.3
  },
  contentAnalytics: {
    topContent: [
      {
        id: '1',
        title: '浦东机场T3航站楼最新进展',
        views: 45678,
        likes: 1234,
        comments: 89,
        shares: 156,
        category: '机场建设',
        publishedAt: new Date('2024-01-10T10:00:00'),
        trend: 'up'
      },
      {
        id: '2', 
        title: '春运期间航班调整通知',
        views: 34567,
        likes: 987,
        comments: 67,
        shares: 234,
        category: '通知公告',
        publishedAt: new Date('2024-01-12T14:30:00'),
        trend: 'up'
      },
      {
        id: '3',
        title: '机场免税店新品推荐',
        views: 23456,
        likes: 654,
        comments: 45,
        shares: 123,
        category: '购物指南',
        publishedAt: new Date('2024-01-08T16:00:00'),
        trend: 'down'
      },
      {
        id: '4',
        title: '安检流程优化说明',
        views: 18765,
        likes: 432,
        comments: 28,
        shares: 87,
        category: '安全服务',
        publishedAt: new Date('2024-01-05T09:15:00'),
        trend: 'stable'
      },
      {
        id: '5',
        title: '餐饮服务时间调整',
        views: 15432,
        likes: 321,
        comments: 19,
        shares: 56,
        category: '餐饮服务',
        publishedAt: new Date('2024-01-03T11:45:00'),
        trend: 'up'
      }
    ],
    categoryStats: [
      { category: '机场建设', count: 156, views: 234567, growth: 12.5 },
      { category: '通知公告', count: 89, views: 189234, growth: 8.7 },
      { category: '购物指南', count: 67, views: 145678, growth: -2.3 },
      { category: '安全服务', count: 78, views: 123456, growth: 15.2 },
      { category: '餐饮服务', count: 45, views: 98765, growth: 6.8 },
      { category: '交通接驳', count: 34, views: 76543, growth: 4.1 }
    ],
    engagement: {
      totalLikes: 45678,
      totalComments: 12345,
      totalShares: 6789,
      avgEngagementRate: 5.6,
      topEngagementHours: [9, 12, 15, 18, 21]
    }
  },
  userAnalytics: {
    demographics: {
      ageGroups: [
        { range: '18-25', count: 8765, percentage: 19.2 },
        { range: '26-35', count: 15432, percentage: 33.8 },
        { range: '36-45', count: 12345, percentage: 27.1 },
        { range: '46-55', count: 6789, percentage: 14.9 },
        { range: '56+', count: 2347, percentage: 5.0 }
      ],
      locations: [
        { city: '上海', count: 18765, percentage: 41.1 },
        { city: '北京', count: 6789, percentage: 14.9 },
        { city: '广州', count: 4567, percentage: 10.0 },
        { city: '深圳', count: 3456, percentage: 7.6 },
        { city: '杭州', count: 2345, percentage: 5.1 },
        { city: '其他', count: 9756, percentage: 21.3 }
      ],
      devices: [
        { type: 'mobile', count: 28901, percentage: 63.3 },
        { type: 'desktop', count: 12345, percentage: 27.1 },
        { type: 'tablet', count: 4432, percentage: 9.7 }
      ]
    },
    behavior: {
      avgPageViews: 4.2,
      avgSessionDuration: 6.8,
      bounceRate: 23.5,
      returnVisitorRate: 65.3,
      topPages: [
        { path: '/flight-info', views: 89765, title: '航班信息' },
        { path: '/services', views: 67543, title: '机场服务' },
        { path: '/shopping', views: 45321, title: '购物指南' },
        { path: '/transportation', views: 34567, title: '交通指南' },
        { path: '/news', views: 23456, title: '新闻资讯' }
      ]
    },
    acquisition: {
      sources: [
        { source: 'direct', visits: 18765, percentage: 41.1 },
        { source: 'search', visits: 12345, percentage: 27.1 },
        { source: 'social', visits: 6789, percentage: 14.9 },
        { source: 'referral', visits: 4567, percentage: 10.0 },
        { source: 'email', visits: 3212, percentage: 7.0 }
      ]
    }
  },
  systemAnalytics: {
    performance: {
      avgResponseTime: 245,
      uptime: 99.95,
      errorRate: 0.05,
      throughput: 1234,
      peakHours: [9, 10, 11, 14, 15, 16, 20, 21]
    },
    resources: {
      cpuUsage: 45,
      memoryUsage: 62,
      diskUsage: 38,
      networkUsage: 28,
      databaseConnections: 156,
      activeUsers: 1234
    },
    errors: [
      { type: '404', count: 234, percentage: 45.2 },
      { type: '500', count: 123, percentage: 23.8 },
      { type: '403', count: 89, percentage: 17.2 },
      { type: '502', count: 45, percentage: 8.7 },
      { type: 'other', count: 27, percentage: 5.2 }
    ]
  },
  trends: {
    daily: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
      views: Math.floor(Math.random() * 5000) + 15000,
      users: Math.floor(Math.random() * 1000) + 3000,
      engagement: Math.floor(Math.random() * 10) + 5
    })),
    hourly: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      views: Math.floor(Math.random() * 2000) + 500,
      users: Math.floor(Math.random() * 400) + 100
    }))
  }
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d')
  const [activeTab, setActiveTab] = useState('overview')
  const [autoRefresh, setAutoRefresh] = useState(false)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = Math.floor(minutes % 60)
    if (hours > 0) return `${hours}h ${mins}m`
    return `${mins}m`
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-green-500" />
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />
      case 'tablet':
        return <Tablet className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const handleExportReport = () => {
    // Simulate report generation
    alert('正在生成分析报告，完成后将通过邮件发送到您的邮箱')
  }

  return (
    <MainLayout>
      <div className="container-dashboard py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              数据分析
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              内容和用户行为分析报告
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">最近7天</SelectItem>
                <SelectItem value="30d">最近30天</SelectItem>
                <SelectItem value="90d">最近90天</SelectItem>
                <SelectItem value="1y">最近1年</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? 'bg-green-50 border-green-200' : ''}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? '自动刷新' : '手动刷新'}
            </Button>
            <Button onClick={handleExportReport} className="btn-primary">
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              概览
            </TabsTrigger>
            <TabsTrigger value="content">
              <FileText className="w-4 h-4 mr-2" />
              内容分析
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              用户分析
            </TabsTrigger>
            <TabsTrigger value="system">
              <Server className="w-4 h-4 mr-2" />
              系统分析
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">总浏览量</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatNumber(mockAnalyticsData.overview.totalViews)}
                      </p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +12.5% 环比上月
                      </p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">总用户</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatNumber(mockAnalyticsData.overview.totalUsers)}
                      </p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +8.7% 环比上月
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">总内容</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatNumber(mockAnalyticsData.overview.totalContent)}
                      </p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +15.2% 环比上月
                      </p>
                    </div>
                    <FileText className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">总评论</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatNumber(mockAnalyticsData.overview.totalComments)}
                      </p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +22.3% 环比上月
                      </p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Engagement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">跳出率</span>
                    <Target className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-xl font-bold">{formatPercentage(mockAnalyticsData.overview.bounceRate)}</span>
                    <span className="text-sm text-green-600">-2.1%</span>
                  </div>
                  <Progress value={mockAnalyticsData.overview.bounceRate} className="mt-2 h-2" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">平均会话时长</span>
                    <Clock className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-xl font-bold">{formatDuration(mockAnalyticsData.overview.avgSessionDuration)}</span>
                    <span className="text-sm text-green-600">+12%</span>
                  </div>
                  <Progress value={(mockAnalyticsData.overview.avgSessionDuration / 10) * 100} className="mt-2 h-2" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">新用户比例</span>
                    <Star className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-xl font-bold">{formatPercentage(mockAnalyticsData.overview.newUsersRate)}</span>
                    <span className="text-sm text-green-600">+5.3%</span>
                  </div>
                  <Progress value={mockAnalyticsData.overview.newUsersRate} className="mt-2 h-2" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">回访用户比例</span>
                    <Heart className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-xl font-bold">{formatPercentage(mockAnalyticsData.overview.returnUsersRate)}</span>
                    <span className="text-sm text-green-600">+3.2%</span>
                  </div>
                  <Progress value={mockAnalyticsData.overview.returnUsersRate} className="mt-2 h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Trends Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  流量趋势 (最近30天)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">流量趋势图表</p>
                    <p className="text-sm text-gray-500">实际应用中将显示Chart.js或Recharts图表</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Analytics Tab */}
          <TabsContent value="content">
            <div className="grid gap-6">
              {/* Top Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    热门内容
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalyticsData.contentAnalytics.topContent.map((content, index) => (
                      <div key={content.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-medium mr-4">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">{content.title}</h3>
                            <Badge variant="outline">{content.category}</Badge>
                            {getTrendIcon(content.trend)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{formatNumber(content.views)} 浏览</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{formatNumber(content.likes)} 点赞</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{content.comments} 评论</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Share2 className="w-4 h-4" />
                              <span>{content.shares} 分享</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {content.publishedAt.toLocaleDateString('zh-CN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Category Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    分类统计
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {mockAnalyticsData.contentAnalytics.categoryStats.map((category) => (
                      <div key={category.category} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{category.category}</h3>
                            <div className="flex items-center gap-4 text-sm">
                              <span>{category.count} 篇内容</span>
                              <span>{formatNumber(category.views)} 浏览</span>
                              <span className={`flex items-center gap-1 ${category.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {category.growth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {Math.abs(category.growth).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <Progress value={(category.views / 250000) * 100} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    互动统计
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <ThumbsUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{formatNumber(mockAnalyticsData.contentAnalytics.engagement.totalLikes)}</p>
                      <p className="text-sm text-gray-600">总点赞数</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <MessageSquare className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{formatNumber(mockAnalyticsData.contentAnalytics.engagement.totalComments)}</p>
                      <p className="text-sm text-gray-600">总评论数</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Share2 className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{formatNumber(mockAnalyticsData.contentAnalytics.engagement.totalShares)}</p>
                      <p className="text-sm text-gray-600">总分享数</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{mockAnalyticsData.contentAnalytics.engagement.avgEngagementRate}%</p>
                      <p className="text-sm text-gray-600">平均互动率</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Analytics Tab */}
          <TabsContent value="users">
            <div className="grid gap-6">
              {/* Demographics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Age Groups */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">年龄分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAnalyticsData.userAnalytics.demographics.ageGroups.map((group) => (
                        <div key={group.range} className="flex items-center justify-between">
                          <span className="text-sm">{group.range}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${group.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{group.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Locations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">地域分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAnalyticsData.userAnalytics.demographics.locations.map((location) => (
                        <div key={location.city} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{location.city}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${location.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{location.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Devices */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">设备分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAnalyticsData.userAnalytics.demographics.devices.map((device) => (
                        <div key={device.type} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getDeviceIcon(device.type)}
                            <span className="text-sm capitalize">{device.type === 'mobile' ? '手机' : device.type === 'tablet' ? '平板' : '桌面'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full" 
                                style={{ width: `${device.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{device.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* User Behavior */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    用户行为
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 border rounded-lg">
                      <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-xl font-bold">{mockAnalyticsData.userAnalytics.behavior.avgPageViews}</p>
                      <p className="text-sm text-gray-600">平均页面浏览量</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-xl font-bold">{formatDuration(mockAnalyticsData.userAnalytics.behavior.avgSessionDuration)}</p>
                      <p className="text-sm text-gray-600">平均会话时长</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Target className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <p className="text-xl font-bold">{mockAnalyticsData.userAnalytics.behavior.bounceRate}%</p>
                      <p className="text-sm text-gray-600">跳出率</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <p className="text-xl font-bold">{mockAnalyticsData.userAnalytics.behavior.returnVisitorRate}%</p>
                      <p className="text-sm text-gray-600">回访率</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium mb-3">热门页面</h3>
                    {mockAnalyticsData.userAnalytics.behavior.topPages.map((page, index) => (
                      <div key={page.path} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm flex items-center justify-center">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium">{page.title}</p>
                            <p className="text-sm text-gray-600">{page.path}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatNumber(page.views)}</p>
                          <p className="text-sm text-gray-600">浏览量</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    流量来源
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalyticsData.userAnalytics.acquisition.sources.map((source) => (
                      <div key={source.source} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium capitalize">
                              {source.source === 'direct' ? '直接访问' : 
                               source.source === 'search' ? '搜索引擎' :
                               source.source === 'social' ? '社交媒体' :
                               source.source === 'referral' ? '推荐链接' : '邮件营销'}
                            </h3>
                            <div className="flex items-center gap-4 text-sm">
                              <span>{formatNumber(source.visits)} 访问</span>
                              <span>{source.percentage}%</span>
                            </div>
                          </div>
                          <Progress value={source.percentage} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Analytics Tab */}
          <TabsContent value="system">
            <div className="grid gap-6">
              {/* System Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    系统性能
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Activity className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-xl font-bold">{mockAnalyticsData.systemAnalytics.performance.avgResponseTime}ms</p>
                      <p className="text-sm text-gray-600">平均响应时间</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-xl font-bold">{mockAnalyticsData.systemAnalytics.performance.uptime}%</p>
                      <p className="text-sm text-gray-600">系统可用性</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <p className="text-xl font-bold">{mockAnalyticsData.systemAnalytics.performance.errorRate}%</p>
                      <p className="text-sm text-gray-600">错误率</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <p className="text-xl font-bold">{formatNumber(mockAnalyticsData.systemAnalytics.performance.throughput)}</p>
                      <p className="text-sm text-gray-600">每秒请求数</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resource Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    资源使用情况
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Server className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium">CPU 使用率</span>
                          </div>
                          <span className="text-sm font-bold">{mockAnalyticsData.systemAnalytics.resources.cpuUsage}%</span>
                        </div>
                        <Progress value={mockAnalyticsData.systemAnalytics.resources.cpuUsage} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Database className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium">内存使用率</span>
                          </div>
                          <span className="text-sm font-bold">{mockAnalyticsData.systemAnalytics.resources.memoryUsage}%</span>
                        </div>
                        <Progress value={mockAnalyticsData.systemAnalytics.resources.memoryUsage} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <HardDrive className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">磁盘使用率</span>
                          </div>
                          <span className="text-sm font-bold">{mockAnalyticsData.systemAnalytics.resources.diskUsage}%</span>
                        </div>
                        <Progress value={mockAnalyticsData.systemAnalytics.resources.diskUsage} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Wifi className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-medium">网络使用率</span>
                          </div>
                          <span className="text-sm font-bold">{mockAnalyticsData.systemAnalytics.resources.networkUsage}%</span>
                        </div>
                        <Progress value={mockAnalyticsData.systemAnalytics.resources.networkUsage} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">数据库连接</span>
                        <span className="font-bold">{mockAnalyticsData.systemAnalytics.resources.databaseConnections}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">在线用户</span>
                        <span className="font-bold">{formatNumber(mockAnalyticsData.systemAnalytics.resources.activeUsers)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Error Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    错误分析
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalyticsData.systemAnalytics.errors.map((error) => (
                      <div key={error.type} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full font-medium">
                            {error.type}
                          </div>
                          <span className="font-medium">
                            {error.type === '404' ? '页面未找到' :
                             error.type === '500' ? '服务器错误' :
                             error.type === '403' ? '访问被拒绝' :
                             error.type === '502' ? '网关错误' : '其他错误'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">{error.count} 次</span>
                          <span className="text-sm text-gray-600">{error.percentage}%</span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${error.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
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