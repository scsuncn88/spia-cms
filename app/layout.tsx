import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '浦东机场内容管理系统',
  description: '现代化的机场内容管理系统，提供内容发布、应急通知、投诉处理等功能',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>{children}</body>
    </html>
  )
}