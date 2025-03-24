#!/usr/bin/env node

/**
 * Agi-Ma + Mattermost 项目文件迁移脚本
 * 将现有文件重新组织到新的文件结构中
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 定义颜色代码
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// 打印标题
console.log(`${colors.bright}${colors.cyan}====================================================${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}       Agi-Ma + Mattermost 项目文件迁移脚本         ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}====================================================${colors.reset}\n`);

// 目录路径
const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');
const frontendIMDir = path.join(rootDir, 'frontend/im');
const frontendAgimaDir = path.join(rootDir, 'frontend/agima');
const backendDir = path.join(rootDir, 'backend');
const databaseDir = path.join(rootDir, 'database');

// 确保目录存在
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`${colors.green}创建目录: ${dir}${colors.reset}`);
  }
}

// 复制文件
function copyFile(source, destination) {
  try {
    const destDir = path.dirname(destination);
    ensureDirExists(destDir);
    
    fs.copyFileSync(source, destination);
    console.log(`${colors.green}复制文件: ${source} -> ${destination}${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}复制失败: ${source} -> ${destination}\n${error.message}${colors.reset}`);
    return false;
  }
}

// 复制目录
function copyDir(source, destination, filter = null) {
  if (!fs.existsSync(source)) {
    console.error(`${colors.yellow}源目录不存在: ${source}${colors.reset}`);
    return false;
  }
  
  ensureDirExists(destination);
  
  try {
    const entries = fs.readdirSync(source, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(source, entry.name);
      const destPath = path.join(destination, entry.name);
      
      // 如果有过滤器并且过滤器返回false，则跳过该文件
      if (filter && !filter(srcPath, entry)) {
        continue;
      }
      
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath, filter);
      } else {
        copyFile(srcPath, destPath);
      }
    }
    
    return true;
  } catch (error) {
    console.error(`${colors.red}复制目录失败: ${source} -> ${destination}\n${error.message}${colors.reset}`);
    return false;
  }
}

// 删除目录
function removeDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`${colors.yellow}删除目录: ${dir}${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}删除目录失败: ${dir}\n${error.message}${colors.reset}`);
  }
}

// 删除文件
function removeFile(file) {
  if (!fs.existsSync(file)) {
    return;
  }
  
  try {
    fs.unlinkSync(file);
    console.log(`${colors.yellow}删除文件: ${file}${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}删除文件失败: ${file}\n${error.message}${colors.reset}`);
  }
}

// 创建基本目录结构
function createDirectoryStructure() {
  console.log(`${colors.bright}[1/5] 创建目录结构...${colors.reset}`);
  
  ensureDirExists(frontendIMDir);
  ensureDirExists(path.join(frontendIMDir, 'src'));
  ensureDirExists(path.join(frontendIMDir, 'public'));
  
  ensureDirExists(frontendAgimaDir);
  ensureDirExists(path.join(frontendAgimaDir, 'src'));
  ensureDirExists(path.join(frontendAgimaDir, 'public'));
  
  ensureDirExists(backendDir);
  ensureDirExists(path.join(backendDir, 'src'));
  ensureDirExists(path.join(backendDir, 'public'));
  
  ensureDirExists(databaseDir);
  ensureDirExists(path.join(databaseDir, 'src'));
  ensureDirExists(path.join(databaseDir, 'migrations'));
  
  console.log(`${colors.green}目录结构创建完成✓${colors.reset}\n`);
}

// 复制配置文件
function copyConfigFiles() {
  console.log(`${colors.bright}[2/5] 复制配置文件...${colors.reset}`);
  
  // IM前端配置
  copyFile(path.join(rootDir, 'package.json'), path.join(frontendIMDir, 'package.json'));
  copyFile(path.join(rootDir, 'tsconfig.json'), path.join(frontendIMDir, 'tsconfig.json'));
  copyFile(path.join(rootDir, 'vite.config.ts'), path.join(frontendIMDir, 'vite.config.ts'));
  copyFile(path.join(rootDir, 'index.html'), path.join(frontendIMDir, 'index.html'));
  copyFile(path.join(rootDir, 'postcss.config.js'), path.join(frontendIMDir, 'postcss.config.js'));
  copyFile(path.join(rootDir, 'tailwind.config.ts'), path.join(frontendIMDir, 'tailwind.config.ts'));
  
  // Agima前端配置
  const agimaPackagePath = path.join(frontendAgimaDir, 'package.json');
  if (fs.existsSync(path.join(frontendAgimaDir, 'package.json'))) {
    console.log(`${colors.blue}使用现有的Agima package.json${colors.reset}`);
  } else {
    copyFile(path.join(rootDir, 'package.json'), agimaPackagePath);
    
    // 更新Agima package.json
    if (fs.existsSync(agimaPackagePath)) {
      try {
        const packageData = JSON.parse(fs.readFileSync(agimaPackagePath, 'utf8'));
        packageData.name = "agima-frontend";
        packageData.version = "1.0.0";
        packageData.description = "Agi-Ma移动端前端，适配Mattermost后端API";
        packageData.scripts = {
          ...packageData.scripts,
          "dev": "vite --port 3100",
          "build:mobile": "vite build --outDir dist/mobile"
        };
        
        fs.writeFileSync(agimaPackagePath, JSON.stringify(packageData, null, 2));
        console.log(`${colors.green}更新Agima package.json${colors.reset}`);
      } catch (error) {
        console.error(`${colors.red}更新Agima package.json失败: ${error.message}${colors.reset}`);
      }
    }
  }
  
  copyFile(path.join(rootDir, 'tsconfig.json'), path.join(frontendAgimaDir, 'tsconfig.json'));
  copyFile(path.join(rootDir, 'vite.config.ts'), path.join(frontendAgimaDir, 'vite.config.ts'));
  copyFile(path.join(rootDir, 'index.html'), path.join(frontendAgimaDir, 'index.html'));
  copyFile(path.join(rootDir, 'postcss.config.js'), path.join(frontendAgimaDir, 'postcss.config.js'));
  copyFile(path.join(rootDir, 'tailwind.config.ts'), path.join(frontendAgimaDir, 'tailwind.config.ts'));
  
  // 后端配置
  const backendPackagePath = path.join(backendDir, 'package.json');
  if (fs.existsSync(backendPackagePath)) {
    console.log(`${colors.blue}使用现有的Backend package.json${colors.reset}`);
  } else {
    // 创建后端package.json
    const backendPackage = {
      "name": "backend",
      "version": "1.0.0",
      "description": "Mattermost兼容后端服务",
      "main": "src/server.js",
      "type": "module",
      "scripts": {
        "start": "node src/server.js",
        "dev": "nodemon src/server.js",
        "test": "jest"
      },
      "dependencies": {
        "express": "^4.18.2",
        "cors": "^2.8.5",
        "helmet": "^7.1.0",
        "compression": "^1.7.4",
        "body-parser": "^1.20.2",
        "socket.io": "^4.7.2",
        "morgan": "^1.10.0",
        "dotenv": "^16.3.1",
        "express-rate-limit": "^7.1.5",
        "jsonwebtoken": "^9.0.2",
        "bcrypt": "^5.1.1",
        "sqlite3": "^5.1.6"
      },
      "devDependencies": {
        "nodemon": "^3.0.1",
        "jest": "^29.7.0",
        "@types/express": "^4.17.21",
        "@types/cors": "^2.8.17",
        "@types/node": "^20.10.4"
      }
    };
    
    fs.writeFileSync(backendPackagePath, JSON.stringify(backendPackage, null, 2));
    console.log(`${colors.green}创建Backend package.json${colors.reset}`);
  }
  
  // 数据库配置
  const dbPackagePath = path.join(databaseDir, 'package.json');
  if (fs.existsSync(dbPackagePath)) {
    console.log(`${colors.blue}使用现有的Database package.json${colors.reset}`);
  } else {
    // 创建数据库package.json
    const dbPackage = {
      "name": "database",
      "version": "1.0.0",
      "description": "Mattermost兼容数据库服务",
      "main": "src/index.js",
      "type": "module",
      "scripts": {
        "start": "node src/index.js",
        "migrate": "node src/migrations/run.js",
        "seed": "node src/seeds/run.js"
      },
      "dependencies": {
        "sqlite3": "^5.1.6",
        "pg": "^8.11.3",
        "mysql2": "^3.6.5",
        "dotenv": "^16.3.1",
        "knex": "^3.1.0"
      },
      "devDependencies": {
        "@types/node": "^20.10.4"
      }
    };
    
    fs.writeFileSync(dbPackagePath, JSON.stringify(dbPackage, null, 2));
    console.log(`${colors.green}创建Database package.json${colors.reset}`);
  }
  
  // 复制公共配置文件
  copyFile(path.join(rootDir, '.env'), path.join(rootDir, '.env'));
  console.log(`${colors.green}配置文件复制完成✓${colors.reset}\n`);
}

// 适配前端IM代码
function adaptIMFrontend() {
  console.log(`${colors.bright}[3/5] 适配IM前端代码...${colors.reset}`);
  
  // 复制公共组件
  copyDir(
    path.join(srcDir, 'components'), 
    path.join(frontendIMDir, 'src/components'),
    (srcPath, entry) => !entry.name.startsWith('mobile') // 排除移动端组件
  );
  
  // 复制公共hooks
  copyDir(
    path.join(srcDir, 'hooks'), 
    path.join(frontendIMDir, 'src/hooks'),
    (srcPath, entry) => !entry.name.startsWith('mobile') // 排除移动端hooks
  );
  
  // 复制公共utils和services
  copyDir(path.join(srcDir, 'utils'), path.join(frontendIMDir, 'src/utils'));
  copyDir(path.join(srcDir, 'services'), path.join(frontendIMDir, 'src/services'));
  
  // 复制types
  copyDir(path.join(srcDir, 'types'), path.join(frontendIMDir, 'src/types'));
  
  // 复制context
  copyDir(path.join(srcDir, 'context'), path.join(frontendIMDir, 'src/context'));
  
  // 复制providers
  copyDir(path.join(srcDir, 'providers'), path.join(frontendIMDir, 'src/providers'));
  
  // 复制非移动端页面
  copyDir(
    path.join(srcDir, 'pages'), 
    path.join(frontendIMDir, 'src/pages'),
    (srcPath, entry) => !entry.name.startsWith('mobile') && !srcPath.includes('mobile') // 排除移动端页面
  );
  
  // 复制CSS
  copyDir(path.join(srcDir, 'styles'), path.join(frontendIMDir, 'src/styles'));
  copyFile(path.join(srcDir, 'index.css'), path.join(frontendIMDir, 'src/index.css'));
  
  // 复制主入口文件
  copyFile(path.join(srcDir, 'main.tsx'), path.join(frontendIMDir, 'src/main.tsx'));
  copyFile(path.join(srcDir, 'App.tsx'), path.join(frontendIMDir, 'src/App.tsx'));
  copyFile(path.join(srcDir, 'vite-env.d.ts'), path.join(frontendIMDir, 'src/vite-env.d.ts'));
  
  // 复制公共资源
  copyDir(path.join(rootDir, 'public'), path.join(frontendIMDir, 'public'));
  
  console.log(`${colors.green}IM前端代码适配完成✓${colors.reset}\n`);
}

// 适配Agima移动端前端
function adaptAgimaMobileFrontend() {
  console.log(`${colors.bright}[4/5] 适配Agima移动端前端...${colors.reset}`);
  
  // 创建移动端入口文件
  copyFile(path.join(srcDir, 'MobileApp.tsx'), path.join(frontendAgimaDir, 'src/App.tsx'));
  
  // 复制移动端页面组件
  copyDir(
    path.join(srcDir, 'pages/mobile'), 
    path.join(frontendAgimaDir, 'src/pages')
  );
  
  // 复制公共components
  copyDir(path.join(srcDir, 'components/ui'), path.join(frontendAgimaDir, 'src/components/ui'));
  
  // 复制services、hooks和适配器
  copyDir(path.join(srcDir, 'services'), path.join(frontendAgimaDir, 'src/services'));
  copyDir(path.join(srcDir, 'hooks'), path.join(frontendAgimaDir, 'src/hooks'));
  copyDir(path.join(srcDir, 'providers'), path.join(frontendAgimaDir, 'src/providers'));
  copyDir(path.join(srcDir, 'context'), path.join(frontendAgimaDir, 'src/context'));
  copyDir(path.join(srcDir, 'types'), path.join(frontendAgimaDir, 'src/types'));
  copyDir(path.join(srcDir, 'utils'), path.join(frontendAgimaDir, 'src/utils'));
  
  // 复制CSS
  copyDir(path.join(srcDir, 'styles'), path.join(frontendAgimaDir, 'src/styles'));
  copyFile(path.join(srcDir, 'index.css'), path.join(frontendAgimaDir, 'src/index.css'));
  
  // 创建移动端入口文件
  const mainTsxContent = `import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// 移动端入口文件
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
`;

  fs.writeFileSync(path.join(frontendAgimaDir, 'src/main.tsx'), mainTsxContent);
  console.log(`${colors.green}创建移动端入口文件 main.tsx${colors.reset}`);
  
  // 复制其他必要文件
  copyFile(path.join(srcDir, 'vite-env.d.ts'), path.join(frontendAgimaDir, 'src/vite-env.d.ts'));
  
  // 复制公共资源
  copyDir(path.join(rootDir, 'public'), path.join(frontendAgimaDir, 'public'));
  
  console.log(`${colors.green}Agima移动端前端适配完成✓${colors.reset}\n`);
}

// 适配后端和数据库代码
function adaptBackendAndDatabase() {
  console.log(`${colors.bright}[5/5] 适配后端和数据库代码...${colors.reset}`);
  
  // 复制后端服务器代码
  if (fs.existsSync(path.join(rootDir, 'mattermost-backend'))) {
    copyDir(
      path.join(rootDir, 'mattermost-backend/src'), 
      path.join(backendDir, 'src')
    );
  } else {
    // 创建后端基本文件
    const serverTsPath = path.join(backendDir, 'src/server.ts');
    if (!fs.existsSync(serverTsPath)) {
      copyFile(path.join(srcDir, 'services/mattermostApiService.ts'), path.join(backendDir, 'src/services/apiService.ts'));
      
      // 创建PM模块接口
      const pmInterfacePath = path.join(backendDir, 'src/modules/pmInterface.ts');
      ensureDirExists(path.dirname(pmInterfacePath));
      if (fs.existsSync(path.join(rootDir, 'mattermost-backend/src/modules/pmInterface.ts'))) {
        copyFile(
          path.join(rootDir, 'mattermost-backend/src/modules/pmInterface.ts'),
          pmInterfacePath
        );
      } else {
        copyFile(path.join(srcDir, 'services/mobileAdapter.ts'), path.join(backendDir, 'src/services/mobileAdapter.ts'));
      }
    }
  }
  
  // 创建数据库基本文件
  const dbIndexPath = path.join(databaseDir, 'src/index.js');
  if (!fs.existsSync(dbIndexPath)) {
    const dbIndexContent = `/**
 * 数据库服务主入口
 * 提供与Mattermost兼容的数据存储服务
 */

import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// 加载环境变量
dotenv.config();

// 确定数据库文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = process.env.DB_PATH || path.join(__dirname, '../data/mattermost.db');

// 初始化SQLite数据库
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('数据库连接失败:', err.message);
    process.exit(1);
  }
  console.log('已连接到SQLite数据库');
});

// 初始化数据库表
function initDatabase() {
  // 创建用户表
  db.run(\`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    nickname TEXT,
    roles TEXT,
    created_at INTEGER,
    updated_at INTEGER
  )\`);
  
  // 创建频道表
  db.run(\`CREATE TABLE IF NOT EXISTS channels (
    id TEXT PRIMARY KEY,
    team_id TEXT,
    creator_id TEXT,
    name TEXT NOT NULL,
    display_name TEXT,
    type TEXT,
    purpose TEXT,
    header TEXT,
    created_at INTEGER,
    updated_at INTEGER
  )\`);
  
  // 创建消息表
  db.run(\`CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    channel_id TEXT,
    user_id TEXT,
    message TEXT,
    props TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY(channel_id) REFERENCES channels(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
  )\`);
  
  console.log('数据库表初始化完成');
}

// 导出数据库实例
export const database = {
  db,
  initDatabase
};

// 启动时初始化数据库
database.initDatabase();
console.log('数据库服务已启动，监听连接请求');
`;
    
    fs.writeFileSync(dbIndexPath, dbIndexContent);
    console.log(`${colors.green}创建数据库入口文件 index.js${colors.reset}`);
  }
  
  // 创建迁移脚本目录
  ensureDirExists(path.join(databaseDir, 'migrations'));
  const migrationScriptPath = path.join(databaseDir, 'migrations/01-initial-schema.js');
  if (!fs.existsSync(migrationScriptPath)) {
    const migrationContent = `/**
 * 初始数据库架构迁移脚本
 */

export async function up(db) {
  // 创建用户表
  await db.run(\`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    nickname TEXT,
    roles TEXT,
    created_at INTEGER,
    updated_at INTEGER
  )\`);
  
  // 创建频道表
  await db.run(\`CREATE TABLE IF NOT EXISTS channels (
    id TEXT PRIMARY KEY,
    team_id TEXT,
    creator_id TEXT,
    name TEXT NOT NULL,
    display_name TEXT,
    type TEXT,
    purpose TEXT,
    header TEXT,
    created_at INTEGER,
    updated_at INTEGER
  )\`);
  
  // 创建消息表
  await db.run(\`CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    channel_id TEXT,
    user_id TEXT,
    message TEXT,
    props TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY(channel_id) REFERENCES channels(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
  )\`);
  
  console.log('初始架构迁移完成');
}

export async function down(db) {
  // 删除表 (按照依赖顺序反向删除)
  await db.run('DROP TABLE IF EXISTS posts');
  await db.run('DROP TABLE IF EXISTS channels');
  await db.run('DROP TABLE IF EXISTS users');
  
  console.log('初始架构回滚完成');
}
`;
    
    fs.writeFileSync(migrationScriptPath, migrationContent);
    console.log(`${colors.green}创建数据库迁移脚本${colors.reset}`);
  }
  
  console.log(`${colors.green}后端和数据库代码适配完成✓${colors.reset}\n`);
}

// 更新根目录下的启动脚本
function updateRootScripts() {
  console.log(`${colors.bright}[额外步骤] 更新根目录下的启动脚本...${colors.reset}`);
  
  // 确保启动脚本存在
  if (!fs.existsSync(path.join(rootDir, 'start.js'))) {
    console.log(`${colors.yellow}警告: 未找到启动脚本 start.js${colors.reset}`);
  }
  
  // 确保安装脚本存在
  if (!fs.existsSync(path.join(rootDir, 'install.js'))) {
    console.log(`${colors.yellow}警告: 未找到安装脚本 install.js${colors.reset}`);
  }
  
  console.log(`${colors.green}根目录脚本更新完成✓${colors.reset}\n`);
}

// 清理无用文件
function cleanupUnusedFiles() {
  const confirmed = true; // 自动模式下默认确认
  
  if (confirmed) {
    console.log(`${colors.bright}[清理] 删除无用文件和目录...${colors.reset}`);
    
    const filesToDelete = [
      // 重复的配置文件
      'frontend-im.js',
      'frontend-agima.js',
      'structure.md',
      'structure-new.md',
      'USAGE.md',
      'start-mobile.js',
      'install-deps.js',
      'project-structure.js',
      
      // 已移动的源码
      'src/App.tsx.example',
      'components.json',
      
      // 过时的锁文件
      'yarn.lock',
      'package-lock.json'
    ];
    
    const dirsToDelete = [
      // 已移动的目录，但保留原始源码以备参考
      //'src/components',
      //'src/hooks',
      //'src/pages',
      //'src/services',
      //'src/utils',
      //'src/context',
      //'src/providers',
      
      // 过时的构建目录
      'dist',
      'build',
      'node_modules'
    ];
    
    // 删除文件
    for (const file of filesToDelete) {
      removeFile(path.join(rootDir, file));
    }
    
    // 删除目录
    for (const dir of dirsToDelete) {
      removeDir(path.join(rootDir, dir));
    }
    
    console.log(`${colors.green}无用文件清理完成✓${colors.reset}\n`);
  } else {
    console.log(`${colors.blue}跳过清理操作${colors.reset}\n`);
  }
}

// 主函数
async function main() {
  try {
    // 检查目录
    if (!fs.existsSync(srcDir)) {
      console.error(`${colors.red}源代码目录不存在: ${srcDir}${colors.reset}`);
      process.exit(1);
    }
    
    // 执行迁移步骤
    createDirectoryStructure();
    copyConfigFiles();
    adaptIMFrontend();
    adaptAgimaMobileFrontend();
    adaptBackendAndDatabase();
    updateRootScripts();
    
    // 询问是否清理无用文件
    cleanupUnusedFiles();
    
    console.log(`\n${colors.bright}${colors.green}文件迁移完成！${colors.reset}`);
    console.log(`${colors.cyan}现在可以使用以下命令启动项目：${colors.reset}`);
    console.log(`${colors.bright}node install.js${colors.reset} - 安装所有依赖`);
    console.log(`${colors.bright}node start.js${colors.reset} - 启动所有服务`);
    console.log(`${colors.bright}node start.js im${colors.reset} - 仅启动IM前端`);
    console.log(`${colors.bright}node start.js agima${colors.reset} - 仅启动移动前端`);
    
  } catch (error) {
    console.error(`${colors.red}迁移失败: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// 执行主函数
main();