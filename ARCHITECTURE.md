# Agi-Ma + Mattermost 项目架构说明

本项目采用清晰的四部分结构，将前端和后端分离，实现模块化和可维护性。整个架构按照如下方式组织：

## 目录结构

```
project/
├── frontend/            # 前端代码
│   ├── im/              # IM聊天前端模块
│   └── agima/           # AgiMa移动端优化前端
├── backend/             # 后端服务
│   ├── src/             # 后端源代码
│   └── ...
├── database/            # 数据库服务
│   ├── src/             # 数据库源代码
│   └── ...
├── install.js           # 一键安装脚本
├── start.js             # 统一启动脚本
└── ...
```

## 架构说明

### 1. 前端 (Frontend)

前端分为两个独立的模块：

#### IM聊天前端 (`frontend/im/`)
- 提供即时通讯界面
- 基于React和TypeScript构建
- 与Mattermost后端API集成
- 已移除官方监控和遥测功能

#### AgiMa前端 (`frontend/agima/`)
- 专为移动设备优化的界面
- 提供GPU实例列表、详情、钱包等功能
- 使用React和蓝色主题设计
- 已适配Mattermost后端API接口

### 2. 后端 (Backend)

后端服务基于Express构建，提供API接口：

- 与Mattermost后端API兼容
- 已移除官方监控和遥测代码
- 支持PM模块动态加载
- 提供WebSocket实时通信支持
- 实现反监控和无痕操作

### 3. 数据库 (Database)

数据库服务负责数据存储和管理：

- 支持SQLite本地存储
- 可配置为MySQL或PostgreSQL
- 提供数据迁移和备份工具
- 与Mattermost数据模型兼容

## 文件清理指南

为保持项目结构清晰，请删除以下无用文件：

1. 原有的模拟API服务文件
2. 未使用的配置文件
3. 重复的布局组件
4. 旧版适配器文件

## 运行指南

1. **安装依赖**
   ```bash
   node install.js
   ```

2. **启动服务**
   ```bash
   # 启动所有服务
   node start.js
   
   # 仅启动特定服务
   node start.js im      # 仅启动IM前端
   node start.js agima   # 仅启动AgiMa前端
   node start.js backend # 仅启动后端
   node start.js database # 仅启动数据库
   ```

3. **PM模块开发**
   
   PM模块应放置在 `backend/modules/` 目录下，遵循以下结构：
   ```
   backend/modules/
   ├── module-name/
   │   ├── index.js       # 模块入口
   │   ├── routes.js      # API路由定义
   │   └── handlers.js    # 业务逻辑处理
   ```

## 接口集成

前端和后端之间通过RESTful API和WebSocket进行通信：

1. **认证API**
   - 登录/登出
   - 用户注册
   - 会话管理

2. **实例管理API**
   - 获取实例列表
   - 租用实例
   - 管理收藏

3. **钱包和交易API**
   - 查询余额
   - 执行转账
   - 交易历史

所有API已与Mattermost后端接口对齐，确保兼容性。

## 类型错误解决方案

项目中可能存在TypeScript类型错误，主要是因为缺少类型声明包。运行`node install.js`会自动安装所有必要的类型定义包，解决这些错误：

- @types/react
- @types/react-router-dom
- @types/express
- @types/node
- 其他依赖的类型定义

## 移动端优化

AgiMa前端已针对移动设备进行了多项优化：

1. 响应式布局适配
2. 触控友好的交互设计
3. 资源预加载和缓存
4. 减少网络请求的数据压缩
5. 离线功能支持

## PM模块集成

PM模块提供了扩展后端API功能的方式，无需修改核心代码：

1. 定义模块元数据
2. 实现init函数进行初始化
3. 注册自定义API路由
4. 添加WebSocket事件处理
5. 扩展数据模型

参考`backend/src/modules/pmInterface.ts`了解详细API。