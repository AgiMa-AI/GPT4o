# Agi-Ma + Mattermost 移动端集成项目使用指南

本文档提供关于如何使用重新编译的移动端Mattermost适配版应用的详细说明。

## 项目架构概述

本项目采用三层架构（ABC架构）：

- **A层（frontend）**: 前端UI，基于原Agi-Ma项目优化的移动端组件和界面
- **B层（mattermost-frontend）**: Mattermost前端适配层，负责将UI与后端连接，移除了官方监控
- **C层（mattermost-backend）**: 后端管理和数据库，封装了Mattermost API，提供了PM模块集成点

## 安装和启动

### 安装依赖

首次使用前，请安装所需依赖：

```bash
# 安装全局依赖
npm install

# 安装类型声明包（解决TS类型错误）
npm install --save-dev @types/react @types/react-dom @types/react-router-dom @types/node @types/express
```

### 使用启动脚本

项目提供了专用的移动端启动脚本，可以一键启动三层服务：

```bash
# 启动完整的移动端应用（包含全部三层）
node start-mobile.js

# 或者使用特定模式启动
# 环境变量RUN_MODE可以是: all | frontend | mattermost-frontend | mattermost-backend
RUN_MODE=frontend node start-mobile.js
```

### 端口说明

- 前端UI (A): http://localhost:3000
- Mattermost前端 (B): http://localhost:3001
- Mattermost后端 (C): http://localhost:8065

## 环境变量配置

项目使用.env文件进行配置，主要环境变量包括：

```
# 运行模式 (all | frontend | mattermost-frontend | mattermost-backend)
RUN_MODE=all

# API配置
API_URL=http://localhost:8065
API_VERSION=v4

# 认证设置
AUTH_TOKEN_KEY=mattermost_token
AUTH_USER_KEY=mattermost_user_id

# PM模块配置
PM_MODULES_DIR=./pm_modules
PM_MODULES_ENABLED=true

# 禁用监控设置
DISABLE_OFFICIAL_MONITORING=true
DISABLE_TELEMETRY=true
```

## PM模块集成

本项目支持通过PM模块动态扩展功能，特别是与Mattermost后端API的交互逻辑。

### 创建PM模块

1. 在`pm_modules`目录下创建模块目录，如`pm_modules/my-module/`
2. 创建index.js作为模块入口：

```javascript
// pm_modules/my-module/index.js
module.exports = {
  // 模块元数据
  meta: {
    name: "my-module",
    version: "1.0.0",
    description: "自定义API逻辑模块",
    author: "开发者姓名"
  },
  
  // 初始化函数
  init: async function(context) {
    context.logger.info("初始化my-module");
    // 初始化代码
  },
  
  // API路由处理，可选
  registerRoutes: function(app) {
    app.get('/api/custom/endpoint', (req, res) => {
      res.json({ success: true, data: "自定义API响应" });
    });
  },
  
  // WebSocket事件处理，可选
  registerSocketHandlers: function(io) {
    io.on('connection', (socket) => {
      socket.on('custom:event', (data) => {
        // 处理自定义WebSocket事件
      });
    });
  },
  
  // 数据模型扩展，可选
  extendModels: async function() {
    // 扩展数据模型逻辑
  },
  
  // 清理函数，可选
  cleanup: async function() {
    // 清理资源
  }
};
```

### 启用PM模块

确保在`.env`文件中启用PM模块：

```
PM_MODULES_ENABLED=true
PM_MODULES_DIR=./pm_modules
```

## 移除官方监控说明

本项目已移除Mattermost官方监控和遥测机制：

1. 禁用了所有遥测API端点
2. 添加了反监控中间件，阻止遥测请求
3. 移除了依赖中的监控组件
4. 替换了原始前端的跟踪代码

可以通过以下环境变量控制：

```
DISABLE_OFFICIAL_MONITORING=true
DISABLE_TELEMETRY=true
```

## 移动端适配特性

移动端版本具有以下针对移动设备优化的特性：

1. 响应式UI，针对不同设备尺寸优化
2. 触控友好的交互设计
3. 离线功能支持
4. 资源预加载和缓存机制
5. 降低带宽使用的数据压缩

## 故障排除

### 类型错误问题

如果遇到类型错误（如找不到模块"react"的类型声明），请执行：

```bash
npm install --save-dev @types/react @types/react-dom @types/react-router-dom @types/node
```

### 启动问题

如无法启动服务，请检查：

1. 端口是否被占用（3000, 3001, 8065）
2. 所需依赖是否完整安装
3. `.env`文件配置是否正确

## 后续开发

集成PM模块后，可以进行的后续开发：

1. 自定义API交互逻辑
2. 扩展Mattermost功能
3. 添加特定业务场景所需的功能
4. 优化移动设备性能

如有任何问题，请参考项目根目录的README.md文件或提交issue。