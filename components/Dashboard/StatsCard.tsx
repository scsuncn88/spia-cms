'use client'

import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray'
  className?: string
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon, 
  color = 'blue',
  className 
}: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    gray: 'bg-gray-500'
  }

  const changeClasses = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400'
  }

  return (
    <div className={`dashboard-card ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="dashboard-label">{title}</p>
          <p className="dashboard-stat">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center mt-1 ${changeClasses[changeType]}`}>
              <span className="text-sm font-medium">
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-xs ml-1">vs 上期</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}