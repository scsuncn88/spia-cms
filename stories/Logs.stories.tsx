import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import LogsPage from '@/app/logs/page'

const meta: Meta<typeof LogsPage> = {
  title: 'Pages/Logs',
  component: LogsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '操作日志页面，提供系统操作记录的查看、搜索、筛选和导出功能。支持实时监控、详细查看和多种筛选条件。'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '默认的操作日志页面，显示所有日志记录和统计信息。'
      }
    }
  }
}

export const EmptyState: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '无日志记录时的空状态，引导用户了解日志功能。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <div className="w-12 h-12 text-gray-400 mx-auto mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无日志记录</h3>
            <p className="text-gray-600">没有找到符合条件的操作日志，请调整筛选条件。</p>
          </div>
        </div>
      </div>
    )
  ]
}

export const FilteredResults: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '应用筛选条件后的日志列表，展示筛选功能的效果。'
      }
    }
  }
}

export const SearchResults: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '搜索结果页面，高亮显示匹配的关键词。'
      }
    }
  }
}

export const LogDetails: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '日志详情模态框，显示单条日志的完整信息。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />
        {/* Mock log details modal */}
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">操作详情</h3>
                <button className="text-gray-400 hover:text-gray-600">×</button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-medium mb-3">基本信息</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">操作ID</label>
                    <p className="text-sm font-mono">log_1234567890</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">操作类型</label>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                      用户登录
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">详细信息</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm whitespace-pre-wrap">
{`{
  "loginMethod": "password",
  "sessionId": "sess_abc123def456",
  "location": {
    "country": "中国",
    "city": "上海"
  },
  "device": {
    "type": "desktop",
    "os": "Windows 10",
    "browser": "Chrome 91.0"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  ]
}

export const AutoRefreshEnabled: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '启用自动刷新功能的状态，显示实时数据更新。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-600"></div>
              <span className="text-sm text-green-800">自动刷新已启用</span>
            </div>
          </div>
        </div>
        <Story />
      </div>
    )
  ]
}

export const ExportProgress: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '日志导出进行中的状态，显示导出进度。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="animate-pulse rounded-full h-4 w-4 bg-blue-600"></div>
              <span className="text-sm text-blue-800">正在导出日志文件...</span>
            </div>
            <div className="mt-2 w-48 bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
        <Story />
      </div>
    )
  ]
}

export const ErrorLogs: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '错误日志视图，突出显示系统错误和异常。'
      }
    }
  }
}

export const SecurityLogs: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '安全相关日志，包括登录失败、权限变更等安全事件。'
      }
    }
  }
}

export const SystemLogs: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '系统日志视图，显示系统级别的操作记录。'
      }
    }
  }
}

export const HighVolumeData: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '大量日志数据的处理，展示性能优化和分页加载。'
      }
    }
  }
}

export const DarkMode: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '暗色主题下的操作日志页面。'
      }
    },
    backgrounds: {
      default: 'dark'
    }
  },
  decorators: [
    (Story) => (
      <div className="dark min-h-screen bg-gray-900">
        <Story />
      </div>
    )
  ]
}

export const MobileView: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '移动端视图下的操作日志页面，优化触摸交互。'
      }
    },
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}

export const TabletView: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '平板视图下的操作日志页面。'
      }
    },
    viewport: {
      defaultViewport: 'tablet'
    }
  }
}

export const LoadingState: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '日志数据加载中的状态，显示加载指示器。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center space-x-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  ]
}

export const NetworkError: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '网络错误状态，显示重试选项和错误信息。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div>
                <span className="text-sm text-red-800 block">网络连接错误</span>
                <button className="text-xs text-red-600 underline">点击重试</button>
              </div>
            </div>
          </div>
        </div>
        <Story />
      </div>
    )
  ]
}

export const RealTimeUpdates: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '实时日志更新，新增日志会动态显示在列表顶部。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-blue-600 text-white rounded-lg p-3 shadow-lg animate-bounce">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm">3 条新日志</span>
            </div>
          </div>
        </div>
        <Story />
      </div>
    )
  ]
}