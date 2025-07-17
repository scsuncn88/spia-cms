#!/bin/bash

echo "🚀 启动小程序旅客服务管理平台"
echo "================================"

# 清理之前的进程
echo "🔧 清理之前的进程..."
pkill -f "next dev" || true

# 进入项目目录
cd /Users/shengchun.sun/Library/CloudStorage/OneDrive-个人/MyCloud/Code/spia-cms

# 确保依赖已安装
echo "📦 检查依赖..."
npm install --prefer-offline --no-audit

# 启动开发服务器
echo "🎯 启动开发服务器..."
echo "📍 访问地址: http://localhost:3000"
echo "📍 内容发布演示: http://localhost:3000/examples/content-publish-demo"
echo "📍 应急通知演示: http://localhost:3000/examples/emergency-notice-demo"
echo "📍 投诉服务演示: http://localhost:3000/examples/complaint-service-demo"
echo ""

# 在后台启动服务器
nohup npm run dev > dev.log 2>&1 &

echo "✅ 开发服务器已在后台启动"
echo "📄 日志文件: dev.log"
echo "🛑 停止服务器: pkill -f 'next dev'"

# 等待服务器启动
echo "⏳ 等待服务器启动..."
sleep 5

# 检查服务器状态
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    echo "✅ 服务器启动成功！"
    echo "🌐 现在可以访问 http://localhost:3000"
else
    echo "❌ 服务器启动失败，请检查 dev.log 文件"
fi