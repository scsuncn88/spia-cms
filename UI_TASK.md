UI_TASK.md

核心页面开发 (To Do)
	•	content-publish-demo.tsx：开发内容发布管理演示页面（富文本编辑、媒体上传、多级审核、定时发布）
	•	emergency-notice-demo.tsx：开发应急通知管理演示页面（紧急优先级、权限跳过、一键发布）
	•	complaint-service-demo.tsx：开发投诉与服务管理演示页面（评论审核、投诉时间轴、在线回复与评分）
	•	user-role-demo.tsx：开发用户与角色管理界面（账号增删改、角色配置、RBAC权限分配）
	•	dashboard-demo.tsx：开发首页仪表板页面（统计卡片、待办列表、趋势图）
	•	data-report-demo.tsx：开发数据分析与报表页面（图表展示、原始数据与报表导出）
	•	media-library-demo.tsx：开发多媒体素材库管理页面（批量上传、分类、重复校验、回收站）
	•	taxonomy-demo.tsx：开发栏目/标签/分类管理页面（拖拽排序、层级管理）
	•	settings-demo.tsx：开发系统设置与主题切换页面（站点信息、安全设置、浅/深色模式）
	•	logs-demo.tsx：开发操作日志与审计页面（日志查询、详情查看、导出）

交互动效与响应式
	•	为所有页面与组件添加动效（按钮反馈、页面过渡、拖拽动画等），使用 Framer Motion 或 CSS 动画
	•	实现响应式适配，在 PC 与平板上均有良好展示：侧边菜单折叠、表格横滑或卡片模式

测试与质量保证
	•	编写组件单元测试 (Vitest + React Testing Library)，覆盖渲染、边界和交互场景
	•	编写端到端演示测试 (Playwright/Cypress)，覆盖主要用户流程（内容发布、审核、应急发布、投诉处理、权限校验、数据展示）
	•	在Storybook中集成所有核心组件，补充示例文档和交互演示

文档与协作
	•	更新 README.md：项目结构、环境搭建、启动/构建/测试/Storybook 运行说明
	•	在 UI_TASK.md 中标记已完成任务，并将新发现子任务添加到“Discovered During Work”小节
	•	确认 DESIGN.md、INITIAL.md、claude.md 文档链接和内容同步最新需求

⸻

开始日期：2025-07-16