# Agi-Ma + Mattermost 集成项目

本项目将Agi-Ma前端与Mattermost后端集成，适配移动端，并移除官方监控和依赖。

## 项目架构

项目采用清晰的四部分结构：

```
项目根目录/
├── 前端/                   # 前端代码
│   ├── IM/                # 即时通讯前端
│   └── AgiMa/             # 移动优化前端
├── 后端/                   # 后端服务
└── 数据库/                 # 数据存储服务
```

### 1. 前端/IM

即时通讯模块，负责用户间消息传递和基础通信功能。

- **主要功能**：聊天、消息列表、通知
- **技术栈**：React、TypeScript、WebSocket
- **与Mattermost集成**：通过API适配层与Mattermost通讯服务集成

### 2. 前端/AgiMa

移动设备优化的用户界面，支持租用实例和访问GPU资源。

- **主要功能**：实例列表、详情页、钱包、登录功能
- **技术栈**：React、TypeScript、移动UI优化
- **优化特性**：触屏优化、数据压缩、离线支持

### 3. 后端

API服务层，处理业务逻辑和与数据库交互。

- **主要功能**：用户认证、实例管理、交易处理
- **技术栈**：Express、TypeScript、WebSocket
- **安全特性**：移除官方监控、无痕操作模式

### 4. 数据库

数据存储和管理模块。

- **主要功能**：用户数据、实例信息、交易记录
- **技术栈**：SQL、数据迁移工具
- **与后端集成**：通过数据访问层提供服务

## 文件迁移

使用提供的迁移脚本重组文件结构：

```bash
node migrate.js
```

此脚本将：
- 创建新的四部分目录结构
- 移动源文件到适当位置
- 删除冗余和无用文件

## 类型错误解决

当前环境存在多个TypeScript类型错误，主要是缺少类型声明包。运行以下命令解决：

```bash
node types-dependencies.js
```

或手动安装：

```bash
# 前端类型
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# 后端类型
npm install --save-dev @types/node @types/express @types/cors @types/helmet
npm install --save-dev @types/compression @types/body-parser
npm install --save-dev @types/socket.io @types/morgan 
```

## 项目启动

完成迁移后，使用以下命令启动项目：

```bash
# 安装依赖
node install.js

# 启动所有服务
node start.js

# 或启动特定组件
node start.js im      # 仅启动IM前端
node start.js agima   # 仅启动移动前端
node start.js backend # 仅启动后端
```

## PM模块集成

项目预留了PM模块扩展点，位于`后端/src/modules/pmInterface.ts`。PM模块可以动态扩展API和逻辑处理，具有完整的生命周期管理。

## 安全特性

- 移除了官方监控和遥测代码
- 实现了防跟踪中间件
- 提供无痕操作模式
- 支持端到端加密通信

## 详细文档

- [架构详情](ARCHITECTURE.md) - 系统架构和组件关系
- [迁移指南](HOW_TO_MIGRATE.md) - 如何执行迁移和解决错误
- [保存路径](SAVE_PATHS.md) - 文件保存位置详情