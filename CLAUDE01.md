🔄 项目认知与上下文
	•	始终阅读 DESIGN.md，了解项目的UI/UX目标、设计规范、品牌色彩与组件库要求。
	•	检查 UI_TASK.md，确认当前演示页面任务及所需功能；若任务缺失，请在列表末尾添加任务名称、简要描述和今天日期。
	•	严格遵循设计系统（如Figma设计稿中的设计令牌、组件规范和排版方案）。
	•	使用 venv_linux（或对应前端环境）执行与页面生成相关的脚本和本地构建命令。

🧱 代码结构与模块化
	•	组件化优先：将页面拆分为独立的UI组件，按照功能或视觉原子拆分文件。
例如：
	•	components/Header.tsx - 全局导航栏
	•	components/ContentForm.tsx - 多格式内容创建表单
	•	components/NotificationModal.tsx - 应急通知弹出框
	•	components/CommentList.tsx - 评论列表与审核组件
	•	页面组织：演示页面代码放在 pages/ 或 app/（Next.js）目录下，每个页面对应一个文件夹，包含.tsx、样式和测试文件。
	•	样式管理：使用 Tailwind CSS，并搭配 shadcn/ui 基础组件，所有自定义样式通过 @/styles/tokens.css 或 theme.config.ts 管理设计令牌。
	•	清晰导入：同一层级内部使用相对路径导入，跨层级使用绝对别名 @/components 或 @/styles，保持导入一致性。

🧪 测试与可靠性
	•	组件级测试：为关键UI组件编写 React Testing Library 或 Vitest 测试用例，至少包含：
	1.	正常渲染场景
	2.	边界或异常场景
	3.	交互行为验证（如按钮点击、表单提交）
	•	端到端演示测试：使用 Playwright 或 Cypress 编写演示流程测试，覆盖页面主要功能点：内容创建、审核流展示、评论交互、投诉处理等。
	•	Storybook 文档：将UI组件录入 Storybook，用于演示各组件状态和交互动效，保证组件在孤立环境下可视化展示。

✅ 任务完成与更新
	•	在 UI_TASK.md 标记已完成任务，包含第几页、涉及哪些组件、实现细节。
	•	新发现的子任务（如补充设计稿中遗漏的交互动效）添加到 UI_TASK.md 下的“Discovered During Work”小节。

📎 样式与规范
	•	使用 React + TypeScript。
	•	遵循 ESLint + Prettier 规则，保证代码风格统一。
	•	UI 组件库：优先复用 shadcn/ui 及 lucide-react 图标，禁止自行从外部引入未经审查的第三方库。
	•	交互动效：使用 Framer Motion，所有动效参数（时长、缓动曲线）须符合 DESIGN.md 规范。
	•	排版与可访问性：使用无障碍语义标签（<button>、<header>、<main> 等），并包含 aria-* 属性，确保页面通过 aXe 检测。

📚 文档与说明
	•	更新 README.md，包括本地启动、构建、测试与 Storybook 运行命令。
	•	为复杂组件编写 doc 注释，说明组件用途、属性和示例用法。
	•	在 docs/ 目录添加演示页面流程图或设计稿链接，方便团队查阅。

🧠 AI 协作规则
	•	有疑问时及时提问设计细节，如配色、布局断点、动效时长。
	•	仅使用已批准的设计资源（Figma链接、设计令牌表），避免凭空创造样式。
	•	确认文件路径与组件名称存在后再在代码或测试中引用。
	•	未经明确指示，不删除或覆盖已有组件代码，如需重构需先在 UI_TASK.md 中提出并获得批准。