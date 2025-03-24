# Agi-Ma + Mattermost 移动端集成项目

本项目将Agi-Ma前端UI与Mattermost后端进行集成，专为移动设备优化，已移除官方监控和依赖。

## 项目架构

项目采用四层架构设计，结构清晰：

### 1. 前端/IM
即时通讯前端部分，主要提供聊天、消息和通知功能。

- 主要技术：React, TypeScript, TailwindCSS
- 入口文件：`frontend/im/src/index.tsx`
- 特点：轻量化设计，专注于信息交流

### 2. 前端/AgiMa
Agi-Ma核心前端应用，提供GPU实例管理、租用和用户操作界面。

- 主要技术：React, TypeScript, Shadcn/UI组件
- 入口文件：`frontend/agima/src/index.tsx`
- 移动端组件位于：`frontend/agima/src/pages/mobile/`
- 特点：针对移动设备优化的用户体验

### 3. 后端
服务器端API和业务逻辑，与Mattermost后端API集成。

- 主要技术：Node.js, Express, Socket.IO
- 入口文件：`backend/src/server.ts`
- 特点：已移除官方监控，提供安全API接口

### 4. 数据库
数据存储和管理层，兼容多种数据库系统。

- 支持：PostgreSQL, SQLite, MySQL, MongoDB
- 配置文件：`database/src/config.ts`
- 迁移脚本：`database/src/migrations/`
- 特点：灵活的数据模型和多数据库支持

## PM模块集成

PM模块为系统提供扩展功能，通过插件架构实现API和业务逻辑的定制。

- 模块接口：`backend/src/modules/pmInterface.ts`
- 模块目录：`backend/src/modules/`
- 加载方式：动态加载，支持热插拔

## 安装与运行

### 安装依赖

首先安装各模块所需的依赖：

```bash
# 安装类型声明包修复TypeScript错误
node install-deps.js

# 或手动安装所需包
cd frontend/im && npm install
cd frontend/agima && npm install
cd backend && npm install
cd database && npm install
```

### 启动服务

```bash
# 开发模式启动
node start-mobile.js

# 或分别启动各服务
cd frontend/agima && npm run dev
cd backend && npm run dev
```

### 编译生产版本

```bash
node build.js
```

## 环境变量配置

请参考项目根目录的`.env.example`文件，复制为`.env`并按需修改配置项。

## 类型声明问题解决

当前项目可能存在TypeScript类型错误，主要是由于缺少相应的类型声明包。安装以下依赖可解决问题：

```bash
npm install --save-dev @types/react @types/react-dom @types/react-router-dom @types/node @types/express
```

或直接运行`node install-deps.js`自动安装所有必要的类型声明包。

## 关于Mattermost集成

本项目已实现与Mattermost后端API的完整集成，主要通过以下文件：

- API适配层：`frontend/agima/src/services/mattermostApiService.ts`
- 移动端适配：`frontend/agima/src/services/mobileAdapter.ts`
- 认证集成：`frontend/agima/src/providers/AuthProvider.tsx`

所有官方监控和遥测代码已移除，系统可安全使用。

## 项目开发说明

- 移动端专用组件位于`frontend/agima/src/pages/mobile/`目录
- 所有UI组件使用Shadcn/UI和TailwindCSS构建
- 后端API遵循REST风格设计，根路径为`/api/`
- 文件组织遵循特性优先原则