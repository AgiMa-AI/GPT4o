# Agi-Ma移动端 + Mattermost集成 项目摘要

## 项目架构

整个项目采用清晰的四部分结构，每个部分有明确的职责：

```
项目根目录/
├── frontend/            # 前端部分
│   ├── im/              # IM聊天前端
│   └── agima/           # Agi-Ma移动端前端
├── backend/             # 后端服务
└── database/            # 数据库服务
```

### 各部分职责

#### 1. 前端/IM
即时通讯前端模块，提供基于Mattermost的聊天功能：
- 用户登录和注册
- 消息发送和接收
- 频道和直接消息管理
- 文件共享和团队协作

#### 2. 前端/AgiMa
Agi-Ma移动端专用前端，针对小屏设备优化：
- GPU实例浏览和筛选
- 实例租用管理
- 钱包和余额管理
- 用户资料设置

#### 3. 后端
后端API服务，与Mattermost后端集成：
- RESTful API接口
- 用户认证与授权
- Socket.IO实时通信
- PM模块动态加载系统
- 反监控中间件

#### 4. 数据库
数据存储和管理：
- 用户和权限管理
- 实例和交易记录
- IM消息归档
- 缓存和日志存储

## 主要文件和功能

### 前端/AgiMa移动端组件
- `MobileInstances.tsx`: 移动优化的实例列表页面
- `MobileDetails.tsx`: 实例详情页面
- `MobileWallet.tsx`: 用户钱包和交易记录
- `MobileLogin.tsx`: 移动端登录页面

### 与Mattermost集成的核心文件
- `mattermostApiService.ts`: Mattermost API适配层
- `mobileAdapter.ts`: 移动设备API和性能优化
- `AuthProvider.tsx`: 认证系统与Mattermost集成

### 后端服务文件
- `server.ts`: 后端服务主入口
- `pmInterface.ts`: PM模块系统接口

### 实用工具脚本
- `migrate.js`: 文件结构迁移脚本
- `types-dependencies.js`: 类型声明安装脚本
- `install.js`: 依赖安装脚本
- `start.js`: 项目启动脚本

## 安装与使用

### 1. 目录结构准备
```bash
# 运行迁移脚本，创建四部分结构
node migrate.js
```

### 2. 安装依赖
```bash
# 安装所有依赖包
node install.js

# 安装TypeScript类型声明（解决编译错误）
node types-dependencies.js
```

### 3. 启动服务
```bash
# 启动所有服务（前端、后端、数据库）
node start.js

# 仅启动移动端
node start.js --mode=agima
```

## Mattermost集成说明

### 已移除的官方依赖
项目已完全移除Mattermost官方的所有监控、遥测和跟踪代码，确保：
- 无审计日志上传
- 无遥测数据收集
- 无版本检查请求
- 独立自主的部署环境

### PM模块使用
PM（插件模块）系统允许动态扩展API功能：
1. 在`backend/pm_modules`目录创建新模块
2. 实现`PMModule`接口定义的功能
3. 系统自动加载并注册API路由、WebSocket处理器等

## 已知问题和解决方案

### 类型错误
当前环境中存在TypeScript类型错误，主要原因是缺少类型声明包。运行以下命令解决：
```bash
node types-dependencies.js
```

### 路径别名配置
项目使用`@/`路径别名，如果出现路径解析错误，请检查以下配置：
- `tsconfig.json`中的`paths`设置
- Vite或Webpack的别名配置

## 后续开发计划

1. **完善移动端体验**
   - 优化响应式布局
   - 实现离线功能支持
   - 添加移动端特有手势
   
2. **扩展PM模块生态**
   - 开发更多API扩展模块
   - 实现模块市场功能
   - 构建插件开发工具包

3. **增强数据安全**
   - 实现端到端加密
   - 添加多因素认证
   - 完善数据备份方案