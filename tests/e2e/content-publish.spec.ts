import { test, expect } from '@playwright/test'

test.describe('内容发布模块', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/content-publish-demo')
  })

  test('应该能够创建新内容', async ({ page }) => {
    // 点击新建内容按钮
    await page.click('text=新建内容')
    
    // 填写表单
    await page.fill('input[id="title"]', '测试文章标题')
    await page.fill('textarea[id="content"]', '这是一篇测试文章的内容')
    
    // 添加标签
    await page.fill('input[id="tags"]', '测试标签')
    await page.press('input[id="tags"]', 'Enter')
    
    // 检查标签是否添加成功
    await expect(page.locator('text=测试标签')).toBeVisible()
    
    // 提交表单
    await page.click('button[type="submit"]')
    
    // 检查是否显示加载状态
    await expect(page.locator('text=发布中...')).toBeVisible()
    
    // 等待提交完成
    await page.waitForSelector('text=测试文章标题', { timeout: 3000 })
    
    // 验证内容是否添加到列表中
    await expect(page.locator('text=测试文章标题')).toBeVisible()
    await expect(page.locator('text=待审核')).toBeVisible()
  })

  test('应该能够预览内容', async ({ page }) => {
    await page.click('text=新建内容')
    
    await page.fill('input[id="title"]', '预览测试')
    await page.fill('textarea[id="content"]', '预览内容')
    
    // 模拟预览功能
    page.on('dialog', dialog => dialog.accept())
    await page.click('text=预览')
  })

  test('应该能够保存草稿', async ({ page }) => {
    await page.click('text=新建内容')
    
    await page.fill('input[id="title"]', '草稿测试')
    await page.fill('textarea[id="content"]', '草稿内容')
    
    // 模拟保存草稿功能
    page.on('dialog', dialog => dialog.accept())
    await page.click('text=保存草稿')
  })

  test('应该能够编辑现有内容', async ({ page }) => {
    // 点击编辑按钮
    await page.click('text=编辑')
    
    // 检查表单是否填充了现有数据
    await expect(page.locator('input[id="title"]')).toHaveValue('春运期间出行提醒')
    
    // 修改内容
    await page.fill('input[id="title"]', '修改后的标题')
    
    // 提交更改
    await page.click('button[type="submit"]')
    
    // 等待更新完成
    await page.waitForSelector('text=修改后的标题', { timeout: 3000 })
    
    // 验证更新成功
    await expect(page.locator('text=修改后的标题')).toBeVisible()
  })

  test('应该能够删除内容', async ({ page }) => {
    // 模拟确认对话框
    page.on('dialog', dialog => dialog.accept())
    
    // 点击删除按钮
    await page.click('text=删除')
    
    // 验证内容已被删除
    await expect(page.locator('text=春运期间出行提醒')).not.toBeVisible()
  })

  test('应该正确显示内容状态', async ({ page }) => {
    // 检查不同状态的内容
    await expect(page.locator('text=已发布')).toBeVisible()
    await expect(page.locator('text=待审核')).toBeVisible()
    
    // 检查状态颜色
    const publishedStatus = page.locator('text=已发布').first()
    await expect(publishedStatus).toHaveClass(/text-blue-600/)
    
    const pendingStatus = page.locator('text=待审核').first()
    await expect(pendingStatus).toHaveClass(/text-yellow-600/)
  })

  test('应该支持响应式设计', async ({ page }) => {
    // 测试移动端视口
    await page.setViewportSize({ width: 375, height: 667 })
    
    // 验证移动端布局
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=新建内容')).toBeVisible()
    
    // 测试桌面端视口
    await page.setViewportSize({ width: 1920, height: 1080 })
    
    // 验证桌面端布局
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=新建内容')).toBeVisible()
  })
})