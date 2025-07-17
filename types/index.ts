// User and Authentication Types
export interface User {
  id: string
  username: string
  email: string
  name: string
  avatar?: string
  phone?: string
  department: string
  position: string
  roles: Role[]
  permissions: Permission[]
  status: 'active' | 'inactive' | 'suspended'
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
  settings: UserSettings
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
  isSystem: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Permission {
  id: string
  name: string
  resource: string
  action: string
  conditions?: Record<string, any>
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  dashboardLayout: DashboardLayout
  notifications: NotificationSettings
}

export interface NotificationSettings {
  email: boolean
  sms: boolean
  push: boolean
  categories: string[]
}

// Content Management Types
export interface Content {
  id: string
  title: string
  content: string
  excerpt?: string
  type: 'article' | 'notice' | 'announcement' | 'policy' | 'faq'
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'published' | 'archived'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  author: User
  assignee?: User
  reviewers: User[]
  categories: Category[]
  tags: Tag[]
  media: MediaFile[]
  metadata: ContentMetadata
  auditLog: AuditLog[]
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  scheduledAt?: Date
  expiresAt?: Date
  viewCount: number
  rating: number
  ratingCount: number
}

export interface ContentMetadata {
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  featured: boolean
  sticky: boolean
  allowComments: boolean
  template?: string
  customFields: Record<string, any>
}

// Emergency Notification Types
export interface EmergencyNotice {
  id: string
  title: string
  content: string
  type: 'system' | 'safety' | 'weather' | 'security' | 'service'
  priority: 'info' | 'warning' | 'error' | 'critical'
  status: 'draft' | 'pending' | 'published' | 'expired' | 'cancelled'
  scope: 'internal' | 'public' | 'passenger' | 'staff'
  channels: ('app' | 'sms' | 'email' | 'broadcast' | 'display')[]
  author: User
  approver?: User
  targetAudience: string[]
  geofence?: GeofenceArea
  metadata: NoticeMetadata
  auditLog: AuditLog[]
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  expiresAt?: Date
  stats: NoticeStats
}

export interface NoticeMetadata {
  bypassApproval: boolean
  autoExpire: boolean
  repeatInterval?: number
  conditions?: Record<string, any>
  attachments: string[]
}

export interface NoticeStats {
  sentCount: number
  deliveredCount: number
  readCount: number
  clickCount: number
  errorCount: number
}

export interface GeofenceArea {
  type: 'circle' | 'polygon'
  coordinates: number[]
  radius?: number
  name: string
}

// Complaint and Service Types
export interface Complaint {
  id: string
  title: string
  description: string
  category: 'service' | 'facility' | 'staff' | 'system' | 'safety' | 'other'
  subcategory: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'new' | 'assigned' | 'in-progress' | 'resolved' | 'closed' | 'escalated'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  source: 'web' | 'mobile' | 'email' | 'phone' | 'walk-in'
  reporter: ContactInfo
  assignee?: User
  watchers: User[]
  location?: LocationInfo
  timeline: TimelineEvent[]
  attachments: MediaFile[]
  tags: Tag[]
  metadata: ComplaintMetadata
  resolution?: Resolution
  feedback?: Feedback
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
  closedAt?: Date
  sla: SLAInfo
}

export interface ContactInfo {
  name: string
  email: string
  phone?: string
  id?: string
  type: 'passenger' | 'staff' | 'visitor' | 'anonymous'
}

export interface LocationInfo {
  terminal: string
  floor: string
  area: string
  gate?: string
  coordinates?: number[]
}

export interface TimelineEvent {
  id: string
  type: 'created' | 'assigned' | 'updated' | 'commented' | 'resolved' | 'closed'
  user: User
  description: string
  details?: Record<string, any>
  timestamp: Date
  visibility: 'public' | 'internal'
}

export interface Resolution {
  solution: string
  category: string
  preventiveMeasures?: string
  followUpRequired: boolean
  followUpDate?: Date
  satisfactionRating?: number
  internalNotes?: string
}

export interface Feedback {
  rating: number
  comment: string
  helpful: boolean
  anonymous: boolean
  createdAt: Date
}

export interface SLAInfo {
  responseTime: number
  resolutionTime: number
  escalationThreshold: number
  breached: boolean
  remainingTime: number
}

export interface ComplaintMetadata {
  escalationLevel: number
  businessImpact: 'low' | 'medium' | 'high' | 'critical'
  customerTier: 'standard' | 'premium' | 'vip'
  relatedComplaints: string[]
  rootCause?: string
  compensationOffered?: string
}

// Media and File Types
export interface MediaFile {
  id: string
  name: string
  originalName: string
  type: 'image' | 'video' | 'audio' | 'document' | 'other'
  mimeType: string
  size: number
  url: string
  thumbnailUrl?: string
  metadata: MediaMetadata
  tags: Tag[]
  folder: MediaFolder
  uploader: User
  createdAt: Date
  updatedAt: Date
  accessCount: number
  isPublic: boolean
  expiresAt?: Date
}

export interface MediaMetadata {
  width?: number
  height?: number
  duration?: number
  bitrate?: number
  format?: string
  alt?: string
  caption?: string
  location?: LocationInfo
  camera?: string
  checksum: string
}

export interface MediaFolder {
  id: string
  name: string
  path: string
  parent?: MediaFolder
  children: MediaFolder[]
  permissions: Permission[]
  createdAt: Date
  updatedAt: Date
}

// Taxonomy Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parent?: Category
  children: Category[]
  icon?: string
  color?: string
  order: number
  metadata: CategoryMetadata
  createdAt: Date
  updatedAt: Date
}

export interface Tag {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  count: number
  createdAt: Date
  updatedAt: Date
}

export interface CategoryMetadata {
  seoTitle?: string
  seoDescription?: string
  template?: string
  permissions?: Permission[]
  customFields?: Record<string, any>
}

// Dashboard and Analytics Types
export interface DashboardWidget {
  id: string
  type: 'chart' | 'stat' | 'table' | 'list' | 'custom'
  title: string
  config: WidgetConfig
  data: any
  position: WidgetPosition
  permissions: Permission[]
  refreshInterval: number
  lastUpdated: Date
}

export interface WidgetConfig {
  chartType?: 'line' | 'bar' | 'pie' | 'doughnut' | 'area'
  dataSource: string
  filters?: Record<string, any>
  groupBy?: string
  aggregation?: 'sum' | 'avg' | 'count' | 'max' | 'min'
  timeRange?: TimeRange
  displayOptions?: DisplayOptions
}

export interface WidgetPosition {
  x: number
  y: number
  width: number
  height: number
}

export interface DisplayOptions {
  showLegend: boolean
  showGrid: boolean
  showLabels: boolean
  colors: string[]
  animation: boolean
}

export interface TimeRange {
  start: Date
  end: Date
  period: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'
}

export interface DashboardLayout {
  widgets: DashboardWidget[]
  columns: number
  compact: boolean
  theme: string
}

export interface AnalyticsData {
  metrics: Metric[]
  dimensions: Dimension[]
  filters: Filter[]
  timeRange: TimeRange
  granularity: 'minute' | 'hour' | 'day' | 'week' | 'month'
  overview?: {
    totalViews: number
    totalUsers: number
    totalContent: number
    totalComments: number
    bounceRate: number
    avgSessionDuration: number
    newUsersRate: number
    returnUsersRate: number
  }
  contentAnalytics?: {
    topContent: any[]
    categoryStats: any[]
    engagement: any
  }
  userAnalytics?: {
    ageGroups: any[]
    locations: any[]
    devices: any[]
    totalActiveUsers: number
    averageSessionDuration: number
    totalSessions: number
    totalPageViews: number
    topPages: any[]
    trafficSources: any[]
  }
  systemAnalytics?: {
    totalRequests: number
    avgResponseTime: number
    errorRate: number
    uptime: number
    totalErrors: number
    databaseQueries: number
    cacheHitRate: number
    memoryUsage: number
  }
}

export interface ContentAnalytics {
  topContent: any[]
  categoryStats: any[]
  engagement: any
}

export interface UserAnalytics {
  ageGroups: any[]
  locations: any[]
  devices: any[]
  totalActiveUsers: number
  averageSessionDuration: number
  totalSessions: number
  totalPageViews: number
  topPages: any[]
  trafficSources: any[]
}

export interface SystemAnalytics {
  totalRequests: number
  avgResponseTime: number
  errorRate: number
  uptime: number
  totalErrors: number
  databaseQueries: number
  cacheHitRate: number
  memoryUsage: number
}

export interface Comment {
  id: string
  content: string
  author: User
  status: 'approved' | 'pending' | 'rejected'
  createdAt: Date
  updatedAt: Date
  replies: Comment[]
}

export interface Metric {
  name: string
  value: number
  change: number
  changePercent: number
  trend: 'up' | 'down' | 'stable'
  unit: string
  format: string
}

export interface Dimension {
  name: string
  values: DimensionValue[]
}

export interface DimensionValue {
  key: string
  value: string
  count: number
}

export interface Filter {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'nin' | 'contains'
  value: any
}

// System and Configuration Types
export interface SystemSetting {
  id: string
  key: string
  value: any
  type: 'string' | 'number' | 'boolean' | 'json' | 'array'
  category: string
  description: string
  defaultValue: any
  validation?: ValidationRule
  sensitive: boolean
  editable: boolean
  updatedBy: User
  updatedAt: Date
}

export interface ValidationRule {
  required?: boolean
  min?: number
  max?: number
  pattern?: string
  enum?: string[]
  custom?: string
}

export interface AuditLog {
  id: string
  action: string
  resource: string
  resourceId: string
  user: User
  details: Record<string, any>
  ipAddress: string
  userAgent: string
  timestamp: Date
  severity: 'info' | 'warning' | 'error' | 'critical'
  category: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message: string
  errors?: string[]
  timestamp: Date
  requestId: string
}

export interface PaginatedResponse<T = any> {
  data: T[]
  pagination: PaginationInfo
  filters?: Record<string, any>
  sort?: SortInfo
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface SortInfo {
  field: string
  order: 'asc' | 'desc'
}

// Form and UI Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date' | 'datetime'
  value: any
  options?: SelectOption[]
  validation?: ValidationRule
  placeholder?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
}

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  group?: string
}

export interface NavigationItem {
  id: string
  label: string
  icon?: string
  path?: string
  children?: NavigationItem[]
  permissions?: Permission[]
  badge?: string
  active?: boolean
  disabled?: boolean
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  actions?: ToastAction[]
  timestamp: Date
}

export interface ToastAction {
  label: string
  action: () => void
  style?: 'primary' | 'secondary' | 'destructive'
}

// Search and Filter Types
export interface SearchQuery {
  query: string
  filters: SearchFilter[]
  sort: SortInfo
  pagination: PaginationInfo
  facets?: string[]
}

export interface SearchFilter {
  field: string
  operator: string
  value: any
  label?: string
}

export interface SearchResult<T = any> {
  items: T[]
  total: number
  facets: SearchFacet[]
  suggestions: string[]
  query: SearchQuery
}

export interface SearchFacet {
  field: string
  label: string
  values: SearchFacetValue[]
}

export interface SearchFacetValue {
  value: string
  label: string
  count: number
  selected: boolean
}

// Workflow and Process Types
export interface WorkflowStep {
  id: string
  name: string
  type: 'approval' | 'review' | 'notification' | 'action' | 'condition'
  config: WorkflowStepConfig
  order: number
  required: boolean
  permissions: Permission[]
}

export interface WorkflowStepConfig {
  assignee?: User
  reviewers?: User[]
  conditions?: Record<string, any>
  actions?: WorkflowAction[]
  timeout?: number
  escalation?: EscalationConfig
}

export interface WorkflowAction {
  type: 'email' | 'sms' | 'webhook' | 'script' | 'update'
  config: Record<string, any>
  conditions?: Record<string, any>
}

export interface EscalationConfig {
  threshold: number
  assignee: User
  actions: WorkflowAction[]
}

// Export utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type EntityId = string
export type Timestamp = Date
export type EntityStatus = 'active' | 'inactive' | 'deleted'

// Common interfaces
export interface BaseEntity {
  id: EntityId
  createdAt: Timestamp
  updatedAt: Timestamp
  status: EntityStatus
}