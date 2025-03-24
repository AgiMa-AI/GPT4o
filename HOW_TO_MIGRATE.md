# 项目迁移操作指南

本文档提供如何使用提供的脚本执行项目迁移和解决现有问题的详细说明。

## 1. 执行迁移脚本

首先，执行`migrate.js`脚本将文件整理到新的文件结构中:

```bash
node migrate.js
```

该脚本会自动:
- 创建前端/IM、前端/AgiMa、后端和数据库四个主要目录
- 复制配置文件到相应位置
- 将源代码按功能分类到正确目录
- 删除不必要的文件

## 2. 解决TypeScript类型错误

当前显示的TypeScript错误主要是由于缺少类型声明包导致的。运行以下命令来安装所需的类型定义:

```bash
# 从项目根目录执行
node types-dependencies.js
```

或者手动安装这些依赖:

```bash
# 安装React相关类型
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# 安装后端相关类型
npm install --save-dev @types/node @types/express @types/cors @types/helmet @types/compression @types/body-parser @types/morgan @types/socket.io @types/express-rate-limit
```

这将解决绝大多数类型错误，包括:
- 找不到"react"或其相应的类型声明
- 找不到"react-router-dom"或其相应的类型声明
- JSX标记需要模块路径 'react/jsx-runtime'
- 找不到"express"及其他后端库的类型声明
- 找不到名称"process"(需要@types/node)

## 3. 启动项目

安装依赖后，使用以下命令启动项目:

```bash
# 安装所有依赖
node install.js

# 启动所有服务
node start.js

# 或者仅启动特定部分
node start.js im       # 仅启动IM前端
node start.js agima    # 仅启动移动前端
node start.js backend  # 仅启动后端服务
```

## 4. 查看文件位置

迁移后的文件结构参考`SAVE_PATHS.md`文件，该文件详细列出了四个主要部分的路径和内容:

- 前端/IM: `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/frontend/im/`
- 前端/AgiMa: `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/frontend/agima/`
- 后端: `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/backend/`
- 数据库: `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/database/`

## 5. 注意事项

- 原始源代码将保留在`src`目录作为参考
- 所有开发工作应在新的文件结构中进行
- 迁移脚本会保留必要的配置文件并删除冗余文件
- 如有自定义修改，请确保在迁移前备份