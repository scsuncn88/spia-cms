#!/bin/bash

echo "🚀 启动小程序旅客服务管理平台"
echo "================================"

echo "📦 安装依赖中..."
npm install --prefer-offline --no-audit

echo "🎯 启动开发服务器..."
echo "📍 访问地址: http://localhost:3000"
echo "⚡ 按 Ctrl+C 停止服务器"

npm run dev