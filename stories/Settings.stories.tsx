import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import SettingsPage from '@/app/settings/page'

const meta: Meta<typeof SettingsPage> = {
  title: 'Pages/Settings',
  component: SettingsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '系统设置页面，提供全面的系统配置管理，包括常规设置、安全配置、邮件设置、存储配置、备份管理和第三方集成等功能。'
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
        story: '默认的系统设置页面，显示常规设置标签页和系统状态监控。'
      }
    }
  }
}

export const GeneralSettings: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '常规设置标签页，包含站点信息、时区语言设置和基础功能开关。'
      }
    }
  }
}

export const SecuritySettings: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '安全设置标签页，配置密码策略、会话管理和访问控制。'
      }
    }
  }
}

export const EmailSettings: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '邮件设置标签页，配置SMTP服务器和邮件发送参数。'
      }
    }
  }
}

export const StorageSettings: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '存储设置标签页，管理文件存储、CDN配置和媒体处理。'
      }
    }
  }
}

export const BackupSettings: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '备份设置标签页，配置自动备份策略和存储位置。'
      }
    }
  }
}

export const IntegrationSettings: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '第三方集成设置，管理微信、钉钉、飞书等平台的API配置。'
      }
    }
  }
}

export const SystemStatus: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '系统状态监控，实时显示CPU、内存、磁盘和网络使用情况。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-500 rounded" />
                  <span className="text-sm font-medium">CPU 使用率</span>
                </div>
                <span className="text-sm font-bold">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded" />
                  <span className="text-sm font-medium">内存使用率</span>
                </div>
                <span className="text-sm font-bold">62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }} />
              </div>
            </div>
          </div>
        </div>
        <Story />
      </div>
    )
  ]
}

export const UnsavedChanges: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '有未保存更改时的状态，显示未保存标识和保存提醒。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
              <p className="text-gray-600">管理系统配置和集成设置</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded animate-pulse">
                未保存更改
              </span>
              <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                重置
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                保存设置
              </button>
            </div>
          </div>
        </div>
        <Story />
      </div>
    )
  ]
}

export const DarkMode: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '暗色主题下的系统设置页面。'
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
        story: '移动端视图下的系统设置页面，标签页采用堆叠布局。'
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
        story: '平板视图下的系统设置页面。'
      }
    },
    viewport: {
      defaultViewport: 'tablet'
    }
  }
}

export const FormValidation: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '表单验证状态，显示错误提示和验证反馈。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <style jsx>{`
          .error-field {
            border-color: #ef4444;
            box-shadow: 0 0 0 1px #ef4444;
          }
          .error-message {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
          }
        `}</style>
        <Story />
      </div>
    )
  ]
}

export const PasswordVisible: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '密码字段显示状态，展示密码可见性切换功能。'
      }
    }
  }
}

export const IntegrationEnabled: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '第三方集成已启用的状态，显示配置表单和连接状态。'
      }
    }
  }
}

export const BackupInProgress: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '备份进行中的状态，显示进度指示器。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-blue-800">正在备份系统数据...</span>
            </div>
            <div className="mt-2 w-48 bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
        <Story />
      </div>
    )
  ]
}

export const SuccessMessage: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '设置保存成功后的状态提示。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                  <path d="M6.5 0L8 1.5 3 6.5 0 3.5 1.5 2z"/>
                </svg>
              </div>
              <span className="text-sm text-green-800">设置已成功保存</span>
            </div>
          </div>
        </div>
        <Story />
      </div>
    )
  ]
}