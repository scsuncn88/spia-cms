# 小程序旅客服务管理平台

一个现代化的旅客服务管理平台演示系统，提供内容发布、应急通知、投诉处理等核心功能。

## 功能特性

### 🚀 核心模块

- **内容发布模块** - 富文本编辑、媒体上传、多级审核流与定时发布
- **应急通知模块** - 快速发布、优先级设置、权限跳过流程  
- **投诉与服务模块** - 评论审核、投诉处理、时间轴展示

### 🎨 技术栈

- **框架**: React 18 + TypeScript + Next.js 14
- **样式**: Tailwind CSS + shadcn/ui
- **动效**: Framer Motion
- **测试**: Vitest + Playwright + React Testing Library
- **文档**: Storybook
- **工具**: ESLint + Prettier

### ✨ 特点

- 📱 完全响应式设计
- ♿ 无障碍支持 (WCAG 2.1 AA)
- 🌙 深色模式支持
- 🔧 组件化架构
- 🧪 完整测试覆盖
- 📖 详细文档

## 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 8.0 或更高版本

### 安装

```bash
# 克隆项目
git clone <repository-url>
cd spia-cms

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 在浏览器中打开 http://localhost:3000
```

### 构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 开发指南

### 项目结构

```
spia-cms/
├── app/                     # Next.js 应用目录
├── components/              # 可复用组件
│   ├── ui/                 # 基础 UI 组件
│   ├── Header.tsx          # 页面头部
│   ├── ContentForm.tsx     # 内容表单
│   ├── NotificationModal.tsx # 通知模态框
│   └── CommentList.tsx     # 评论列表
├── examples/               # 演示页面
│   ├── content-publish-demo.tsx
│   ├── emergency-notice-demo.tsx
│   └── complaint-service-demo.tsx
├── lib/                    # 工具函数
├── styles/                 # 样式文件
├── types/                  # TypeScript 类型定义
├── tests/                  # 测试文件
└── stories/               # Storybook 故事
```

### 开发脚本

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build           # 构建生产版本
npm run start           # 启动生产服务器

# 测试
npm run test            # 运行单元测试
npm run test:watch      # 监听模式运行测试
npm run test:e2e        # 运行端到端测试

# 代码质量
npm run lint            # 代码检查
npm run typecheck       # 类型检查

# 文档
npm run storybook       # 启动 Storybook
npm run build-storybook # 构建 Storybook
```

## 组件使用

### Header 组件

```tsx
import { Header } from '@/components/Header'

<Header
  user={{
    name: '张三',
    role: '管理员',
    avatar: '/avatar.jpg'
  }}
  onNotificationClick={() => console.log('通知')}
  onSettingsClick={() => console.log('设置')}
  onProfileClick={() => console.log('个人资料')}
/>
```

### ContentForm 组件

```tsx
import { ContentForm } from '@/components/ContentForm'

<ContentForm
  onSubmit={(data) => console.log('提交', data)}
  onPreview={(data) => console.log('预览', data)}
  onSave={(data) => console.log('保存', data)}
  isLoading={false}
  initialData={{
    title: '标题',
    content: '内容',
    type: 'article'
  }}
/>
```

### NotificationModal 组件

```tsx
import { NotificationModal } from '@/components/NotificationModal'

<NotificationModal
  isOpen={true}
  onClose={() => setIsOpen(false)}
  onSubmit={(data) => console.log('提交', data)}
  onConfirm={(data) => console.log('确认', data)}
  isLoading={false}
/>
```

### CommentList 组件

```tsx
import { CommentList } from '@/components/CommentList'

<CommentList
  comments={comments}
  onApprove={(id) => console.log('通过', id)}
  onReject={(id) => console.log('拒绝', id)}
  onReply={(id, content) => console.log('回复', id, content)}
  onView={(id) => console.log('查看', id)}
  isLoading={false}
/>
```

## 测试

### 单元测试

```bash
# 运行所有测试
npm run test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm run test -- --coverage
```

### 端到端测试

```bash
# 运行 E2E 测试
npm run test:e2e

# 调试模式
npm run test:e2e -- --debug
```

## 部署

### 构建优化

项目已配置以下优化：

- 代码分割和懒加载
- 图片优化
- CSS 优化
- 性能监控

### 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 部署到其他平台

```bash
# 构建静态文件
npm run build

# 部署 out 目录中的文件
```

## 贡献指南

### 开发规范

1. 使用 TypeScript 编写所有代码
2. 遵循 ESLint 和 Prettier 配置
3. 为新组件编写测试
4. 更新相关文档

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 添加新功能
fix: 修复问题
docs: 更新文档
style: 代码格式调整
refactor: 重构代码
test: 添加测试
chore: 构建过程或辅助工具的变动
```

### 代码审查

1. 创建功能分支
2. 提交 Pull Request
3. 确保所有测试通过
4. 等待代码审查

## 许可证

MIT License

## 联系方式

如有问题或建议，请创建 Issue 或联系开发团队。

---

*最后更新: 2024-01-16*