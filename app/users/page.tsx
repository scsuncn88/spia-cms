'use client'

import React, { useState } from 'react'
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Shield, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  MapPin,
  Key,
  Activity,
  UserCheck,
  UserX,
  UserPlus,
  MoreVertical,
  Lock,
  Unlock,
  RefreshCw
} from 'lucide-react'
import MainLayout from '@/components/Layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User as UserType } from '@/types'
import { mockUsers, DEFAULT_ROLES } from '@/lib/permissions'

// Extended mock users data
const extendedMockUsers: UserType[] = [
  ...mockUsers,
  {
    id: '4',
    username: 'moderator',
    email: 'moderator@pudongairport.com',
    name: '内容审核员',
    avatar: '/avatars/moderator.jpg',
    phone: '+86 138 0000 0004',
    department: '宣传部',
    position: '审核员',
    roles: [DEFAULT_ROLES[2]], // Moderator role
    permissions: [],
    status: 'active',
    createdAt: new Date('2024-01-10T09:00:00'),
    updatedAt: new Date('2024-01-15T14:30:00'),
    lastLoginAt: new Date('2024-01-15T08:30:00'),
    settings: {
      theme: 'light',
      language: 'zh-CN',
      timezone: 'Asia/Shanghai',
      dashboardLayout: {
        widgets: [],
        columns: 4,
        compact: false,
        theme: 'light'
      },
      notifications: {
        email: true,
        sms: false,
        push: true,
        categories: ['content', 'moderation']
      }
    }
  },
  {
    id: '5',
    username: 'emergency',
    email: 'emergency@pudongairport.com',
    name: '应急管理员',
    avatar: '/avatars/emergency.jpg',
    phone: '+86 138 0000 0005',
    department: '应急指挥部',
    position: '应急管理员',
    roles: [DEFAULT_ROLES[3]], // Emergency role
    permissions: [],
    status: 'active',
    createdAt: new Date('2024-01-08T10:00:00'),
    updatedAt: new Date('2024-01-14T16:00:00'),
    lastLoginAt: new Date('2024-01-15T07:45:00'),
    settings: {
      theme: 'light',
      language: 'zh-CN',
      timezone: 'Asia/Shanghai',
      dashboardLayout: {
        widgets: [],
        columns: 4,
        compact: false,
        theme: 'light'
      },
      notifications: {
        email: true,
        sms: true,
        push: true,
        categories: ['emergency', 'all']
      }
    }
  },
  {
    id: '6',
    username: 'analyst',
    email: 'analyst@pudongairport.com',
    name: '数据分析员',
    avatar: '/avatars/analyst.jpg',
    phone: '+86 138 0000 0006',
    department: '数据部',
    position: '高级分析师',
    roles: [DEFAULT_ROLES[5]], // Analyst role
    permissions: [],
    status: 'inactive',
    createdAt: new Date('2024-01-05T11:30:00'),
    updatedAt: new Date('2024-01-12T09:15:00'),
    lastLoginAt: new Date('2024-01-12T18:30:00'),
    settings: {
      theme: 'dark',
      language: 'zh-CN',
      timezone: 'Asia/Shanghai',
      dashboardLayout: {
        widgets: [],
        columns: 4,
        compact: true,
        theme: 'dark'
      },
      notifications: {
        email: false,
        sms: false,
        push: false,
        categories: ['analytics']
      }
    }
  }
]

const statusConfig = {
  active: { label: '活跃', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  inactive: { label: '非活跃', color: 'bg-gray-100 text-gray-600', icon: Clock },
  suspended: { label: '停用', color: 'bg-red-100 text-red-800', icon: XCircle }
}

const departmentConfig = {
  '信息技术部': { label: '信息技术部', color: 'bg-blue-100 text-blue-800' },
  '宣传部': { label: '宣传部', color: 'bg-purple-100 text-purple-800' },
  '客服部': { label: '客服部', color: 'bg-green-100 text-green-800' },
  '应急指挥部': { label: '应急指挥部', color: 'bg-red-100 text-red-800' },
  '数据部': { label: '数据部', color: 'bg-yellow-100 text-yellow-800' }
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>(extendedMockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    name: '',
    phone: '',
    department: '',
    position: '',
    roleId: ''
  })

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesRole = roleFilter === 'all' || user.roles.some(role => role.id === roleFilter)
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter
    
    return matchesSearch && matchesStatus && matchesRole && matchesDepartment
  })

  const handleCreateUser = () => {
    if (!newUser.username || !newUser.email || !newUser.name) {
      alert('请填写必填字段')
      return
    }

    const selectedRole = DEFAULT_ROLES.find(role => role.id === newUser.roleId)
    if (!selectedRole) {
      alert('请选择角色')
      return
    }

    const user: UserType = {
      id: Date.now().toString(),
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
      phone: newUser.phone,
      department: newUser.department,
      position: newUser.position,
      roles: [selectedRole],
      permissions: [],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginAt: undefined,
      settings: {
        theme: 'light',
        language: 'zh-CN',
        timezone: 'Asia/Shanghai',
        dashboardLayout: {
          widgets: [],
          columns: 4,
          compact: false,
          theme: 'light'
        },
        notifications: {
          email: true,
          sms: false,
          push: true,
          categories: ['all']
        }
      }
    }

    setUsers(prev => [user, ...prev])
    setShowCreateForm(false)
    setNewUser({
      username: '',
      email: '',
      name: '',
      phone: '',
      department: '',
      position: '',
      roleId: ''
    })
  }

  const handleUpdateStatus = (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: newStatus, updatedAt: new Date() }
        : user
    ))
  }

  const handleDelete = (userId: string) => {
    if (confirm('确定要删除此用户吗？')) {
      setUsers(prev => prev.filter(u => u.id !== userId))
    }
  }

  const handleResetPassword = (userId: string) => {
    alert(`用户 ${users.find(u => u.id === userId)?.name} 的密码已重置`)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getIcon = (config: any, key: string) => {
    const IconComponent = config[key]?.icon || User
    return <IconComponent className="w-4 h-4" />
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-gray-500'
      case 'suspended': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getDepartments = () => {
    const departments = Array.from(new Set(users.map(user => user.department)))
    return departments.filter(dept => dept)
  }

  return (
    <MainLayout>
      <div className="container-dashboard py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              用户管理
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              管理系统用户账户和权限
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            新建用户
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">总用户</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">活跃用户</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {users.filter(u => u.status === 'active').length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">管理员</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {users.filter(u => u.roles.some(r => r.id === 'admin')).length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">今日登录</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {users.filter(u => u.lastLoginAt && 
                      u.lastLoginAt.toDateString() === new Date().toDateString()).length}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create User Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                新建用户
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">用户名 *</label>
                  <Input
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    placeholder="输入用户名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">邮箱 *</label>
                  <Input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="输入邮箱地址"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">姓名 *</label>
                  <Input
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    placeholder="输入真实姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">电话</label>
                  <Input
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    placeholder="输入电话号码"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">部门</label>
                  <Select value={newUser.department} onValueChange={(value) => setNewUser({...newUser, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择部门" />
                    </SelectTrigger>
                    <SelectContent>
                      {getDepartments().map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">职位</label>
                  <Input
                    value={newUser.position}
                    onChange={(e) => setNewUser({...newUser, position: e.target.value})}
                    placeholder="输入职位"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">角色 *</label>
                  <Select value={newUser.roleId} onValueChange={(value) => setNewUser({...newUser, roleId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择角色" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEFAULT_ROLES.map(role => (
                        <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  取消
                </Button>
                <Button onClick={handleCreateUser} className="btn-primary">
                  <UserPlus className="w-4 h-4 mr-2" />
                  创建用户
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索用户..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="active">活跃</SelectItem>
                  <SelectItem value="inactive">非活跃</SelectItem>
                  <SelectItem value="suspended">停用</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="角色筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部角色</SelectItem>
                  {DEFAULT_ROLES.map(role => (
                    <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="部门筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部部门</SelectItem>
                  {getDepartments().map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                高级筛选
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          {user.name}
                        </h3>
                        <Badge className={statusConfig[user.status].color}>
                          {getIcon(statusConfig, user.status)}
                          <span className="ml-1">{statusConfig[user.status].label}</span>
                        </Badge>
                        {user.roles.map(role => (
                          <Badge key={role.id} variant="outline" className="text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            {role.name}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>@{user.username}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{user.department}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>创建: {formatDate(user.createdAt)}</span>
                        </div>
                        {user.lastLoginAt && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>最后登录: {formatDate(user.lastLoginAt)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Settings className="w-4 h-4" />
                          <span>{user.position}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {user.status === 'active' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateStatus(user.id, 'suspended')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Lock className="w-4 h-4 mr-1" />
                        停用
                      </Button>
                    )}
                    {user.status === 'suspended' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateStatus(user.id, 'active')}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Unlock className="w-4 h-4 mr-1" />
                        激活
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResetPassword(user.id)}
                    >
                      <Key className="w-4 h-4 mr-1" />
                      重置密码
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedUser(user)
                        setShowDetails(true)
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      详情
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                暂无用户
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                没有找到符合条件的用户，请调整筛选条件或创建新用户。
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                新建用户
              </Button>
            </CardContent>
          </Card>
        )}

        {/* User Details Modal */}
        {showDetails && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    用户详情
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* User Info */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                      <AvatarFallback>{getInitials(selectedUser.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                      <p className="text-gray-600">@{selectedUser.username}</p>
                      <Badge className={statusConfig[selectedUser.status].color}>
                        {statusConfig[selectedUser.status].label}
                      </Badge>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div>
                    <h4 className="font-medium mb-3">基本信息</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">邮箱</label>
                        <p className="text-sm">{selectedUser.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">电话</label>
                        <p className="text-sm">{selectedUser.phone || '-'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">部门</label>
                        <p className="text-sm">{selectedUser.department}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">职位</label>
                        <p className="text-sm">{selectedUser.position}</p>
                      </div>
                    </div>
                  </div>

                  {/* Roles */}
                  <div>
                    <h4 className="font-medium mb-3">角色权限</h4>
                    <div className="space-y-2">
                      {selectedUser.roles.map(role => (
                        <div key={role.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{role.name}</div>
                            <div className="text-sm text-gray-600">{role.description}</div>
                          </div>
                          <Badge variant="outline">
                            {role.permissions.length} 权限
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity */}
                  <div>
                    <h4 className="font-medium mb-3">活动信息</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">创建时间</span>
                        <span className="text-sm">{formatDate(selectedUser.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">最后更新</span>
                        <span className="text-sm">{formatDate(selectedUser.updatedAt)}</span>
                      </div>
                      {selectedUser.lastLoginAt && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">最后登录</span>
                          <span className="text-sm">{formatDate(selectedUser.lastLoginAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Settings */}
                  <div>
                    <h4 className="font-medium mb-3">用户设置</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">主题</label>
                        <p className="text-sm">{selectedUser.settings.theme}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">语言</label>
                        <p className="text-sm">{selectedUser.settings.language}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">时区</label>
                        <p className="text-sm">{selectedUser.settings.timezone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">邮件通知</label>
                        <p className="text-sm">{selectedUser.settings.notifications.email ? '开启' : '关闭'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  )
}