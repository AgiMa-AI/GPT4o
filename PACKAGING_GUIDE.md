# AgiMa项目打包指南

本文档详细说明如何将项目源码打包到目标文件夹: `C:\Users\Ll-Fr\Desktop\AgiMa-项目`

## 文件夹结构

按照要求，项目将组织为以下四个主要部分:

```
C:\Users\Ll-Fr\Desktop\AgiMa-项目\
│
├── 前端\
│   ├── IM\         # 即时通讯前端模块
│   └── AgiMa\      # 移动端优化的主应用
│
├── 后端\           # API服务和业务逻辑
│
└── 数据库\         # 数据存储服务
```

## 文件迁移对照表

### 前端/IM

此部分包含即时通讯功能相关的代码:

源文件 | 目标位置
------ | -------
`src/components/ai/AIDialogPanel.tsx` | `前端/IM/components/AIDialogPanel.tsx`
`src/pages/auth/*` | `前端/IM/pages/auth/`
`src/hooks/useAuth.tsx` | `前端/IM/hooks/useAuth.tsx`
`src/context/AuthContext.tsx` | `前端/IM/context/AuthContext.tsx`
`src/providers/AuthProvider.tsx` | `前端/IM/providers/AuthProvider.tsx`
`frontend/im/package.json` | `前端/IM/package.json`

### 前端/AgiMa

此部分包含移动端优化的应用代码:

源文件 | 目标位置
------ | -------
`src/MobileApp.tsx` | `前端/AgiMa/src/MobileApp.tsx`
`src/pages/mobile/*` | `前端/AgiMa/src/pages/mobile/`
`src/hooks/use-mobile.tsx` | `前端/AgiMa/src/hooks/use-mobile.tsx`
`src/services/mobileAdapter.ts` | `前端/AgiMa/src/services/mobileAdapter.ts`
`src/services/mattermostApiService.ts` | `前端/AgiMa/src/services/mattermostApiService.ts`
`src/types/agi.ts` | `前端/AgiMa/src/types/agi.ts`
`src/types/auth.ts` | `前端/AgiMa/src/types/auth.ts`
`src/components/ui/*` | `前端/AgiMa/src/components/ui/`
`frontend/agima/package.json` | `前端/AgiMa/package.json`
`tailwind.config.ts` | `前端/AgiMa/tailwind.config.ts`
`tsconfig.json` | `前端/AgiMa/tsconfig.json`
`vite.config.ts` | `前端/AgiMa/vite.config.ts`
`index.html` | `前端/AgiMa/index.html`

### 后端

此部分包含服务端API和业务逻辑:

源文件 | 目标位置
------ | -------
`mattermost-backend/src/server.ts` | `后端/src/server.ts`
`mattermost-backend/src/modules/pmInterface.ts` | `后端/src/modules/pmInterface.ts`
`backend/package.json` | `后端/package.json`
`.env` | `后端/.env`

### 数据库

此部分包含数据存储和访问逻辑:

源文件 | 目标位置
------ | -------
`database/package.json` | `数据库/package.json`

## 应删除的无用文件

以下文件可以安全删除，不影响项目功能:

- 所有markdown文档 (`.md`)
- 脚本文件 (`*.js`) - 除了必要的配置文件
- 临时文档和规划文件
- 重复的配置文件

## 安装必要的依赖

为解决TypeScript类型错误，需要安装以下依赖:

```bash
# 在前端/IM和前端/AgiMa目录下执行
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# 在后端目录下执行
npm install --save-dev @types/node @types/express @types/cors @types/helmet @types/compression @types/body-parser @types/morgan @types/socket.io
```

## 注意事项

1. 保持相对引用路径的正确性，特别是`@/`开头的导入语句
2. 确保每个部分的package.json文件中的依赖完整
3. 适当修改tsconfig.json中的路径别名配置，对应新的目录结构