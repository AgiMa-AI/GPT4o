# 项目文件保存路径

迁移脚本(migrate.js)会将项目文件保存到以下目录中:

## 前端部分

### 1. IM前端 (PC版)
- **路径**: `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/frontend/im/`
- **内容**:
  - 普通Web版前端代码
  - 非移动设备组件
  - 基础UI库和工具函数

### 2. AgiMa前端 (移动版)
- **路径**: `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/frontend/agima/`
- **内容**:
  - 移动端优化组件
  - 所有 `MobileXXX.tsx` 组件
  - 移动端专用适配器和服务

## 后端部分

### 3. 后端服务
- **路径**: `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/backend/`
- **内容**:
  - Mattermost API服务适配层
  - 移除监控的后端代码
  - PM模块集成系统
  - API路由和控制器

### 4. 数据库服务
- **路径**: `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/database/`
- **内容**:
  - 数据库模型和连接代码
  - 迁移脚本
  - 种子数据
  - 查询工具

## 启动方式

完成迁移后，可以使用以下命令启动各部分:

```bash
# 安装所有依赖
node install.js

# 启动所有服务
node start.js

# 仅启动IM前端
node start.js im

# 仅启动移动前端
node start.js agima

# 仅启动后端服务
node start.js backend

# 仅启动数据库服务
node start.js database
```

## 源代码位置

源代码将保留在原始位置 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/` 作为参考，但所有功能开发应在上述四个主要目录中进行。