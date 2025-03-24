# AgiMa项目核心文件清单

本文档列出了AgiMa项目四个部分(前端/IM、前端/AgiMa、后端、数据库)中的核心文件，便于快速手动移动文件到`C:\Users\Ll-Fr\Desktop\AgiMa-项目`目录。

## 1. 前端/IM (即时通讯前端)

### 核心配置文件
- `package.json` - 项目配置和依赖
- `tsconfig.json` - TypeScript配置
- `vite.config.ts` - Vite构建配置
- `index.html` - 入口HTML文件

### 核心源码文件
- `src/App.tsx` - 主应用组件
- `src/main.tsx` - 应用入口点
- `src/components/ui/*` - UI组件库
- `src/context/AuthContext.tsx` - 认证上下文
- `src/providers/AuthProvider.tsx` - 认证提供者
- `src/services/mattermostApiService.ts` - Mattermost API服务

## 2. 前端/AgiMa (移动端优化版本)

### 核心配置文件
- `package.json` - 项目配置和依赖
- `tsconfig.json` - TypeScript配置
- `vite.config.ts` - Vite构建配置
- `index.html` - 入口HTML文件

### 核心源码文件
- `src/MobileApp.tsx` - 移动端主应用
- `src/services/mobileAdapter.ts` - 移动端API适配器
- `src/pages/mobile/MobileInstances.tsx` - 实例列表
- `src/pages/mobile/MobileDetails.tsx` - 实例详情
- `src/pages/mobile/MobileWallet.tsx` - 钱包页面
- `src/pages/mobile/MobileLogin.tsx` - 登录页面
- `src/hooks/use-mobile.tsx` - 移动设备检测
- `src/types/agi.ts` - 数据类型定义

## 3. 后端 (API服务)

### 核心配置文件
- `package.json` - 项目配置和依赖
- `.env` - 环境变量配置

### 核心源码文件
- `src/server.ts` - 服务器入口点
- `src/modules/pmInterface.ts` - PM模块集成系统
- `src/routes/auth.js` - 认证路由
- `src/routes/users.js` - 用户路由
- `src/utils/antiMonitoring.js` - 监控屏蔽工具

## 4. 数据库 (数据存储)

### 核心配置文件
- `package.json` - 项目配置和依赖
- `config/config.js` - 数据库配置
- `.sequelizerc` - Sequelize ORM配置

### 核心源码文件
- `models/index.js` - 数据模型索引
- `migrations/` - 数据库迁移文件
- `seeders/` - 初始数据填充脚本

## 解决TypeScript类型错误

所有部分都可能需要安装以下类型声明包来解决当前的TypeScript错误：

```bash
# 前端部分所需
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# 后端部分所需
npm install --save-dev @types/node @types/express @types/cors @types/compression @types/body-parser @types/morgan @types/helmet @types/socket.io
```

## 重要说明

1. 上述列表仅包含核心文件，项目完整运行可能需要更多文件
2. 移动文件时请保持目录结构不变，特别是引用关系
3. 如无法快速确定哪些文件是必要的，建议使用DEPLOYMENT.md中的详细指南