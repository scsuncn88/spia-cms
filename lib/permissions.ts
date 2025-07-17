import { User, Permission, Role } from '@/types'

// Permission constants
export const RESOURCES = {
  DASHBOARD: 'dashboard',
  CONTENT: 'content',
  EMERGENCY: 'emergency',
  COMPLAINT: 'complaint',
  USER: 'user',
  ROLE: 'role',
  MEDIA: 'media',
  TAXONOMY: 'taxonomy',
  SETTINGS: 'settings',
  LOGS: 'logs',
  ANALYTICS: 'analytics',
} as const

export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  PUBLISH: 'publish',
  APPROVE: 'approve',
  REJECT: 'reject',
  ASSIGN: 'assign',
  EXPORT: 'export',
  IMPORT: 'import',
} as const

// Default roles and permissions
export const DEFAULT_PERMISSIONS: Permission[] = [
  // Dashboard permissions
  { id: 'dashboard:read', name: 'View Dashboard', resource: RESOURCES.DASHBOARD, action: ACTIONS.READ },
  { id: 'dashboard:analytics', name: 'View Analytics', resource: RESOURCES.DASHBOARD, action: 'analytics' },
  
  // Content permissions
  { id: 'content:create', name: 'Create Content', resource: RESOURCES.CONTENT, action: ACTIONS.CREATE },
  { id: 'content:read', name: 'View Content', resource: RESOURCES.CONTENT, action: ACTIONS.READ },
  { id: 'content:update', name: 'Edit Content', resource: RESOURCES.CONTENT, action: ACTIONS.UPDATE },
  { id: 'content:delete', name: 'Delete Content', resource: RESOURCES.CONTENT, action: ACTIONS.DELETE },
  { id: 'content:publish', name: 'Publish Content', resource: RESOURCES.CONTENT, action: ACTIONS.PUBLISH },
  { id: 'content:approve', name: 'Approve Content', resource: RESOURCES.CONTENT, action: ACTIONS.APPROVE },
  { id: 'content:reject', name: 'Reject Content', resource: RESOURCES.CONTENT, action: ACTIONS.REJECT },
  
  // Emergency permissions
  { id: 'emergency:create', name: 'Create Emergency Notice', resource: RESOURCES.EMERGENCY, action: ACTIONS.CREATE },
  { id: 'emergency:read', name: 'View Emergency Notice', resource: RESOURCES.EMERGENCY, action: ACTIONS.READ },
  { id: 'emergency:update', name: 'Edit Emergency Notice', resource: RESOURCES.EMERGENCY, action: ACTIONS.UPDATE },
  { id: 'emergency:delete', name: 'Delete Emergency Notice', resource: RESOURCES.EMERGENCY, action: ACTIONS.DELETE },
  { id: 'emergency:publish', name: 'Publish Emergency Notice', resource: RESOURCES.EMERGENCY, action: ACTIONS.PUBLISH },
  { id: 'emergency:bypass', name: 'Bypass Approval', resource: RESOURCES.EMERGENCY, action: 'bypass' },
  
  // Complaint permissions
  { id: 'complaint:create', name: 'Create Complaint', resource: RESOURCES.COMPLAINT, action: ACTIONS.CREATE },
  { id: 'complaint:read', name: 'View Complaint', resource: RESOURCES.COMPLAINT, action: ACTIONS.READ },
  { id: 'complaint:update', name: 'Edit Complaint', resource: RESOURCES.COMPLAINT, action: ACTIONS.UPDATE },
  { id: 'complaint:delete', name: 'Delete Complaint', resource: RESOURCES.COMPLAINT, action: ACTIONS.DELETE },
  { id: 'complaint:assign', name: 'Assign Complaint', resource: RESOURCES.COMPLAINT, action: ACTIONS.ASSIGN },
  { id: 'complaint:resolve', name: 'Resolve Complaint', resource: RESOURCES.COMPLAINT, action: 'resolve' },
  
  // User permissions
  { id: 'user:create', name: 'Create User', resource: RESOURCES.USER, action: ACTIONS.CREATE },
  { id: 'user:read', name: 'View User', resource: RESOURCES.USER, action: ACTIONS.READ },
  { id: 'user:update', name: 'Edit User', resource: RESOURCES.USER, action: ACTIONS.UPDATE },
  { id: 'user:delete', name: 'Delete User', resource: RESOURCES.USER, action: ACTIONS.DELETE },
  { id: 'user:manage', name: 'Manage Users', resource: RESOURCES.USER, action: 'manage' },
  
  // Role permissions
  { id: 'role:create', name: 'Create Role', resource: RESOURCES.ROLE, action: ACTIONS.CREATE },
  { id: 'role:read', name: 'View Role', resource: RESOURCES.ROLE, action: ACTIONS.READ },
  { id: 'role:update', name: 'Edit Role', resource: RESOURCES.ROLE, action: ACTIONS.UPDATE },
  { id: 'role:delete', name: 'Delete Role', resource: RESOURCES.ROLE, action: ACTIONS.DELETE },
  { id: 'role:assign', name: 'Assign Role', resource: RESOURCES.ROLE, action: ACTIONS.ASSIGN },
  
  // Media permissions
  { id: 'media:create', name: 'Upload Media', resource: RESOURCES.MEDIA, action: ACTIONS.CREATE },
  { id: 'media:read', name: 'View Media', resource: RESOURCES.MEDIA, action: ACTIONS.READ },
  { id: 'media:update', name: 'Edit Media', resource: RESOURCES.MEDIA, action: ACTIONS.UPDATE },
  { id: 'media:delete', name: 'Delete Media', resource: RESOURCES.MEDIA, action: ACTIONS.DELETE },
  { id: 'media:manage', name: 'Manage Media Library', resource: RESOURCES.MEDIA, action: 'manage' },
  
  // Taxonomy permissions
  { id: 'taxonomy:create', name: 'Create Category/Tag', resource: RESOURCES.TAXONOMY, action: ACTIONS.CREATE },
  { id: 'taxonomy:read', name: 'View Category/Tag', resource: RESOURCES.TAXONOMY, action: ACTIONS.READ },
  { id: 'taxonomy:update', name: 'Edit Category/Tag', resource: RESOURCES.TAXONOMY, action: ACTIONS.UPDATE },
  { id: 'taxonomy:delete', name: 'Delete Category/Tag', resource: RESOURCES.TAXONOMY, action: ACTIONS.DELETE },
  { id: 'taxonomy:manage', name: 'Manage Taxonomy', resource: RESOURCES.TAXONOMY, action: 'manage' },
  
  // Settings permissions
  { id: 'settings:read', name: 'View Settings', resource: RESOURCES.SETTINGS, action: ACTIONS.READ },
  { id: 'settings:update', name: 'Edit Settings', resource: RESOURCES.SETTINGS, action: ACTIONS.UPDATE },
  { id: 'settings:system', name: 'System Settings', resource: RESOURCES.SETTINGS, action: 'system' },
  
  // Logs permissions
  { id: 'logs:read', name: 'View Logs', resource: RESOURCES.LOGS, action: ACTIONS.READ },
  { id: 'logs:export', name: 'Export Logs', resource: RESOURCES.LOGS, action: ACTIONS.EXPORT },
  { id: 'logs:audit', name: 'View Audit Logs', resource: RESOURCES.LOGS, action: 'audit' },
  
  // Analytics permissions
  { id: 'analytics:read', name: 'View Analytics', resource: RESOURCES.ANALYTICS, action: ACTIONS.READ },
  { id: 'analytics:export', name: 'Export Analytics', resource: RESOURCES.ANALYTICS, action: ACTIONS.EXPORT },
  { id: 'analytics:advanced', name: 'Advanced Analytics', resource: RESOURCES.ANALYTICS, action: 'advanced' },
]

export const DEFAULT_ROLES: Role[] = [
  {
    id: 'admin',
    name: '系统管理员',
    description: '拥有系统所有权限',
    permissions: DEFAULT_PERMISSIONS,
    isSystem: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'editor',
    name: '内容编辑',
    description: '内容创建和编辑权限',
    permissions: DEFAULT_PERMISSIONS.filter(p => 
      p.resource === RESOURCES.DASHBOARD ||
      p.resource === RESOURCES.CONTENT ||
      p.resource === RESOURCES.MEDIA ||
      p.resource === RESOURCES.TAXONOMY
    ),
    isSystem: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'moderator',
    name: '内容审核员',
    description: '内容审核和发布权限',
    permissions: DEFAULT_PERMISSIONS.filter(p => 
      p.resource === RESOURCES.DASHBOARD ||
      (p.resource === RESOURCES.CONTENT && ['read', 'approve', 'reject', 'publish'].includes(p.action)) ||
      (p.resource === RESOURCES.COMPLAINT && ['read', 'update', 'resolve'].includes(p.action)) ||
      p.resource === RESOURCES.MEDIA && p.action === 'read'
    ),
    isSystem: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'emergency',
    name: '应急管理员',
    description: '应急通知管理权限',
    permissions: DEFAULT_PERMISSIONS.filter(p => 
      p.resource === RESOURCES.DASHBOARD ||
      p.resource === RESOURCES.EMERGENCY ||
      (p.resource === RESOURCES.LOGS && p.action === 'read')
    ),
    isSystem: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'service',
    name: '客服专员',
    description: '投诉和服务管理权限',
    permissions: DEFAULT_PERMISSIONS.filter(p => 
      p.resource === RESOURCES.DASHBOARD ||
      p.resource === RESOURCES.COMPLAINT ||
      (p.resource === RESOURCES.CONTENT && p.action === 'read')
    ),
    isSystem: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'analyst',
    name: '数据分析员',
    description: '数据分析和报表权限',
    permissions: DEFAULT_PERMISSIONS.filter(p => 
      p.resource === RESOURCES.DASHBOARD ||
      p.resource === RESOURCES.ANALYTICS ||
      (p.resource === RESOURCES.LOGS && p.action === 'read')
    ),
    isSystem: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Permission checking functions
export function hasPermission(user: User, resource: string, action: string): boolean {
  if (!user || !user.permissions) return false
  
  // Check direct permissions
  const hasDirectPermission = user.permissions.some(
    permission => permission.resource === resource && permission.action === action
  )
  
  if (hasDirectPermission) return true
  
  // Check role permissions
  if (user.roles && user.roles.length > 0) {
    for (const role of user.roles) {
      if (role.permissions) {
        const hasRolePermission = role.permissions.some(
          permission => permission.resource === resource && permission.action === action
        )
        if (hasRolePermission) return true
      }
    }
  }
  
  return false
}

export function hasAnyPermission(user: User, permissions: { resource: string; action: string }[]): boolean {
  return permissions.some(({ resource, action }) => hasPermission(user, resource, action))
}

export function hasAllPermissions(user: User, permissions: { resource: string; action: string }[]): boolean {
  return permissions.every(({ resource, action }) => hasPermission(user, resource, action))
}

export function getUserPermissions(user: User): Permission[] {
  if (!user) return []
  
  const permissions = new Map<string, Permission>()
  
  // Add direct permissions
  if (user.permissions) {
    user.permissions.forEach(permission => {
      permissions.set(permission.id, permission)
    })
  }
  
  // Add role permissions
  if (user.roles) {
    user.roles.forEach(role => {
      if (role.permissions) {
        role.permissions.forEach(permission => {
          permissions.set(permission.id, permission)
        })
      }
    })
  }
  
  return Array.from(permissions.values())
}

export function canAccessResource(user: User, resource: string): boolean {
  const userPermissions = getUserPermissions(user)
  return userPermissions.some(permission => permission.resource === resource)
}

export function filterByPermission<T extends { permissions?: Permission[] }>(
  user: User,
  items: T[],
  requiredPermission: { resource: string; action: string }
): T[] {
  if (!user) return []
  
  return items.filter(item => {
    // If item has no permissions, it's accessible to all
    if (!item.permissions || item.permissions.length === 0) {
      return true
    }
    
    // Check if user has any of the required permissions
    return item.permissions.some(permission =>
      hasPermission(user, permission.resource, permission.action)
    ) || hasPermission(user, requiredPermission.resource, requiredPermission.action)
  })
}

// Permission validation helpers
export function validatePermission(permission: Permission): boolean {
  return !!(
    permission.id &&
    permission.name &&
    permission.resource &&
    permission.action
  )
}

export function validateRole(role: Role): boolean {
  return !!(
    role.id &&
    role.name &&
    role.permissions &&
    role.permissions.every(validatePermission)
  )
}

// Mock user for testing
export const mockUser: User = {
  id: '1',
  username: 'admin',
  email: 'admin@pudongairport.com',
  name: '系统管理员',
  avatar: '/avatars/admin.jpg',
  phone: '+86 138 0000 0000',
  department: '信息技术部',
  position: '系统管理员',
  roles: [DEFAULT_ROLES[0]], // Admin role
  permissions: [],
  status: 'active',
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLoginAt: new Date(),
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
      categories: ['all']
    }
  }
}

export const mockUsers: User[] = [
  mockUser,
  {
    id: '2',
    username: 'editor',
    email: 'editor@pudongairport.com',
    name: '内容编辑',
    avatar: '/avatars/editor.jpg',
    phone: '+86 138 0000 0001',
    department: '宣传部',
    position: '内容编辑',
    roles: [DEFAULT_ROLES[1]], // Editor role
    permissions: [],
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
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
        categories: ['content']
      }
    }
  },
  {
    id: '3',
    username: 'service',
    email: 'service@pudongairport.com',
    name: '客服专员',
    avatar: '/avatars/service.jpg',
    phone: '+86 138 0000 0002',
    department: '客服部',
    position: '客服专员',
    roles: [DEFAULT_ROLES[4]], // Service role
    permissions: [],
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
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
        categories: ['complaint', 'service']
      }
    }
  }
]

// Context provider helper
export function createPermissionContext(user: User) {
  return {
    user,
    hasPermission: (resource: string, action: string) => hasPermission(user, resource, action),
    hasAnyPermission: (permissions: { resource: string; action: string }[]) => hasAnyPermission(user, permissions),
    hasAllPermissions: (permissions: { resource: string; action: string }[]) => hasAllPermissions(user, permissions),
    getUserPermissions: () => getUserPermissions(user),
    canAccessResource: (resource: string) => canAccessResource(user, resource),
  }
}