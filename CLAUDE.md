🔄 项目认知与上下文
	•	始终阅读 DESIGN.md：了解最新的UI/UX设计规范、模块功能、视觉组件和动效要求。
	•	检查 INITIAL.md 与 UI_TASK.md：确认当前演示页面需要覆盖的功能模块及任务进度；若新增需求，请在文件末尾添加任务并注明日期。
	•	严格遵循设计系统：使用 Figma 设计稿中的设计令牌（配色、排版、动效参数）和组件库规范。
	•	使用 venv_linux（或对应前端开发环境）运行本地脚本、构建和测试指令。

🧱 代码结构与模块化
	•	页面与路由组织：所有演示页面放在 pages/（Next.js）或 src/routes/ 目录，每个页面使用单独文件夹管理：包括 .tsx、样式文件、测试文件和 Mock 数据。
	•	组件化设计：将各功能模块拆分为可复用组件，位于 src/components/：
	•	Header.tsx、Sidebar.tsx：全局导航
	•	Dashboard/：统计卡片、趋势图、待办列表组件
	•	ContentPublish/：富文本编辑器、媒体上传、定时发布控件、审核流程组件
	•	EmergencyNotice/：通知创建模态、优先级开关、权限跳过按钮
	•	ComplaintService/：评论列表、投诉详情时间轴、回复输入框、评分组件
	•	UserRole/：用户列表、角色列表、权限分配面板
	•	MediaLibrary/：素材卡片、批量上传、分类过滤、回收站
	•	Taxonomy/：栏目/分类树、拖拽排序、标签管理
	•	Settings/：主题切换、站点信息表单、个性化偏好面板
	•	Logs/：日志表格、搜索与导出面板
	•	样式管理：使用 Tailwind CSS 与 shadcn/ui 组件库，主题令牌在 theme.config.ts 中配置；自定义样式在 src/styles/ 中维护。
	•	工具文件：将公用工具函数和 Hook 放入 src/utils/，例如权限判断 usePermission、Mock 数据 API mockApi.ts。
	•	清晰导入：内部模块使用相对路径，跨模块或库引用使用绝对路径（@/components、@/utils 等）。

🧪 测试与可靠性
	•	组件单元测试：使用 Vitest + React Testing Library 编写测试，确保每个组件：
	1.	正常渲染场景
	2.	边界/异常场景
	3.	交互行为验证（按钮点击、表单提交、拖拽效果等）
	•	端到端测试：使用 Playwright/Cypress 撰写演示流程测试，包括：内容发布流程、多级审核、应急通知发布、投诉处理、权限切换和仪表板数据展示。
	•	Storybook 集成：将所有核心组件录入 Storybook，提供孤立环境下的组件演示，配合 Mock 数据展示不同状态。

✅ 任务管理
	•	标记任务完成：在 UI_TASK.md 中及时标记已实现的演示页面和组件，更新实现细节。
	•	新发现任务：将项目开发过程中衍生的子任务或改进建议添加到 UI_TASK.md 下“Discovered During Work”部分。

📎 风格与规范
	•	技术栈：React + TypeScript；样式使用 Tailwind CSS；UI 组件优先 shadcn/ui；动效使用 Framer Motion。
	•	代码风格：遵循 ESLint + Prettier 规范；使用绝对或相对路径统一导入；禁止直接从未审核库引入组件。
	•	可访问性：所有组件使用语义化标签（<button>、<header>、<main> 等），必须通过 aXe 或 Lighthouse 检测，并包含必要的 aria-* 属性。
	•	动效参数：统一使用 DESIGN.md 中定义的过渡时长（150ms~300ms）、缓动曲线（ease-in-out），所有动画通过 Framer Motion 实现。

📚 文档与注释
	•	更新 README.md：包含项目结构、依赖安装、启动、构建、测试和 Storybook 运行说明。
	•	组件注释：为复杂组件提供 JSDoc 注释，说明 props、用例和注意事项。
	•	维护文档：在 docs/ 目录添加流程图和页面示意图，链接 Figma 设计稿，确保团队成员可快速查阅。

🧠 AI 协作规则
	•	有疑问及时沟通：对动效细节、数据格式、Mock 接口等不明确时，先与设计或产品确认。
	•	禁止凭空创造功能：遵循已批准的设计文档和需求，不自行添加未讨论的模块。
	•	确保路径与命名存在：引用文件或组件前务必检查路径、文件名和导出名称正确。
	•	避免破坏现有代码：非必要时不修改公共组件；若需重构，请先在 UI_TASK.md 中记录并征得认可。