'use client'

import React, { useState } from 'react'
import { 
  Image, 
  Search, 
  Filter, 
  Plus, 
  Upload, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  FolderPlus, 
  Folder, 
  FileText, 
  Video, 
  Music, 
  File, 
  Grid, 
  List, 
  Calendar, 
  User, 
  Tag, 
  Copy, 
  Move, 
  Share, 
  Lock, 
  Unlock,
  MoreVertical,
  X,
  Check,
  AlertCircle,
  Info,
  ImageIcon,
  FileVideo,
  FileAudio,
  FileImage
} from 'lucide-react'
import MainLayout from '@/components/Layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { MediaFile, MediaFolder, Tag as TagType } from '@/types'
import { mockUser } from '@/lib/permissions'

// Mock data for media files
const mockMediaFiles: MediaFile[] = [
  {
    id: '1',
    name: 'airport-terminal.jpg',
    originalName: '浦东机场航站楼.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 1024000,
    url: '/images/airport-terminal.jpg',
    thumbnailUrl: '/images/thumbs/airport-terminal.jpg',
    metadata: {
      width: 1920,
      height: 1080,
      alt: '浦东机场航站楼外观',
      caption: '浦东机场T2航站楼',
      checksum: 'abc123def456'
    },
    tags: [
      { id: '1', name: '机场', slug: 'airport', count: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: '2', name: '航站楼', slug: 'terminal', count: 8, createdAt: new Date(), updatedAt: new Date() }
    ],
    folder: {
      id: '1',
      name: '机场设施',
      path: '/机场设施',
      parent: undefined,
      children: [],
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    uploader: mockUser,
    createdAt: new Date('2024-01-10T10:00:00'),
    updatedAt: new Date('2024-01-10T10:00:00'),
    accessCount: 45,
    isPublic: true,
    expiresAt: undefined
  },
  {
    id: '2',
    name: 'security-check.mp4',
    originalName: '安检流程演示.mp4',
    type: 'video',
    mimeType: 'video/mp4',
    size: 15360000,
    url: '/videos/security-check.mp4',
    thumbnailUrl: '/images/thumbs/security-check.jpg',
    metadata: {
      width: 1280,
      height: 720,
      duration: 120,
      bitrate: 2000,
      format: 'mp4',
      checksum: 'def456ghi789'
    },
    tags: [
      { id: '3', name: '安检', slug: 'security', count: 12, createdAt: new Date(), updatedAt: new Date() },
      { id: '4', name: '流程', slug: 'process', count: 20, createdAt: new Date(), updatedAt: new Date() }
    ],
    folder: {
      id: '2',
      name: '培训视频',
      path: '/培训视频',
      parent: undefined,
      children: [],
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    uploader: mockUser,
    createdAt: new Date('2024-01-12T14:30:00'),
    updatedAt: new Date('2024-01-12T14:30:00'),
    accessCount: 23,
    isPublic: false,
    expiresAt: undefined
  },
  {
    id: '3',
    name: 'emergency-notice.pdf',
    originalName: '应急通知模板.pdf',
    type: 'document',
    mimeType: 'application/pdf',
    size: 512000,
    url: '/documents/emergency-notice.pdf',
    metadata: {
      checksum: 'ghi789jkl012'
    },
    tags: [
      { id: '5', name: '应急', slug: 'emergency', count: 6, createdAt: new Date(), updatedAt: new Date() },
      { id: '6', name: '模板', slug: 'template', count: 10, createdAt: new Date(), updatedAt: new Date() }
    ],
    folder: {
      id: '3',
      name: '文档模板',
      path: '/文档模板',
      parent: undefined,
      children: [],
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    uploader: mockUser,
    createdAt: new Date('2024-01-08T09:15:00'),
    updatedAt: new Date('2024-01-08T09:15:00'),
    accessCount: 67,
    isPublic: true,
    expiresAt: undefined
  },
  {
    id: '4',
    name: 'announcement-audio.mp3',
    originalName: '广播通知音频.mp3',
    type: 'audio',
    mimeType: 'audio/mpeg',
    size: 2048000,
    url: '/audio/announcement-audio.mp3',
    metadata: {
      duration: 60,
      bitrate: 320,
      format: 'mp3',
      checksum: 'jkl012mno345'
    },
    tags: [
      { id: '7', name: '广播', slug: 'broadcast', count: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: '8', name: '通知', slug: 'notice', count: 25, createdAt: new Date(), updatedAt: new Date() }
    ],
    folder: {
      id: '4',
      name: '音频素材',
      path: '/音频素材',
      parent: undefined,
      children: [],
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    uploader: mockUser,
    createdAt: new Date('2024-01-14T16:45:00'),
    updatedAt: new Date('2024-01-14T16:45:00'),
    accessCount: 12,
    isPublic: false,
    expiresAt: new Date('2024-02-14T16:45:00')
  }
]

const mockFolders: MediaFolder[] = [
  {
    id: '1',
    name: '机场设施',
    path: '/机场设施',
    parent: undefined,
    children: [],
    permissions: [],
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00')
  },
  {
    id: '2',
    name: '培训视频',
    path: '/培训视频',
    parent: undefined,
    children: [],
    permissions: [],
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00')
  },
  {
    id: '3',
    name: '文档模板',
    path: '/文档模板',
    parent: undefined,
    children: [],
    permissions: [],
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00')
  },
  {
    id: '4',
    name: '音频素材',
    path: '/音频素材',
    parent: undefined,
    children: [],
    permissions: [],
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00')
  }
]

const typeConfig = {
  image: { label: '图片', color: 'bg-blue-100 text-blue-800', icon: FileImage },
  video: { label: '视频', color: 'bg-purple-100 text-purple-800', icon: FileVideo },
  audio: { label: '音频', color: 'bg-green-100 text-green-800', icon: FileAudio },
  document: { label: '文档', color: 'bg-orange-100 text-orange-800', icon: FileText },
  other: { label: '其他', color: 'bg-gray-100 text-gray-800', icon: File }
}

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(mockMediaFiles)
  const [folders, setFolders] = useState<MediaFolder[]>(mockFolders)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [folderFilter, setFolderFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [showCreateFolder, setShowCreateFolder] = useState(false)

  const [newFolder, setNewFolder] = useState({
    name: '',
    parentId: ''
  })

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || file.type === typeFilter
    const matchesFolder = folderFilter === 'all' || file.folder.id === folderFilter
    
    return matchesSearch && matchesType && matchesFolder
  })

  const handleCreateFolder = () => {
    if (!newFolder.name) {
      alert('请输入文件夹名称')
      return
    }

    const folder: MediaFolder = {
      id: Date.now().toString(),
      name: newFolder.name,
      path: `/${newFolder.name}`,
      parent: newFolder.parentId ? folders.find(f => f.id === newFolder.parentId) : undefined,
      children: [],
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setFolders(prev => [...prev, folder])
    setShowCreateFolder(false)
    setNewFolder({ name: '', parentId: '' })
  }

  const handleDeleteFiles = (fileIds: string[]) => {
    if (confirm(`确定要删除 ${fileIds.length} 个文件吗？`)) {
      setMediaFiles(prev => prev.filter(file => !fileIds.includes(file.id)))
      setSelectedFiles([])
    }
  }

  const handleTogglePublic = (fileId: string) => {
    setMediaFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, isPublic: !file.isPublic, updatedAt: new Date() }
        : file
    ))
  }

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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

  const getTypeIcon = (type: string) => {
    const IconComponent = typeConfig[type as keyof typeof typeConfig]?.icon || File
    return <IconComponent className="w-4 h-4" />
  }

  const getTotalSize = () => {
    return mediaFiles.reduce((total, file) => total + file.size, 0)
  }

  const getFilesByType = (type: string) => {
    return mediaFiles.filter(file => file.type === type).length
  }

  return (
    <MainLayout>
      <div className="container-dashboard py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              媒体库管理
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              管理图片、视频、音频和文档文件
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowCreateFolder(true)} variant="outline">
              <FolderPlus className="w-4 h-4 mr-2" />
              新建文件夹
            </Button>
            <Button onClick={() => setShowUpload(true)} className="btn-primary">
              <Upload className="w-4 h-4 mr-2" />
              上传文件
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">总文件</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{mediaFiles.length}</p>
                </div>
                <File className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">图片</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{getFilesByType('image')}</p>
                </div>
                <ImageIcon className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">视频</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{getFilesByType('video')}</p>
                </div>
                <Video className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">音频</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{getFilesByType('audio')}</p>
                </div>
                <Music className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">总大小</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatFileSize(getTotalSize())}</p>
                </div>
                <FileText className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Folder Modal */}
        {showCreateFolder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderPlus className="w-5 h-5" />
                  新建文件夹
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">文件夹名称</label>
                  <Input
                    value={newFolder.name}
                    onChange={(e) => setNewFolder({...newFolder, name: e.target.value})}
                    placeholder="输入文件夹名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">父文件夹</label>
                  <Select value={newFolder.parentId} onValueChange={(value) => setNewFolder({...newFolder, parentId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择父文件夹（可选）" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">根目录</SelectItem>
                      {folders.map(folder => (
                        <SelectItem key={folder.id} value={folder.id}>{folder.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateFolder(false)}>
                    取消
                  </Button>
                  <Button onClick={handleCreateFolder} className="btn-primary">
                    创建
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  上传文件
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">拖拽文件到此处或点击上传</p>
                  <p className="text-sm text-gray-600">支持图片、视频、音频和文档格式</p>
                  <Button className="mt-4" onClick={() => document.getElementById('file-input')?.click()}>
                    选择文件
                  </Button>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      // Handle file upload
                      console.log('Files selected:', e.target.files)
                    }}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowUpload(false)}>
                    取消
                  </Button>
                  <Button className="btn-primary">
                    开始上传
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索文件..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="image">图片</SelectItem>
                    <SelectItem value="video">视频</SelectItem>
                    <SelectItem value="audio">音频</SelectItem>
                    <SelectItem value="document">文档</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={folderFilter} onValueChange={setFolderFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="文件夹" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部文件夹</SelectItem>
                    {folders.map(folder => (
                      <SelectItem key={folder.id} value={folder.id}>{folder.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedFiles.length > 0 && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">已选择 {selectedFiles.length} 个文件</span>
                <div className="flex items-center gap-2 ml-auto">
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    下载
                  </Button>
                  <Button size="sm" variant="outline">
                    <Move className="w-4 h-4 mr-1" />
                    移动
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="w-4 h-4 mr-1" />
                    复制
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteFiles(selectedFiles)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    删除
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setSelectedFiles([])}>
                    <X className="w-4 h-4 mr-1" />
                    取消
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Files Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleFileSelect(file.id)}
                      className="rounded"
                    />
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" onClick={() => handleTogglePublic(file.id)}>
                        {file.isPublic ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    {file.type === 'image' && file.thumbnailUrl ? (
                      <img 
                        src={file.thumbnailUrl} 
                        alt={file.metadata.alt || file.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-400">
                        {getTypeIcon(file.type)}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm truncate" title={file.originalName}>
                      {file.originalName}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Badge className={typeConfig[file.type].color} variant="secondary">
                        {getTypeIcon(file.type)}
                        <span className="ml-1">{typeConfig[file.type].label}</span>
                      </Badge>
                      <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{formatDate(file.createdAt)}</span>
                      <span>•</span>
                      <span>{file.accessCount} 访问</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedFile(file)
                        setShowDetails(true)
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      详情
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="p-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedFiles.length === filteredFiles.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFiles(filteredFiles.map(f => f.id))
                            } else {
                              setSelectedFiles([])
                            }
                          }}
                          className="rounded"
                        />
                      </th>
                      <th className="p-3 text-left font-medium">文件名</th>
                      <th className="p-3 text-left font-medium">类型</th>
                      <th className="p-3 text-left font-medium">大小</th>
                      <th className="p-3 text-left font-medium">上传者</th>
                      <th className="p-3 text-left font-medium">上传时间</th>
                      <th className="p-3 text-left font-medium">访问次数</th>
                      <th className="p-3 text-left font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file) => (
                      <tr key={file.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => handleFileSelect(file.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(file.type)}
                            <span className="font-medium">{file.originalName}</span>
                            {!file.isPublic && <Lock className="w-4 h-4 text-gray-400" />}
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={typeConfig[file.type].color} variant="secondary">
                            {typeConfig[file.type].label}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{formatFileSize(file.size)}</td>
                        <td className="p-3 text-sm text-gray-600">{file.uploader.name}</td>
                        <td className="p-3 text-sm text-gray-600">{formatDate(file.createdAt)}</td>
                        <td className="p-3 text-sm text-gray-600">{file.accessCount}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedFile(file)
                                setShowDetails(true)
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleDeleteFiles([file.id])}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredFiles.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                暂无文件
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                没有找到符合条件的文件，请调整筛选条件或上传新文件。
              </p>
              <Button onClick={() => setShowUpload(true)}>
                <Upload className="w-4 h-4 mr-2" />
                上传文件
              </Button>
            </CardContent>
          </Card>
        )}

        {/* File Details Modal */}
        {showDetails && selectedFile && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    文件详情
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* File Preview */}
                  <div>
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      {selectedFile.type === 'image' && selectedFile.thumbnailUrl ? (
                        <img 
                          src={selectedFile.thumbnailUrl} 
                          alt={selectedFile.metadata.alt || selectedFile.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-gray-400 text-6xl">
                          {getTypeIcon(selectedFile.type)}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        下载
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share className="w-4 h-4 mr-2" />
                        分享
                      </Button>
                    </div>
                  </div>

                  {/* File Information */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{selectedFile.originalName}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={typeConfig[selectedFile.type].color}>
                          {getTypeIcon(selectedFile.type)}
                          <span className="ml-1">{typeConfig[selectedFile.type].label}</span>
                        </Badge>
                        <Badge variant={selectedFile.isPublic ? "default" : "secondary"}>
                          {selectedFile.isPublic ? <Unlock className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                          {selectedFile.isPublic ? '公开' : '私有'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">系统文件名: {selectedFile.name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">文件大小</label>
                        <p className="text-sm">{formatFileSize(selectedFile.size)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">MIME类型</label>
                        <p className="text-sm">{selectedFile.mimeType}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">上传者</label>
                        <p className="text-sm">{selectedFile.uploader.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">访问次数</label>
                        <p className="text-sm">{selectedFile.accessCount}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">上传时间</label>
                        <p className="text-sm">{formatDate(selectedFile.createdAt)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">最后修改</label>
                        <p className="text-sm">{formatDate(selectedFile.updatedAt)}</p>
                      </div>
                    </div>

                    {/* Media Metadata */}
                    {selectedFile.metadata && (
                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-2 block">媒体信息</label>
                        <div className="space-y-1">
                          {selectedFile.metadata.width && selectedFile.metadata.height && (
                            <p className="text-sm">尺寸: {selectedFile.metadata.width} × {selectedFile.metadata.height}</p>
                          )}
                          {selectedFile.metadata.duration && (
                            <p className="text-sm">时长: {selectedFile.metadata.duration}秒</p>
                          )}
                          {selectedFile.metadata.bitrate && (
                            <p className="text-sm">比特率: {selectedFile.metadata.bitrate}kbps</p>
                          )}
                          {selectedFile.metadata.alt && (
                            <p className="text-sm">Alt文本: {selectedFile.metadata.alt}</p>
                          )}
                          {selectedFile.metadata.caption && (
                            <p className="text-sm">说明: {selectedFile.metadata.caption}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">标签</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedFile.tags.map(tag => (
                          <Badge key={tag.id} variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Folder */}
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">文件夹</label>
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4" />
                        <span className="text-sm">{selectedFile.folder.name}</span>
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