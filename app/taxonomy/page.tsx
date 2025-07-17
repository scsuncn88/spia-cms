'use client'

import React, { useState } from 'react'
import { 
  Tag, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FolderTree, 
  Hash, 
  Palette, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  Move, 
  Copy, 
  Link, 
  BarChart3, 
  Filter, 
  Save, 
  X, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Folder,
  FileText,
  PieChart,
  Calendar,
  User
} from 'lucide-react'
import MainLayout from '@/components/Layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Category, Tag as TagType } from '@/types'
import { mockUser } from '@/lib/permissions'

// Mock data for categories and tags
const mockCategories: Category[] = [
  {
    id: '1',
    name: '出行服务',
    slug: 'travel-service',
    description: '与旅客出行相关的服务内容',
    parent: undefined,
    children: [
      {
        id: '2',
        name: '安全检查',
        slug: 'security-check',
        description: '安检流程和注意事项',
        parent: undefined,
        children: [],
        icon: 'shield',
        color: '#ef4444',
        order: 1,
        metadata: {
          seoTitle: '机场安全检查指南',
          seoDescription: '了解机场安全检查流程和注意事项',
          permissions: [],
          customFields: {}
        },
        createdAt: new Date('2024-01-10T10:00:00'),
        updatedAt: new Date('2024-01-10T10:00:00')
      },
      {
        id: '3',
        name: '行李服务',
        slug: 'baggage-service',
        description: '行李托运、提取相关服务',
        parent: undefined,
        children: [],
        icon: 'suitcase',
        color: '#3b82f6',
        order: 2,
        metadata: {
          seoTitle: '机场行李服务指南',
          seoDescription: '行李托运、提取和相关服务说明',
          permissions: [],
          customFields: {}
        },
        createdAt: new Date('2024-01-10T10:00:00'),
        updatedAt: new Date('2024-01-10T10:00:00')
      }
    ],
    icon: 'plane',
    color: '#10b981',
    order: 1,
    metadata: {
      seoTitle: '机场出行服务',
      seoDescription: '提供全方位的机场出行服务信息',
      permissions: [],
      customFields: {}
    },
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00')
  },
  {
    id: '4',
    name: '餐饮购物',
    slug: 'dining-shopping',
    description: '机场内餐饮和购物相关信息',
    parent: undefined,
    children: [
      {
        id: '5',
        name: '餐厅美食',
        slug: 'restaurant-food',
        description: '机场餐厅和美食推荐',
        parent: undefined,
        children: [],
        icon: 'utensils',
        color: '#f59e0b',
        order: 1,
        metadata: {
          seoTitle: '机场餐厅美食指南',
          seoDescription: '机场内各类餐厅和美食推荐',
          permissions: [],
          customFields: {}
        },
        createdAt: new Date('2024-01-10T10:00:00'),
        updatedAt: new Date('2024-01-10T10:00:00')
      },
      {
        id: '6',
        name: '免税购物',
        slug: 'duty-free-shopping',
        description: '免税店购物指南',
        parent: undefined,
        children: [],
        icon: 'shopping-bag',
        color: '#8b5cf6',
        order: 2,
        metadata: {
          seoTitle: '机场免税购物指南',
          seoDescription: '免税店购物攻略和商品推荐',
          permissions: [],
          customFields: {}
        },
        createdAt: new Date('2024-01-10T10:00:00'),
        updatedAt: new Date('2024-01-10T10:00:00')
      }
    ],
    icon: 'shopping-cart',
    color: '#f59e0b',
    order: 2,
    metadata: {
      seoTitle: '机场餐饮购物',
      seoDescription: '机场内餐饮和购物服务介绍',
      permissions: [],
      customFields: {}
    },
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00')
  },
  {
    id: '7',
    name: '交通接驳',
    slug: 'transportation',
    description: '机场交通和接驳服务',
    parent: undefined,
    children: [],
    icon: 'car',
    color: '#06b6d4',
    order: 3,
    metadata: {
      seoTitle: '机场交通接驳',
      seoDescription: '机场交通和接驳服务信息',
      permissions: [],
      customFields: {}
    },
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00')
  }
]

const mockTags: TagType[] = [
  {
    id: '1',
    name: '热门',
    slug: 'hot',
    description: '热门内容标签',
    color: '#ef4444',
    count: 156,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00')
  },
  {
    id: '2',
    name: '推荐',
    slug: 'recommended',
    description: '推荐内容标签',
    color: '#10b981',
    count: 89,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00')
  },
  {
    id: '3',
    name: '新手指南',
    slug: 'beginner-guide',
    description: '新手指南标签',
    color: '#3b82f6',
    count: 45,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00')
  },
  {
    id: '4',
    name: '常见问题',
    slug: 'faq',
    description: '常见问题标签',
    color: '#f59e0b',
    count: 78,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00')
  },
  {
    id: '5',
    name: '紧急情况',
    slug: 'emergency',
    description: '紧急情况相关标签',
    color: '#ef4444',
    count: 23,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00')
  },
  {
    id: '6',
    name: '便民服务',
    slug: 'public-service',
    description: '便民服务标签',
    color: '#8b5cf6',
    count: 67,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00')
  }
]

export default function TaxonomyPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [tags, setTags] = useState<TagType[]>(mockTags)
  const [activeTab, setActiveTab] = useState<'categories' | 'tags'>('categories')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null)
  const [showCreateCategory, setShowCreateCategory] = useState(false)
  const [showCreateTag, setShowCreateTag] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['1', '4'])

  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: '',
    color: '#10b981',
    icon: 'folder'
  })

  const [newTag, setNewTag] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#3b82f6'
  })

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tag.description && tag.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleCreateCategory = () => {
    if (!newCategory.name) {
      alert('请输入分类名称')
      return
    }

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      slug: newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      description: newCategory.description,
      parent: newCategory.parentId ? categories.find(c => c.id === newCategory.parentId) : undefined,
      children: [],
      icon: newCategory.icon,
      color: newCategory.color,
      order: categories.length + 1,
      metadata: {
        permissions: [],
        customFields: {}
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setCategories(prev => [...prev, category])
    setShowCreateCategory(false)
    setNewCategory({ name: '', slug: '', description: '', parentId: '', color: '#10b981', icon: 'folder' })
  }

  const handleCreateTag = () => {
    if (!newTag.name) {
      alert('请输入标签名称')
      return
    }

    const tag: TagType = {
      id: Date.now().toString(),
      name: newTag.name,
      slug: newTag.slug || newTag.name.toLowerCase().replace(/\s+/g, '-'),
      description: newTag.description,
      color: newTag.color,
      count: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setTags(prev => [...prev, tag])
    setShowCreateTag(false)
    setNewTag({ name: '', slug: '', description: '', color: '#3b82f6' })
  }

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('确定要删除此分类吗？')) {
      setCategories(prev => prev.filter(c => c.id !== categoryId))
    }
  }

  const handleDeleteTag = (tagId: string) => {
    if (confirm('确定要删除此标签吗？')) {
      setTags(prev => prev.filter(t => t.id !== tagId))
    }
  }

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const renderCategoryTree = (category: Category, level = 0) => {
    const hasChildren = category.children && category.children.length > 0
    const isExpanded = expandedCategories.includes(category.id)

    return (
      <div key={category.id} className="mb-2">
        <div 
          className={`flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors ${
            level > 0 ? 'ml-6' : ''
          }`}
        >
          <div className="flex items-center flex-1">
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleCategoryExpansion(category.id)}
                className="p-0 h-auto mr-2"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            )}
            <div 
              className="w-4 h-4 rounded mr-3" 
              style={{ backgroundColor: category.color }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{category.name}</h4>
                <Badge variant="secondary" className="text-xs">
                  {category.slug}
                </Badge>
                {category.parent && (
                  <Badge variant="outline" className="text-xs">
                    子分类
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{category.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelectedCategory(category)
                setShowDetails(true)
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              详情
            </Button>
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-1" />
              编辑
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDeleteCategory(category.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-4 mt-2">
            {category.children.map(child => renderCategoryTree(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getTopCategories = () => {
    return categories.filter(cat => !cat.parent)
  }

  const getTotalCategoryCount = () => {
    let count = 0
    const countCategories = (cats: Category[]) => {
      cats.forEach(cat => {
        count++
        if (cat.children) countCategories(cat.children)
      })
    }
    countCategories(categories)
    return count
  }

  const getTotalTagUsage = () => {
    return tags.reduce((total, tag) => total + tag.count, 0)
  }

  return (
    <MainLayout>
      <div className="container-dashboard py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              分类标签管理
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              管理内容分类和标签系统
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowCreateCategory(true)}
              variant="outline"
            >
              <FolderTree className="w-4 h-4 mr-2" />
              新建分类
            </Button>
            <Button
              onClick={() => setShowCreateTag(true)}
              className="btn-primary"
            >
              <Tag className="w-4 h-4 mr-2" />
              新建标签
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">总分类</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {getTotalCategoryCount()}
                  </p>
                </div>
                <FolderTree className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">顶级分类</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {getTopCategories().length}
                  </p>
                </div>
                <Folder className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">总标签</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{tags.length}</p>
                </div>
                <Tag className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">标签使用量</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {getTotalTagUsage()}
                  </p>
                </div>
                <Hash className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <Button
            variant={activeTab === 'categories' ? 'default' : 'outline'}
            onClick={() => setActiveTab('categories')}
          >
            <FolderTree className="w-4 h-4 mr-2" />
            分类管理
          </Button>
          <Button
            variant={activeTab === 'tags' ? 'default' : 'outline'}
            onClick={() => setActiveTab('tags')}
          >
            <Tag className="w-4 h-4 mr-2" />
            标签管理
          </Button>
        </div>

        {/* Create Category Modal */}
        {showCreateCategory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderTree className="w-5 h-5" />
                  新建分类
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">分类名称</label>
                  <Input
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    placeholder="输入分类名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">URL标识</label>
                  <Input
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                    placeholder="自动生成或手动输入"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">描述</label>
                  <Textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    placeholder="输入分类描述"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">父分类</label>
                  <Select value={newCategory.parentId} onValueChange={(value) => setNewCategory({...newCategory, parentId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择父分类（可选）" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">无父分类</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">颜色</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                      className="w-10 h-10 rounded border"
                    />
                    <Input
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                      placeholder="#10b981"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateCategory(false)}>
                    取消
                  </Button>
                  <Button onClick={handleCreateCategory} className="btn-primary">
                    创建分类
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Create Tag Modal */}
        {showCreateTag && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  新建标签
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">标签名称</label>
                  <Input
                    value={newTag.name}
                    onChange={(e) => setNewTag({...newTag, name: e.target.value})}
                    placeholder="输入标签名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">URL标识</label>
                  <Input
                    value={newTag.slug}
                    onChange={(e) => setNewTag({...newTag, slug: e.target.value})}
                    placeholder="自动生成或手动输入"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">描述</label>
                  <Textarea
                    value={newTag.description}
                    onChange={(e) => setNewTag({...newTag, description: e.target.value})}
                    placeholder="输入标签描述"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">颜色</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newTag.color}
                      onChange={(e) => setNewTag({...newTag, color: e.target.value})}
                      className="w-10 h-10 rounded border"
                    />
                    <Input
                      value={newTag.color}
                      onChange={(e) => setNewTag({...newTag, color: e.target.value})}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateTag(false)}>
                    取消
                  </Button>
                  <Button onClick={handleCreateTag} className="btn-primary">
                    创建标签
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={`搜索${activeTab === 'categories' ? '分类' : '标签'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderTree className="w-5 h-5" />
                分类管理
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCategories.map(category => renderCategoryTree(category))}
              </div>
              
              {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <FolderTree className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    暂无分类
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    没有找到符合条件的分类，请调整搜索条件或创建新分类。
                  </p>
                  <Button onClick={() => setShowCreateCategory(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    新建分类
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tags Tab */}
        {activeTab === 'tags' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                标签管理
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {filteredTags.map((tag) => (
                  <div key={tag.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div 
                      className="w-4 h-4 rounded-full mr-3" 
                      style={{ backgroundColor: tag.color }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{tag.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {tag.slug}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {tag.count} 次使用
                        </Badge>
                      </div>
                      {tag.description && (
                        <p className="text-sm text-gray-600">{tag.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>创建: {formatDate(tag.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>更新: {formatDate(tag.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedTag(tag)
                          setShowDetails(true)
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        详情
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        编辑
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteTag(tag.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredTags.length === 0 && (
                <div className="text-center py-12">
                  <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    暂无标签
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    没有找到符合条件的标签，请调整搜索条件或创建新标签。
                  </p>
                  <Button onClick={() => setShowCreateTag(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    新建标签
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Details Modal */}
        {showDetails && (selectedCategory || selectedTag) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {selectedCategory ? <FolderTree className="w-5 h-5" /> : <Tag className="w-5 h-5" />}
                    {selectedCategory ? '分类详情' : '标签详情'}
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {selectedCategory && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded" 
                        style={{ backgroundColor: selectedCategory.color }}
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{selectedCategory.name}</h3>
                        <p className="text-gray-600">{selectedCategory.slug}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">描述</h4>
                      <p className="text-sm text-gray-600">{selectedCategory.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">基本信息</h4>
                        <div className="space-y-1 text-sm">
                          <p>排序: {selectedCategory.order}</p>
                          <p>图标: {selectedCategory.icon}</p>
                          <p>层级: {selectedCategory.parent ? '子分类' : '顶级分类'}</p>
                          <p>子分类数: {selectedCategory.children?.length || 0}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">时间信息</h4>
                        <div className="space-y-1 text-sm">
                          <p>创建: {formatDate(selectedCategory.createdAt)}</p>
                          <p>更新: {formatDate(selectedCategory.updatedAt)}</p>
                        </div>
                      </div>
                    </div>
                    
                    {selectedCategory.children && selectedCategory.children.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">子分类</h4>
                        <div className="space-y-2">
                          {selectedCategory.children.map(child => (
                            <div key={child.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              <div 
                                className="w-4 h-4 rounded" 
                                style={{ backgroundColor: child.color }}
                              />
                              <span className="text-sm">{child.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {selectedTag && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full" 
                        style={{ backgroundColor: selectedTag.color }}
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{selectedTag.name}</h3>
                        <p className="text-gray-600">{selectedTag.slug}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">描述</h4>
                      <p className="text-sm text-gray-600">{selectedTag.description || '无描述'}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">使用统计</h4>
                        <div className="space-y-1 text-sm">
                          <p>使用次数: {selectedTag.count}</p>
                          <p>颜色: {selectedTag.color}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">时间信息</h4>
                        <div className="space-y-1 text-sm">
                          <p>创建: {formatDate(selectedTag.createdAt)}</p>
                          <p>更新: {formatDate(selectedTag.updatedAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  )
}