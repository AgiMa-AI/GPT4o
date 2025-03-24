#!/usr/bin/env node

/**
 * 项目架构重组脚本
 * 按照前端/后端/数据库的结构整理文件
 */

const fs = require('fs');
const path = require('path');

// 主项目路径
const BASE_DIR = __dirname;

// 定义需要创建的目录结构
const directories = [
  // 前端 - IM (即时通讯)
  'frontend/im/public',
  'frontend/im/src/components',
  'frontend/im/src/pages',
  'frontend/im/src/hooks',
  'frontend/im/src/utils',
  'frontend/im/src/services',
  'frontend/im/src/styles',
  
  // 前端 - AgiMa (主应用)
  'frontend/agima/public',
  'frontend/agima/src/components',
  'frontend/agima/src/pages',
  'frontend/agima/src/hooks',
  'frontend/agima/src/utils',
  'frontend/agima/src/services',
  'frontend/agima/src/styles',
  'frontend/agima/src/types',
  'frontend/agima/src/context',
  
  // 后端
  'backend/api',
  'backend/controllers',
  'backend/middleware',
  'backend/routes',
  'backend/utils',
  'backend/socket',
  'backend/modules',
  
  // 数据库
  'database/models',
  'database/migrations',
  'database/seeders',
  'database/scripts'
];

// 创建目录函数
function createDirectories() {
  console.log('开始创建项目架构目录...');
  
  directories.forEach(dir => {
    const dirPath = path.join(BASE_DIR, dir);
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ 创建目录: ${dir}`);
    } else {
      console.log(`⚠️ 目录已存在: ${dir}`);
    }
  });
  
  console.log('目录创建完成!');
}

// 创建基础配置文件
function createBaseConfigFiles() {
  console.log('开始创建基础配置文件...');
  
  const configFiles = [
    {
      path: 'frontend/im/package.json',
      content: JSON.stringify({
        "name": "im-frontend",
        "version": "1.0.0",
        "description": "IM即时通讯前端 - 基于Mattermost前端，移除官方监控",
        "scripts": {
          "dev": "vite",
          "build": "tsc && vite build",
          "preview": "vite preview"
        },
        "dependencies": {
          "react": "^18.2.0",
          "react-dom": "^18.2.0",
          "react-router-dom": "^6.8.0"
        },
        "devDependencies": {
          "@types/node": "^18.11.18",
          "@types/react": "^18.0.27",
          "@types/react-dom": "^18.0.10",
          "typescript": "^4.9.5",
          "vite": "^4.1.1"
        }
      }, null, 2)
    },
    {
      path: 'frontend/agima/package.json',
      content: JSON.stringify({
        "name": "agima-frontend",
        "version": "1.0.0",
        "description": "AgiMa前端应用 - 移动端优化",
        "scripts": {
          "dev": "vite",
          "build": "tsc && vite build",
          "preview": "vite preview"
        },
        "dependencies": {
          "react": "^18.2.0",
          "react-dom": "^18.2.0",
          "react-router-dom": "^6.8.0"
        },
        "devDependencies": {
          "@types/node": "^18.11.18",
          "@types/react": "^18.0.27",
          "@types/react-dom": "^18.0.10",
          "typescript": "^4.9.5",
          "vite": "^4.1.1"
        }
      }, null, 2)
    },
    {
      path: 'backend/package.json',
      content: JSON.stringify({
        "name": "mattermost-backend",
        "version": "1.0.0",
        "description": "后端服务 - 基于Mattermost API，移除官方监控",
        "main": "index.js",
        "scripts": {
          "start": "node index.js",
          "dev": "nodemon index.js"
        },
        "dependencies": {
          "express": "^4.18.2",
          "cors": "^2.8.5",
          "helmet": "^6.0.1",
          "compression": "^1.7.4",
          "socket.io": "^4.6.0",
          "dotenv": "^16.0.3"
        },
        "devDependencies": {
          "@types/express": "^4.17.17",
          "@types/node": "^18.11.18",
          "nodemon": "^2.0.20"
        }
      }, null, 2)
    },
    {
      path: 'database/package.json',
      content: JSON.stringify({
        "name": "database",
        "version": "1.0.0",
        "description": "数据库层 - 管理数据模型和迁移",
        "main": "index.js",
        "scripts": {
          "migrate": "node scripts/migrate.js",
          "seed": "node scripts/seed.js"
        },
        "dependencies": {
          "knex": "^2.4.2",
          "pg": "^8.9.0",
          "sqlite3": "^5.1.4"
        },
        "devDependencies": {
          "@types/node": "^18.11.18"
        }
      }, null, 2)
    },
    {
      path: 'package.json',
      content: JSON.stringify({
        "name": "agima-mattermost-integrated",
        "version": "1.0.0",
        "description": "AgiMa与Mattermost集成项目",
        "scripts": {
          "setup": "node project-structure.js",
          "start": "concurrently \"npm run start:frontend\" \"npm run start:backend\"",
          "start:frontend": "concurrently \"cd frontend/im && npm run dev\" \"cd frontend/agima && npm run dev\"",
          "start:backend": "cd backend && npm run dev",
          "build": "npm run build:im && npm run build:agima && npm run build:backend",
          "build:im": "cd frontend/im && npm run build",
          "build:agima": "cd frontend/agima && npm run build",
          "build:backend": "cd backend && npm run build"
        },
        "dependencies": {
          "concurrently": "^7.6.0"
        }
      }, null, 2)
    },
    {
      path: 'config.js',
      content: `/**
 * 项目全局配置文件
 */

module.exports = {
  // 前端配置
  frontend: {
    imPort: 3001,
    agimaPort: 3000
  },
  
  // 后端配置
  backend: {
    port: 8065,
    apiPrefix: '/api',
    corsOrigin: '*'
  },
  
  // 数据库配置
  database: {
    client: 'sqlite3',
    connection: {
      filename: './database/data/mattermost.db'
    },
    useNullAsDefault: true
  }
};
`
    }
  ];
  
  configFiles.forEach(file => {
    const filePath = path.join(BASE_DIR, file.path);
    const fileDir = path.dirname(filePath);
    
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, file.content);
    console.log(`✅ 创建文件: ${file.path}`);
  });
  
  console.log('基础配置文件创建完成!');
}

// 创建项目架构说明文件
function createReadme() {
  const content = `# AgiMa + Mattermost 集成项目

## 项目架构

项目采用清晰的分层架构:

### 前端

#### 即时通讯 (IM)
- 基于Mattermost前端，移除官方监控
- 提供聊天、频道和团队管理功能
- 集成到AgiMa应用中

#### AgiMa主应用
- 移动端优化的用户界面
- GPU实例管理、租用和监控
- 交易和钱包功能

### 后端
- API服务和路由
- 权限控制和中间件
- WebSocket服务
- PM模块集成系统

### 数据库
- 数据模型和架构
- 迁移和种子脚本
- 查询工具

## 安装与使用

1. 安装依赖:
\`\`\`bash
npm install
cd frontend/im && npm install
cd frontend/agima && npm install
cd backend && npm install
cd database && npm install
\`\`\`

2. 启动开发服务:
\`\`\`bash
npm start
\`\`\`

3. 构建生产版本:
\`\`\`bash
npm run build
\`\`\`

## 移除官方监控

本项目已移除所有Mattermost官方监控和遥测代码，确保数据隐私和安全。
`;

  fs.writeFileSync(path.join(BASE_DIR, 'README.md'), content);
  console.log('✅ 创建项目说明文档: README.md');
}

// 执行创建操作
(function init() {
  console.log('开始重组项目架构...');
  createDirectories();
  createBaseConfigFiles();
  createReadme();
  console.log('项目架构重组完成! 请按照README.md中的说明继续安装和配置。');
})();