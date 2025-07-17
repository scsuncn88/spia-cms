import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  AlertTriangle, 
  MessageSquare, 
  BookOpen, 
  LayoutDashboard, 
  Users, 
  Shield,
  Image,
  Tag,
  Settings,
  Activity,
  BarChart3
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">浦东机场小程序后台管理系统</h1>
          <p className="text-xl text-gray-600">
            现代化的企业级后台管理系统演示平台
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">系统功能</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <LayoutDashboard className="h-4 w-4" />
                  仪表板
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard">
                  <Button size="sm" className="w-full">查看演示</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4" />
                  内容管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/examples/content-publish-demo">
                  <Button size="sm" className="w-full">查看演示</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertTriangle className="h-4 w-4" />
                  应急通知
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/examples/emergency-notice-demo">
                  <Button size="sm" className="w-full">查看演示</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageSquare className="h-4 w-4" />
                  投诉服务
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/examples/complaint-service-demo">
                  <Button size="sm" className="w-full">查看演示</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4" />
                  用户管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full" variant="outline" disabled>
                  开发中
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="h-4 w-4" />
                  角色权限
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full" variant="outline" disabled>
                  开发中
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Image className="h-4 w-4" />
                  媒体库
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full" variant="outline" disabled>
                  开发中
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Tag className="h-4 w-4" />
                  分类标签
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full" variant="outline" disabled>
                  开发中
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Settings className="h-4 w-4" />
                  系统设置
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full" variant="outline" disabled>
                  开发中
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-4 w-4" />
                  操作日志
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full" variant="outline" disabled>
                  开发中
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-4 w-4" />
                  数据分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full" variant="outline" disabled>
                  开发中
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              组件文档
            </CardTitle>
            <CardDescription>
              查看 Storybook 组件文档和使用指南
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              运行 <code className="bg-gray-100 px-2 py-1 rounded">npm run storybook</code> 启动组件文档服务
            </p>
            <div className="flex gap-2">
              <Button variant="outline">
                <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">
                  打开 Storybook
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">技术栈</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 
              'Lucide React', 'Recharts', 'Zustand', 'React Query',
              'React Hook Form', 'Zod', 'Framer Motion', 'ESLint'
            ].map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}