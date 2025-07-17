'use client'

import { 
  FileText, 
  AlertTriangle, 
  MessageSquare, 
  Users, 
  Activity,
  TrendingUp,
  TrendingDown,
  CheckCircle 
} from 'lucide-react'
import MainLayout from '@/components/Layout/MainLayout'
import StatsCard from '@/components/Dashboard/StatsCard'
import ChartCard from '@/components/Dashboard/ChartCard'

// Mock data for charts
const trafficData = [
  { name: '周一', value: 2400 },
  { name: '周二', value: 1398 },
  { name: '周三', value: 9800 },
  { name: '周四', value: 3908 },
  { name: '周五', value: 4800 },
  { name: '周六', value: 3800 },
  { name: '周日', value: 4300 }
]

const contentTypeData = [
  { name: '政策通知', value: 400 },
  { name: '服务公告', value: 300 },
  { name: '安全提醒', value: 200 },
  { name: 'FAQ', value: 100 }
]

const complaintData = [
  { name: '1月', value: 65 },
  { name: '2月', value: 59 },
  { name: '3月', value: 80 },
  { name: '4月', value: 81 },
  { name: '5月', value: 56 },
  { name: '6月', value: 55 }
]

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="container-dashboard py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            仪表板
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            浦东机场后台管理系统概览
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid-dashboard mb-8">
          <StatsCard
            title="总内容数"
            value="1,234"
            change={12.5}
            changeType="positive"
            icon={FileText}
            color="blue"
          />
          <StatsCard
            title="待审核内容"
            value="23"
            change={-5.2}
            changeType="negative"
            icon={CheckCircle}
            color="yellow"
          />
          <StatsCard
            title="应急通知"
            value="8"
            change={0}
            changeType="neutral"
            icon={AlertTriangle}
            color="red"
          />
          <StatsCard
            title="投诉处理"
            value="156"
            change={8.1}
            changeType="positive"
            icon={MessageSquare}
            color="green"
          />
          <StatsCard
            title="活跃用户"
            value="89"
            change={15.3}
            changeType="positive"
            icon={Users}
            color="purple"
          />
          <StatsCard
            title="系统状态"
            value="正常"
            icon={Activity}
            color="green"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
          <ChartCard
            title="内容发布趋势"
            type="line"
            data={trafficData}
            className="col-span-1"
          />
          <ChartCard
            title="内容类型分布"
            type="pie"
            data={contentTypeData}
            className="col-span-1"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <ChartCard
            title="投诉处理统计"
            type="bar"
            data={complaintData}
            className="col-span-1"
          />
          
          {/* Recent Activities */}
          <div className="dashboard-card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              最新活动
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    新内容已发布
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    《浦东机场春运服务指南》已成功发布
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    2分钟前
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    应急通知发布
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    恶劣天气预警通知已发布
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    15分钟前
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    投诉已处理
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    关于安检效率的投诉已解决
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    1小时前
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    用户权限更新
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    张三的权限已更新为内容审核员
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    2小时前
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}