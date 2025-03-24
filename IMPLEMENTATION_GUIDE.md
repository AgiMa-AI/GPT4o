# Agi-Ma + Mattermost 实施指南

本文档提供如何将项目转换为四部分架构（前端/IM、前端/AgiMa、后端和数据库）的详细步骤。

## 1. 准备工作

### 1.1 创建目录结构

首先确保以下目录结构存在：

```
项目根目录/
├── 前端/                 # 前端代码
│   ├── IM/              # 即时通讯前端
│   └── AgiMa/           # 移动优化前端
├── 后端/                 # 后端服务
└── 数据库/               # 数据存储服务
```

执行以下命令创建目录：

```bash
mkdir -p 前端/IM/src 前端/AgiMa/src 后端/src 数据库/src
```

### 1.2 复制基础配置文件

每个目录都需要自己的`package.json`、`tsconfig.json`等配置文件：

#### 前端/IM/package.json
```json
{
  "name": "im-frontend",
  "version": "1.0.0",
  "description": "即时通讯前端模块，集成Mattermost",
  "main": "src/index.ts",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "lucide-react": "^0.292.0",
    "socket.io-client": "^4.7.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@types/react-router-dom": "^5.3.3",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.0"
  }
}
```

#### 前端/AgiMa/package.json
```json
{
  "name": "agima-frontend",
  "version": "1.0.0",
  "description": "AgiMa移动前端模块，适配Mattermost后端",
  "main": "src/index.ts",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "lucide-react": "^0.292.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@types/react-router-dom": "^5.3.3",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.0"
  }
}
```

#### 后端/package.json
```json
{
  "name": "mattermost-backend",
  "version": "1.0.0",
  "description": "Mattermost后端服务，移除官方监控",
  "main": "src/server.ts",
  "type": "module",
  "scripts": {
    "start": "node dist/server.js",
    "dev": "nodemon --exec node --loader ts-node/esm src/server.ts",
    "build": "tsc"
  },
  "dependencies": {
    "body-parser": "^1.20.2",
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-rate-limit": "^7.1.4",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "socket.io": "^4.7.2"
  },
  "devDependencies": {
    "@types/body-parser": "^1.19.5",
    "@types/compression": "^1.7.5",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/helmet": "^4.0.0",
    "@types/morgan": "^1.9.9",
    "@types/node": "^20.10.0",
    "nodemon": "^3.0.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.2.2"
  }
}
```

#### 数据库/package.json
```json
{
  "name": "database",
  "version": "1.0.0",
  "description": "数据库服务",
  "main": "src/index.ts",
  "type": "module",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon --exec node --loader ts-node/esm src/index.ts",
    "build": "tsc",
    "migrate": "node src/scripts/migrate.js"
  },
  "dependencies": {
    "dotenv": "^16.3.1",
    "mysql2": "^3.6.3",
    "pg": "^8.11.3",
    "sqlite3": "^5.1.6"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/pg": "^8.10.2",
    "nodemon": "^3.0.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.2.2"
  }
}
```

### 1.3 配置文件

每个部分需要自己的TypeScript和Vite配置：

#### 前端/IM/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### 前端/AgiMa/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### 后端/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "outDir": "./dist",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### 数据库/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "outDir": "./dist",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 2. 文件迁移步骤

### 2.1 移动前端/IM文件

将即时通讯相关文件移动到前端/IM/src目录：

```bash
# 创建目标目录结构
mkdir -p 前端/IM/src/components/ui
mkdir -p 前端/IM/src/services
mkdir -p 前端/IM/src/hooks
mkdir -p 前端/IM/src/pages
mkdir -p 前端/IM/src/types

# 复制即时通讯相关组件
cp -r src/components/ai 前端/IM/src/components/
cp -r src/pages/ai-*.tsx 前端/IM/src/pages/
cp -r src/components/ui 前端/IM/src/components/

# 复制共用服务和钩子
cp src/services/apiService.ts 前端/IM/src/services/
cp src/hooks/useAuth.tsx 前端/IM/src/hooks/
cp src/types/auth.ts 前端/IM/src/types/
```

### 2.2 移动前端/AgiMa文件

将移动优化相关文件移动到前端/AgiMa/src目录：

```bash
# 创建目标目录结构
mkdir -p 前端/AgiMa/src/components/ui
mkdir -p 前端/AgiMa/src/services
mkdir -p 前端/AgiMa/src/hooks
mkdir -p 前端/AgiMa/src/pages/mobile
mkdir -p 前端/AgiMa/src/types

# 复制移动端组件和页面
cp src/MobileApp.tsx 前端/AgiMa/src/
cp -r src/pages/mobile 前端/AgiMa/src/pages/
cp src/services/mobileAdapter.ts 前端/AgiMa/src/services/
cp src/services/mattermostApiService.ts 前端/AgiMa/src/services/
cp src/hooks/use-mobile.tsx 前端/AgiMa/src/hooks/
cp src/types/agi.ts 前端/AgiMa/src/types/

# 复制共用UI组件
cp -r src/components/ui 前端/AgiMa/src/components/
```

### 2.3 移动后端文件

将后端服务相关文件移动到后端/src目录：

```bash
# 创建目标目录结构
mkdir -p 后端/src/routes
mkdir -p 后端/src/middleware
mkdir -p 后端/src/utils
mkdir -p 后端/src/db
mkdir -p 后端/src/socket
mkdir -p 后端/src/modules

# 复制后端服务文件
cp mattermost-backend/src/server.ts 后端/src/
cp -r mattermost-backend/src/modules 后端/src/
```

### 2.4 移动数据库文件

创建数据库服务相关结构：

```bash
# 创建目标目录结构
mkdir -p 数据库/src/models
mkdir -p 数据库/src/migrations
mkdir -p 数据库/src/scripts

# 创建数据库连接文件
touch 数据库/src/index.ts
touch 数据库/src/config.ts
```

## 3. 更新导入路径

迁移后需要更新所有文件中的导入路径。以下是更新导入路径的规则：

### 3.1 前端/IM文件导入路径

```typescript
// 更新前
import { Component } from '@/components/ui/component';

// 更新后
import { Component } from '../../components/ui/component';
// 或使用别名配置
import { Component } from '@/components/ui/component';
```

### 3.2 前端/AgiMa文件导入路径

```typescript
// 更新前
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 更新后
import { useState } from 'react';
import { Button } from '../../components/ui/button';
// 或使用别名配置
import { Button } from '@/components/ui/button';
```

### 3.3 后端和数据库文件导入路径

```typescript
// 更新前
import { Router } from 'express';
import { initDatabase } from './db/index.js';

// 更新后
import { Router } from 'express';
import { initDatabase } from '../db/index.js';
```

## 4. 安装依赖

在每个目录下分别安装依赖：

```bash
# 安装前端/IM依赖
cd 前端/IM
npm install

# 安装前端/AgiMa依赖
cd ../../前端/AgiMa
npm install

# 安装后端依赖
cd ../../后端
npm install

# 安装数据库依赖
cd ../数据库
npm install
```

## 5. 解决类型错误

所有项目都存在TypeScript类型错误，主要是缺少类型声明包。使用以下命令安装所需的类型声明：

```bash
# 前端类型声明
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# 后端类型声明
npm install --save-dev @types/node @types/express @types/cors @types/helmet @types/compression @types/socket.io @types/morgan
```

或者直接运行types-dependencies.js脚本：

```bash
node types-dependencies.js
```

## 6. 启动和测试

### 6.1 启动前端/IM

```bash
cd 前端/IM
npm run dev
```

### 6.2 启动前端/AgiMa

```bash
cd 前端/AgiMa
npm run dev
```

### 6.3 启动后端

```bash
cd 后端
npm run dev
```

### 6.4 启动数据库服务

```bash
cd 数据库
npm run dev
```

### 6.5 通过统一脚本启动

使用根目录下的start.js启动所有服务：

```bash
node start.js
```

## 7. 清除不必要的文件

完成迁移后，可以删除原始文件以保持项目整洁：

```bash
# 删除原始源代码目录(确保已经备份)
rm -rf src/
rm -rf mattermost-frontend/
rm -rf mattermost-backend/

# 删除临时文件和构建产物
rm -rf dist/
rm -rf node_modules/
rm -rf .cache/
```

## 8. 验证迁移成功

在浏览器中访问前端应用，并确保所有功能正常工作：

- 前端/IM: http://localhost:5173
- 前端/AgiMa: http://localhost:5174
- 后端API: http://localhost:8065/api

## 注意事项

1. 迁移过程中可能会遇到导入路径问题，需要手动调整
2. 确保每个模块的TypeScript配置正确设置
3. 定期测试功能，确保迁移不会破坏现有功能
4. 所有TypeScript类型错误可通过安装相应的类型声明包解决