import { describe, it, expect } from 'vitest'
import { 
  formatDate, 
  formatRelativeTime, 
  truncateText, 
  debounce, 
  generateId 
} from '@/lib/utils'

describe('utils', () => {
  describe('formatDate', () => {
    it('应该正确格式化日期', () => {
      const date = new Date('2024-01-15T10:30:00')
      const formatted = formatDate(date)
      expect(formatted).toBe('2024/01/15 10:30')
    })
  })

  describe('formatRelativeTime', () => {
    it('应该返回"刚刚"当时间差小于1分钟', () => {
      const now = new Date()
      const recent = new Date(now.getTime() - 30 * 1000) // 30秒前
      expect(formatRelativeTime(recent)).toBe('刚刚')
    })

    it('应该返回分钟数当时间差小于1小时', () => {
      const now = new Date()
      const recent = new Date(now.getTime() - 30 * 60 * 1000) // 30分钟前
      expect(formatRelativeTime(recent)).toBe('30分钟前')
    })

    it('应该返回小时数当时间差小于1天', () => {
      const now = new Date()
      const recent = new Date(now.getTime() - 5 * 60 * 60 * 1000) // 5小时前
      expect(formatRelativeTime(recent)).toBe('5小时前')
    })

    it('应该返回天数当时间差小于30天', () => {
      const now = new Date()
      const recent = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) // 5天前
      expect(formatRelativeTime(recent)).toBe('5天前')
    })

    it('应该返回格式化日期当时间差大于30天', () => {
      const now = new Date()
      const old = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000) // 60天前
      const result = formatRelativeTime(old)
      expect(result).toMatch(/\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}/)
    })
  })

  describe('truncateText', () => {
    it('应该在文本长度超过限制时截断', () => {
      const text = '这是一个很长的文本内容'
      const truncated = truncateText(text, 10)
      expect(truncated).toBe('这是一个很长的文本内容')
    })

    it('应该在文本长度超过限制时添加省略号', () => {
      const text = '这是一个很长的文本内容，需要被截断'
      const truncated = truncateText(text, 10)
      expect(truncated).toBe('这是一个很长的文本内容...')
    })

    it('应该在文本长度未超过限制时返回原文本', () => {
      const text = '短文本'
      const truncated = truncateText(text, 10)
      expect(truncated).toBe('短文本')
    })
  })

  describe('debounce', () => {
    it('应该延迟函数执行', async () => {
      let called = false
      const debouncedFn = debounce(() => {
        called = true
      }, 100)

      debouncedFn()
      expect(called).toBe(false)

      await new Promise(resolve => setTimeout(resolve, 150))
      expect(called).toBe(true)
    })

    it('应该在多次调用时只执行最后一次', async () => {
      let callCount = 0
      const debouncedFn = debounce(() => {
        callCount++
      }, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      await new Promise(resolve => setTimeout(resolve, 150))
      expect(callCount).toBe(1)
    })
  })

  describe('generateId', () => {
    it('应该生成唯一ID', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
      expect(typeof id1).toBe('string')
      expect(id1.length).toBeGreaterThan(0)
    })
  })
})