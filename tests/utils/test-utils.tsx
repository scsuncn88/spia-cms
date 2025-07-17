import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { vi } from 'vitest'

// Re-export everything
export * from '@testing-library/react'

// Mock user data generators
export const createMockUser = (overrides = {}) => ({
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  name: 'Test User',
  avatar: 'https://example.com/avatar.jpg',
  role: 'editor',
  status: 'active',
  permissions: ['read', 'write'],
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z'),
  lastLoginAt: new Date('2024-01-01T00:00:00Z'),
  ...overrides
})

export const createMockContent = (overrides = {}) => ({
  id: '1',
  title: 'Test Content',
  content: 'This is test content',
  excerpt: 'Test excerpt',
  status: 'published',
  category: 'general',
  tags: ['test'],
  author: createMockUser(),
  publishedAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z'),
  views: 100,
  likes: 10,
  comments: 5,
  ...overrides
})

export const createMockComment = (overrides = {}) => ({
  id: '1',
  content: 'Test comment',
  author: createMockUser(),
  status: 'approved',
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-01T00:00:00Z'),
  replies: [],
  ...overrides
})

// Custom render function
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return render(ui, options)
}

export { customRender as render }

// Export vitest utilities
export {
  vi,
  expect,
  describe,
  it,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll
} from 'vitest'