import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from '@/components/ui/button'
import { 
  Download, 
  Save, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Settings, 
  Eye, 
  Heart, 
  Share2,
  ArrowRight,
  RefreshCw 
} from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '通用按钮组件，支持多种变体、尺寸和状态。基于 shadcn/ui 设计系统，提供一致的交互体验。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: '按钮的视觉变体'
    },
    size: {
      control: 'select', 
      options: ['default', 'sm', 'lg', 'icon'],
      description: '按钮的尺寸'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用按钮'
    },
    asChild: {
      control: 'boolean',
      description: '是否作为子组件渲染'
    }
  },
  args: {
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '默认按钮',
  },
  parameters: {
    docs: {
      description: {
        story: '默认样式的按钮，使用主色调。'
      }
    }
  }
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '所有可用的按钮变体，展示不同的视觉风格。'
      }
    }
  }
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '不同尺寸的按钮，包括图标按钮。'
      }
    }
  }
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Download className="mr-2 h-4 w-4" />
        下载
      </Button>
      <Button variant="outline">
        <Save className="mr-2 h-4 w-4" />
        保存
      </Button>
      <Button variant="destructive">
        <Trash2 className="mr-2 h-4 w-4" />
        删除
      </Button>
      <Button variant="secondary">
        <Edit className="mr-2 h-4 w-4" />
        编辑
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '带图标的按钮，图标位于文本左侧。'
      }
    }
  }
}

export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline">
        <Search className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Settings className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="destructive">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '纯图标按钮，适用于工具栏和紧凑布局。'
      }
    }
  }
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button>Normal</Button>
        <Button className="hover:bg-primary/90">Hover</Button>
        <Button className="focus:ring-2 focus:ring-primary">Focus</Button>
        <Button className="active:scale-95">Active</Button>
      </div>
      <div className="flex gap-4">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled Outline</Button>
        <Button variant="destructive" disabled>Disabled Destructive</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '按钮的不同状态，包括正常、悬停、焦点、激活和禁用状态。'
      }
    }
  }
}

export const Loading: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>
        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
        加载中...
      </Button>
      <Button variant="outline" disabled>
        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
        处理中
      </Button>
      <Button size="icon" disabled>
        <RefreshCw className="h-4 w-4 animate-spin" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '加载状态的按钮，显示旋转图标和禁用状态。'
      }
    }
  }
}

export const ButtonGroups: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex">
        <Button className="rounded-r-none border-r-0">第一个</Button>
        <Button variant="outline" className="rounded-none border-r-0">第二个</Button>
        <Button variant="outline" className="rounded-l-none">第三个</Button>
      </div>
      <div className="flex gap-2">
        <Button size="sm">小按钮</Button>
        <Button size="sm" variant="outline">小按钮</Button>
        <Button size="sm" variant="ghost">小按钮</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '按钮组合，可以创建分段控件或工具栏。'
      }
    }
  }
}

export const ActionButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button>
          <Eye className="mr-2 h-4 w-4" />
          查看详情
        </Button>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          编辑
        </Button>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          删除
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary">
          <Heart className="mr-2 h-4 w-4" />
          收藏
        </Button>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          分享
        </Button>
        <Button variant="ghost">
          <ArrowRight className="ml-2 h-4 w-4" />
          查看更多
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '常见的操作按钮组合，用于列表项或卡片组件。'
      }
    }
  }
}

export const ResponsiveButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <Button className="w-full sm:w-auto">
        <Download className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">下载文件</span>
        <span className="sm:hidden">下载</span>
      </Button>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button className="flex-1">主要操作</Button>
        <Button variant="outline" className="flex-1">次要操作</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '响应式按钮设计，在不同屏幕尺寸下调整布局和文本。'
      }
    }
  }
}

export const DarkMode: Story = {
  render: () => (
    <div className="p-4 space-y-4 bg-gray-900 rounded-lg">
      <div className="flex gap-4">
        <Button>Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex gap-4">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '暗色主题下的按钮样式。'
      }
    },
    backgrounds: {
      default: 'dark'
    }
  }
}

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <Button 
        aria-label="下载报告文件"
        title="点击下载PDF格式的报告"
      >
        <Download className="mr-2 h-4 w-4" />
        下载报告
      </Button>
      <Button 
        size="icon"
        aria-label="设置"
        title="打开设置页面"
      >
        <Settings className="h-4 w-4" />
      </Button>
      <Button 
        variant="destructive"
        aria-describedby="delete-warning"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        删除项目
      </Button>
      <p id="delete-warning" className="text-sm text-gray-600">
        注意：删除操作不可撤销
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '具有无障碍属性的按钮，包含 aria-label、title 和 aria-describedby。'
      }
    }
  }
}

export const CustomStyling: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
        渐变按钮
      </Button>
      <Button className="rounded-full px-6">
        圆角按钮
      </Button>
      <Button className="shadow-lg hover:shadow-xl transition-shadow">
        阴影按钮
      </Button>
      <Button className="border-2 border-dashed border-gray-400 hover:border-gray-600">
        虚线边框
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '自定义样式的按钮，展示如何扩展基础设计。'
      }
    }
  }
}