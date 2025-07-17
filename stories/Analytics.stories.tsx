import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import AnalyticsPage from '@/app/analytics/page'

// Mock data for the analytics page
const mockAnalyticsData = {
  overview: {
    totalViews: 1234567,
    totalUsers: 45678,
    totalContent: 2345,
    totalComments: 8901,
    bounceRate: 23.5,
    avgSessionDuration: 4.2,
    newUsersRate: 34.7,
    returnUsersRate: 65.3
  },
  contentAnalytics: {
    topContent: [
      {
        id: '1',
        title: '浦东机场T3航站楼最新进展',
        views: 45678,
        likes: 1234,
        comments: 89,
        shares: 156,
        category: '机场建设',
        publishedAt: new Date('2024-01-10T10:00:00'),
        trend: 'up' as const
      },
      {
        id: '2',
        title: '春运期间航班调整通知',
        views: 34567,
        likes: 987,
        comments: 67,
        shares: 234,
        category: '通知公告',
        publishedAt: new Date('2024-01-12T14:30:00'),
        trend: 'up' as const
      }
    ],
    categoryStats: [
      { category: '机场建设', count: 156, views: 234567, growth: 12.5 },
      { category: '通知公告', count: 89, views: 189234, growth: 8.7 },
      { category: '购物指南', count: 67, views: 145678, growth: -2.3 }
    ],
    engagement: {
      totalLikes: 45678,
      totalComments: 12345,
      totalShares: 6789,
      avgEngagementRate: 5.6,
      topEngagementHours: [9, 12, 15, 18, 21]
    }
  }
}

const meta: Meta<typeof AnalyticsPage> = {
  title: 'Pages/Analytics',
  component: AnalyticsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '数据分析页面，展示内容和用户行为分析报告，包含概览、内容分析、用户分析和系统分析四个主要标签页。'
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
        story: '默认的数据分析页面，显示所有统计数据和图表。'
      }
    }
  }
}

export const Overview: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '概览标签页，展示关键指标、互动指标和流量趋势。'
      }
    }
  },
  play: async ({ canvasElement }) => {
    // This would contain interactions to show the Overview tab
  }
}

export const ContentAnalytics: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '内容分析标签页，显示热门内容、分类统计和互动数据。'
      }
    }
  }
}

export const UserAnalytics: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '用户分析标签页，包含用户行为、设备分布、地域分析和流量来源。'
      }
    }
  }
}

export const SystemAnalytics: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '系统分析标签页，展示系统性能、资源使用情况和错误分析。'
      }
    }
  }
}

export const DarkMode: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '暗色主题下的数据分析页面。'
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
        story: '移动端视图下的数据分析页面，展示响应式设计。'
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
        story: '平板视图下的数据分析页面。'
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
        story: '数据加载中的状态，显示骨架屏或加载指示器。'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <Story />
        </div>
      </div>
    )
  ]
}

export const ErrorState: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '数据加载失败时的错误状态。'
      }
    }
  }
}

export const HighTrafficData: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '高流量数据场景，展示大数字的格式化显示。'
      }
    }
  }
}