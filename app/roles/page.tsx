'use client'

import React, { useState } from 'react'
import { 
  Shield, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Key, 
  Lock, 
  Unlock, 
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  User,
  Copy,
  Save,
  X
} from 'lucide-react'
import MainLayout from '@/components/Layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Role, Permission } from '@/types'
import { DEFAULT_ROLES, DEFAULT_PERMISSIONS } from '@/lib/permissions'

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(DEFAULT_ROLES)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as Permission[]
  })

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateRole = () => {
    if (!newRole.name || !newRole.description) {
      alert('请填写角色名称和描述')
      return
    }

    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      isSystem: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setRoles(prev => [...prev, role])
    setShowCreateForm(false)
    setNewRole({ name: '', description: '', permissions: [] })
  }

  const handleUpdateRole = (roleId: string, updates: Partial<Role>) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId 
        ? { ...role, ...updates, updatedAt: new Date() }
        : role
    ))
  }

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId)
    if (role?.isSystem) {
      alert('系统角色不能删除')
      return
    }
    
    if (confirm('确定要删除此角色吗？')) {
      setRoles(prev => prev.filter(r => r.id !== roleId))
    }
  }

  const handleCloneRole = (role: Role) => {
    const clonedRole: Role = {
      ...role,
      id: Date.now().toString(),
      name: `${role.name} (副本)`,
      isSystem: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setRoles(prev => [...prev, clonedRole])
  }

  const handlePermissionToggle = (roleId: string, permission: Permission, checked: boolean) => {
    setRoles(prev => prev.map(role => {
      if (role.id !== roleId) return role
      
      const permissions = checked 
        ? [...role.permissions, permission]
        : role.permissions.filter(p => p.id !== permission.id)
      
      return { ...role, permissions, updatedAt: new Date() }
    }))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getPermissionsByResource = () => {
    const grouped = DEFAULT_PERMISSIONS.reduce((acc, permission) => {
      if (!acc[permission.resource]) {
        acc[permission.resource] = []
      }
      acc[permission.resource].push(permission)
      return acc
    }, {} as Record<string, Permission[]>)
    
    return grouped
  }

  const resourceLabels = {
    dashboard: '仪表板',
    content: '内容管理',
    emergency: '应急通知',
    complaint: '投诉管理',
    user: '用户管理',
    role: '角色管理',
    media: '媒体库',
    taxonomy: '分类标签',
    settings: '系统设置',
    logs: '操作日志',
    analytics: '数据分析'
  }

  return (
    <MainLayout>
      <div className="container-dashboard py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              角色权限管理
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              管理系统角色和权限分配
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            新建角色
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">总角色</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{roles.length}</p>
                </div>
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">系统角色</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {roles.filter(r => r.isSystem).length}
                  </p>
                </div>
                <Crown className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">自定义角色</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {roles.filter(r => !r.isSystem).length}
                  </p>
                </div>
                <User className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">总权限</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {DEFAULT_PERMISSIONS.length}
                  </p>
                </div>
                <Key className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索角色..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Create Role Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                新建角色
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">角色名称</label>
                  <Input
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                    placeholder="输入角色名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">角色描述</label>
                  <Input
                    value={newRole.description}
                    onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                    placeholder="输入角色描述"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">权限设置</label>
                <div className="space-y-4">
                  {Object.entries(getPermissionsByResource()).map(([resource, permissions]) => (
                    <div key={resource} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">{resourceLabels[resource as keyof typeof resourceLabels] || resource}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {permissions.map(permission => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={permission.id}
                              checked={newRole.permissions.some(p => p.id === permission.id)}
                              onCheckedChange={(checked) => {
                                const permissions = checked 
                                  ? [...newRole.permissions, permission]
                                  : newRole.permissions.filter(p => p.id !== permission.id)
                                setNewRole({...newRole, permissions})
                              }}
                            />
                            <label
                              htmlFor={permission.id}
                              className="text-sm cursor-pointer"
                            >
                              {permission.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  取消
                </Button>
                <Button onClick={handleCreateRole} className="btn-primary">
                  <Save className="w-4 h-4 mr-2" />
                  创建角色
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Roles List */}
        <div className="grid gap-4">
          {filteredRoles.map((role) => (
            <Card key={role.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {role.name}
                      </h3>
                      {role.isSystem && (
                        <Badge className="bg-purple-100 text-purple-800">
                          <Crown className="w-3 h-3 mr-1" />
                          系统角色
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {role.permissions.length} 权限
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {role.description}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>创建时间: {formatDate(role.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings className="w-4 h-4" />
                        <span>最后更新: {formatDate(role.updatedAt)}</span>
                      </div>
                    </div>

                    {/* Permission Summary */}
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(getPermissionsByResource()).map(([resource, permissions]) => {
                          const rolePermissions = role.permissions.filter(p => p.resource === resource)
                          if (rolePermissions.length === 0) return null
                          
                          return (
                            <Badge key={resource} variant="secondary" className="text-xs">
                              {resourceLabels[resource as keyof typeof resourceLabels] || resource}
                              <span className="ml-1">({rolePermissions.length})</span>
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCloneRole(role)}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      复制
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedRole(role)
                        setShowDetails(true)
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      详情
                    </Button>
                    {!role.isSystem && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingRole(role)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          编辑
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteRole(role.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRoles.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                暂无角色
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                没有找到符合条件的角色，请调整搜索条件或创建新角色。
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                新建角色
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Role Details Modal */}
        {showDetails && selectedRole && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    角色详情
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Role Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{selectedRole.name}</h3>
                      {selectedRole.isSystem && (
                        <Badge className="bg-purple-100 text-purple-800">
                          <Crown className="w-3 h-3 mr-1" />
                          系统角色
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{selectedRole.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">创建时间</label>
                        <p className="text-sm">{formatDate(selectedRole.createdAt)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">最后更新</label>
                        <p className="text-sm">{formatDate(selectedRole.updatedAt)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div>
                    <h4 className="font-medium mb-3">权限详情 ({selectedRole.permissions.length})</h4>
                    <div className="space-y-4">
                      {Object.entries(getPermissionsByResource()).map(([resource, permissions]) => {
                        const rolePermissions = selectedRole.permissions.filter(p => p.resource === resource)
                        if (rolePermissions.length === 0) return null
                        
                        return (
                          <div key={resource} className="border rounded-lg p-4">
                            <h5 className="font-medium mb-2 flex items-center gap-2">
                              {resourceLabels[resource as keyof typeof resourceLabels] || resource}
                              <Badge variant="outline" className="text-xs">
                                {rolePermissions.length} 权限
                              </Badge>
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {rolePermissions.map(permission => (
                                <div key={permission.id} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-sm">{permission.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Role Modal */}
        {editingRole && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="w-5 h-5" />
                    编辑角色
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setEditingRole(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">角色名称</label>
                    <Input
                      value={editingRole.name}
                      onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                      placeholder="输入角色名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">角色描述</label>
                    <Input
                      value={editingRole.description}
                      onChange={(e) => setEditingRole({...editingRole, description: e.target.value})}
                      placeholder="输入角色描述"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">权限设置</label>
                  <div className="space-y-4">
                    {Object.entries(getPermissionsByResource()).map(([resource, permissions]) => (
                      <div key={resource} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">{resourceLabels[resource as keyof typeof resourceLabels] || resource}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {permissions.map(permission => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`edit-${permission.id}`}
                                checked={editingRole.permissions.some(p => p.id === permission.id)}
                                onCheckedChange={(checked) => {
                                  const updatedPermissions = checked 
                                    ? [...editingRole.permissions, permission]
                                    : editingRole.permissions.filter(p => p.id !== permission.id)
                                  setEditingRole({...editingRole, permissions: updatedPermissions})
                                }}
                              />
                              <label
                                htmlFor={`edit-${permission.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {permission.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditingRole(null)}>
                    取消
                  </Button>
                  <Button 
                    onClick={() => {
                      handleUpdateRole(editingRole.id, editingRole)
                      setEditingRole(null)
                    }}
                    className="btn-primary"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    保存更改
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  )
}