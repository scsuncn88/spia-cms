import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ContentForm } from '@/components/ContentForm'

describe('ContentForm', () => {
  it('应该正确渲染表单字段', () => {
    render(<ContentForm />)
    
    expect(screen.getByLabelText(/标题/)).toBeInTheDocument()
    expect(screen.getByLabelText(/内容/)).toBeInTheDocument()
    expect(screen.getByLabelText(/内容类型/)).toBeInTheDocument()
    expect(screen.getByLabelText(/标签/)).toBeInTheDocument()
    expect(screen.getByLabelText(/优先级/)).toBeInTheDocument()
  })

  it('应该显示必填字段标识', () => {
    render(<ContentForm />)
    
    const requiredFields = screen.getAllByText('*')
    expect(requiredFields.length).toBeGreaterThan(0)
  })

  it('应该正确处理表单提交', async () => {
    const mockOnSubmit = vi.fn()
    render(<ContentForm onSubmit={mockOnSubmit} />)
    
    const titleInput = screen.getByLabelText(/标题/)
    const contentInput = screen.getByLabelText(/内容/)
    const submitButton = screen.getByRole('button', { name: /发布/ })
    
    fireEvent.change(titleInput, { target: { value: '测试标题' } })
    fireEvent.change(contentInput, { target: { value: '测试内容' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: '测试标题',
          content: '测试内容',
          type: 'article',
          priority: 'medium'
        })
      )
    })
  })

  it('应该正确处理标签添加', () => {
    render(<ContentForm />)
    
    const tagInput = screen.getByLabelText(/标签/)
    
    fireEvent.change(tagInput, { target: { value: '测试标签' } })
    fireEvent.keyDown(tagInput, { key: 'Enter' })
    
    expect(screen.getByText('测试标签')).toBeInTheDocument()
  })

  it('应该正确处理标签删除', () => {
    render(<ContentForm />)
    
    const tagInput = screen.getByLabelText(/标签/)
    
    // 添加标签
    fireEvent.change(tagInput, { target: { value: '测试标签' } })
    fireEvent.keyDown(tagInput, { key: 'Enter' })
    
    // 删除标签
    const deleteButton = screen.getByRole('button')
    fireEvent.click(deleteButton)
    
    expect(screen.queryByText('测试标签')).not.toBeInTheDocument()
  })

  it('应该正确处理预览按钮点击', () => {
    const mockOnPreview = vi.fn()
    render(<ContentForm onPreview={mockOnPreview} />)
    
    const previewButton = screen.getByRole('button', { name: /预览/ })
    fireEvent.click(previewButton)
    
    expect(mockOnPreview).toHaveBeenCalled()
  })

  it('应该正确处理保存草稿按钮点击', () => {
    const mockOnSave = vi.fn()
    render(<ContentForm onSave={mockOnSave} />)
    
    const saveButton = screen.getByRole('button', { name: /保存草稿/ })
    fireEvent.click(saveButton)
    
    expect(mockOnSave).toHaveBeenCalled()
  })

  it('应该在加载状态下禁用按钮', () => {
    render(<ContentForm isLoading={true} />)
    
    const submitButton = screen.getByRole('button', { name: /发布中.../ })
    expect(submitButton).toBeDisabled()
    
    const previewButton = screen.getByRole('button', { name: /预览/ })
    expect(previewButton).toBeDisabled()
    
    const saveButton = screen.getByRole('button', { name: /保存草稿/ })
    expect(saveButton).toBeDisabled()
  })

  it('应该使用初始数据填充表单', () => {
    const initialData = {
      title: '初始标题',
      content: '初始内容',
      type: 'notice' as const,
      priority: 'high' as const,
      tags: ['标签1', '标签2']
    }
    
    render(<ContentForm initialData={initialData} />)
    
    expect(screen.getByDisplayValue('初始标题')).toBeInTheDocument()
    expect(screen.getByDisplayValue('初始内容')).toBeInTheDocument()
    expect(screen.getByText('标签1')).toBeInTheDocument()
    expect(screen.getByText('标签2')).toBeInTheDocument()
  })
})