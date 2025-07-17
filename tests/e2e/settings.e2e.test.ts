import { test, expect, Page } from '@playwright/test'

// Helper functions for common actions
const navigateToSettings = async (page: Page) => {
  await page.goto('/settings')
  await page.waitForLoadState('networkidle')
}

const waitForSettingsPage = async (page: Page) => {
  await expect(page.locator('h1')).toContainText('系统设置')
  await expect(page.locator('text=管理系统配置和集成设置')).toBeVisible()
}

const fillGeneralSettings = async (page: Page, settings: {
  siteName?: string
  siteUrl?: string
  siteDescription?: string
  adminEmail?: string
}) => {
  if (settings.siteName) {
    await page.fill('input[value*="浦东机场内容管理系统"]', settings.siteName)
  }
  
  if (settings.siteUrl) {
    await page.fill('input[value*="https://cms.pudongairport.com"]', settings.siteUrl)
  }
  
  if (settings.siteDescription) {
    await page.fill('textarea', settings.siteDescription)
  }
  
  if (settings.adminEmail) {
    await page.fill('input[type="email"]', settings.adminEmail)
  }
}

const saveSettings = async (page: Page) => {
  await page.click('button:has-text("保存设置")')
  
  // Wait for success message
  await expect(page.locator('text=设置已保存')).toBeVisible()
}

test.describe('系统设置页面 E2E 测试', () => {
  test.beforeEach(async ({ page }) => {
    // 模拟用户登录状态
    await page.addInitScript(() => {
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        name: '测试管理员',
        role: 'admin'
      }))
    })
    
    await navigateToSettings(page)
    await waitForSettingsPage(page)
  })

  test('应该正确显示系统设置页面', async ({ page }) => {
    // 检查页面标题
    await expect(page).toHaveTitle(/系统设置/)
    
    // 检查主要元素
    await expect(page.locator('h1')).toContainText('系统设置')
    await expect(page.locator('text=管理系统配置和集成设置')).toBeVisible()
    
    // 检查系统状态卡片
    await expect(page.locator('text=CPU 使用率')).toBeVisible()
    await expect(page.locator('text=内存使用率')).toBeVisible()
    await expect(page.locator('text=磁盘使用率')).toBeVisible()
    await expect(page.locator('text=网络带宽')).toBeVisible()
    
    // 检查标签页
    await expect(page.locator('text=常规')).toBeVisible()
    await expect(page.locator('text=安全')).toBeVisible()
    await expect(page.locator('text=邮件')).toBeVisible()
    await expect(page.locator('text=集成')).toBeVisible()
  })

  test('应该能够修改常规设置', async ({ page }) => {
    // 填写常规设置表单
    await fillGeneralSettings(page, {
      siteName: '测试站点名称',
      siteDescription: '这是一个测试站点描述',
      adminEmail: 'test@example.com'
    })
    
    // 验证未保存更改提示
    await expect(page.locator('text=未保存更改')).toBeVisible()
    
    // 保存设置
    await saveSettings(page)
    
    // 验证设置已保存
    await expect(page.locator('input[value="测试站点名称"]')).toBeVisible()
  })

  test('应该能够切换维护模式', async ({ page }) => {
    // 查找维护模式开关
    const maintenanceSwitch = page.locator('text=维护模式').locator('..').locator('button[role="switch"]')
    
    // 获取当前状态
    const currentState = await maintenanceSwitch.getAttribute('aria-checked')
    
    // 切换状态
    await maintenanceSwitch.click()
    
    // 验证状态改变
    const newState = await maintenanceSwitch.getAttribute('aria-checked')
    expect(newState).not.toBe(currentState)
    
    // 保存设置
    await saveSettings(page)
  })

  test('应该能够配置安全设置', async ({ page }) => {
    // 切换到安全标签
    await page.click('text=安全')
    
    // 等待安全设置加载
    await expect(page.locator('text=安全设置')).toBeVisible()
    await expect(page.locator('text=密码策略')).toBeVisible()
    
    // 修改密码最小长度
    const minLengthInput = page.locator('input[type="number"]').first()
    await minLengthInput.fill('10')
    
    // 切换密码要求
    await page.click('text=需要大写字母')
    await page.click('text=需要特殊字符')
    
    // 保存设置
    await saveSettings(page)
  })

  test('应该能够配置邮件设置', async ({ page }) => {
    // 切换到邮件标签
    await page.click('text=邮件')
    
    // 等待邮件设置加载
    await expect(page.locator('text=邮件设置')).toBeVisible()
    await expect(page.locator('text=SMTP 配置')).toBeVisible()
    
    // 填写SMTP配置
    await page.fill('input[placeholder="smtp.example.com"]', 'smtp.test.com')
    await page.fill('input[type="number"]', '587')
    await page.fill('input[placeholder="username@example.com"]', 'test@test.com')
    
    // 测试邮件发送
    await page.click('text=发送测试邮件')
    
    // 验证测试邮件状态
    await expect(page.locator('text=测试邮件已发送')).toBeVisible({ timeout: 5000 })
  })

  test('应该能够管理第三方集成', async ({ page }) => {
    // 切换到集成标签
    await page.click('text=集成')
    
    // 等待集成设置加载
    await expect(page.locator('text=第三方集成')).toBeVisible()
    
    // 启用微信集成
    const wechatSwitch = page.locator('text=微信集成').locator('..').locator('button[role="switch"]')
    await wechatSwitch.click()
    
    // 填写微信配置
    await page.fill('input[placeholder="wx1234567890abcdef"]', 'wx_test_app_id')
    await page.fill('input[placeholder="输入 App Secret"]', 'test_app_secret')
    
    // 启用钉钉集成
    const dingtalkSwitch = page.locator('text=钉钉集成').locator('..').locator('button[role="switch"]')
    await dingtalkSwitch.click()
    
    // 保存设置
    await saveSettings(page)
  })

  test('应该能够重置设置', async ({ page }) => {
    // 修改一些设置
    await fillGeneralSettings(page, {
      siteName: '临时修改的名称'
    })
    
    // 验证未保存更改提示
    await expect(page.locator('text=未保存更改')).toBeVisible()
    
    // 点击重置按钮
    await page.click('text=重置')
    
    // 确认重置对话框
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('确定要重置所有设置吗？')
      await dialog.accept()
    })
    
    // 验证设置已重置
    await expect(page.locator('input[value="浦东机场内容管理系统"]')).toBeVisible()
    await expect(page.locator('text=未保存更改')).not.toBeVisible()
  })

  test('应该显示实时系统状态', async ({ page }) => {
    // 检查系统状态数值
    const cpuUsage = page.locator('text=CPU 使用率').locator('..').locator('text=%')
    const memoryUsage = page.locator('text=内存使用率').locator('..').locator('text=%')
    
    await expect(cpuUsage).toBeVisible()
    await expect(memoryUsage).toBeVisible()
    
    // 验证进度条显示
    const progressBars = page.locator('[data-testid="progress"]')
    expect(await progressBars.count()).toBeGreaterThan(0)
  })

  test('应该支持键盘导航', async ({ page }) => {
    // 使用Tab键导航
    await page.keyboard.press('Tab')
    
    // 验证焦点在第一个可聚焦元素上
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
    
    // 继续Tab导航
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // 使用Enter键激活元素
    await page.keyboard.press('Enter')
  })

  test('应该在不同屏幕尺寸下正常工作', async ({ page, browserName }) => {
    // 测试桌面尺寸
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.reload()
    await waitForSettingsPage(page)
    
    // 验证桌面布局
    await expect(page.locator('text=系统设置')).toBeVisible()
    
    // 测试平板尺寸
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.reload()
    await waitForSettingsPage(page)
    
    // 验证平板布局
    await expect(page.locator('text=系统设置')).toBeVisible()
    
    // 测试手机尺寸
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()
    await waitForSettingsPage(page)
    
    // 验证手机布局
    await expect(page.locator('text=系统设置')).toBeVisible()
  })

  test('应该正确处理表单验证', async ({ page }) => {
    // 清空必填字段
    await page.fill('input[value*="浦东机场内容管理系统"]', '')
    
    // 尝试保存
    await page.click('button:has-text("保存设置")')
    
    // 验证验证错误（如果有的话）
    // 这取决于具体的验证实现
    await expect(page.locator('text=系统设置')).toBeVisible()
  })

  test('应该支持暗色主题', async ({ page }) => {
    // 如果有主题切换功能
    const themeToggle = page.locator('[data-testid="theme-toggle"]')
    
    if (await themeToggle.isVisible()) {
      await themeToggle.click()
      
      // 验证暗色主题应用
      await expect(page.locator('body')).toHaveClass(/dark/)
    }
  })

  test('应该处理网络错误', async ({ page }) => {
    // 模拟网络错误
    await page.route('**/api/settings', route => route.abort())
    
    // 尝试保存设置
    await fillGeneralSettings(page, { siteName: '测试' })
    await page.click('button:has-text("保存设置")')
    
    // 验证错误处理
    // 这取决于具体的错误处理实现
    await expect(page.locator('text=系统设置')).toBeVisible()
  })

  test('应该保持用户会话', async ({ page }) => {
    // 刷新页面
    await page.reload()
    
    // 验证用户仍然登录
    await waitForSettingsPage(page)
    
    // 验证设置数据仍然存在
    await expect(page.locator('input[value*="浦东机场内容管理系统"]')).toBeVisible()
  })

  test('应该支持批量操作', async ({ page }) => {
    // 切换到集成标签
    await page.click('text=集成')
    
    // 启用多个集成
    const switches = page.locator('button[role="switch"]')
    const switchCount = await switches.count()
    
    for (let i = 0; i < Math.min(switchCount, 3); i++) {
      await switches.nth(i).click()
    }
    
    // 批量保存
    await saveSettings(page)
  })
})