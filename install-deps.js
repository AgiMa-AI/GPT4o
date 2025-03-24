#!/usr/bin/env node

/**
 * 依赖安装脚本
 * 为Agi-Ma + Mattermost移动端集成项目安装所需的所有依赖
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// 配置
const config = {
  // 安装管理器，可选 'npm'、'yarn' 或 'bun'
  packageManager: 'npm',
  
  // 是否安装到开发依赖
  devDependencies: true,
  
  // 安装模式，可选 'all'、'frontend'、'mattermost-frontend'、'mattermost-backend'
  installMode: 'all'
};

// 要安装的依赖
const dependencies = {
  frontend: {
    dependencies: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'lucide-react',
      'clsx',
      'tailwindcss',
      '@radix-ui/react-slot'
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      '@types/react-router-dom',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'typescript',
      'vite'
    ]
  },
  'mattermost-frontend': {
    dependencies: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'axios',
      'zustand',
      'socket.io-client'
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      '@types/react-router-dom', 
      'typescript'
    ]
  },
  'mattermost-backend': {
    dependencies: [
      'express',
      'cors',
      'helmet',
      'compression',
      'body-parser',
      'socket.io',
      'morgan',
      'dotenv',
      'express-rate-limit',
      'jsonwebtoken',
      'bcrypt',
      'sqlite3',
      'winston'
    ],
    devDependencies: [
      '@types/node',
      '@types/express',
      '@types/cors',
      '@types/helmet',
      '@types/compression',
      '@types/body-parser',
      '@types/socket.io',
      '@types/morgan',
      '@types/jsonwebtoken',
      '@types/bcrypt',
      'typescript',
      'ts-node',
      'nodemon'
    ]
  }
};

/**
 * 打印带颜色的消息
 */
function printColoredMessage(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * 检查目录是否存在
 */
function checkDirectoryExists(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

/**
 * 安装依赖
 */
function installDeps(dir, deps, isDev) {
  if (!deps || deps.length === 0) return;
  
  const devFlag = isDev ? 
    (config.packageManager === 'npm' ? '--save-dev' : '-D') : 
    '';
  
  const command = {
    'npm': `npm install ${devFlag} ${deps.join(' ')}`,
    'yarn': `yarn add ${devFlag} ${deps.join(' ')}`,
    'bun': `bun add ${devFlag} ${deps.join(' ')}`
  }[config.packageManager];
  
  printColoredMessage('cyan', `在 ${dir} 中安装${isDev ? '开发' : ''}依赖：`);
  printColoredMessage('yellow', deps.join(', '));
  
  try {
    execSync(command, { 
      cwd: path.resolve(__dirname, dir),
      stdio: 'inherit' 
    });
    printColoredMessage('green', `✅ ${dir} 依赖安装成功`);
  } catch (error) {
    printColoredMessage('red', `❌ ${dir} 依赖安装失败：${error.message}`);
    process.exit(1);
  }
}

/**
 * 主函数
 */
async function main() {
  printColoredMessage('bright', '='.repeat(50));
  printColoredMessage('bright', '   Agi-Ma + Mattermost 移动端集成项目依赖安装');
  printColoredMessage('bright', '='.repeat(50));
  console.log();
  
  // 选择安装模式
  if (process.argv.length > 2) {
    const mode = process.argv[2];
    if (['all', 'frontend', 'mattermost-frontend', 'mattermost-backend'].includes(mode)) {
      config.installMode = mode;
    }
  }
  
  printColoredMessage('cyan', `🔧 安装模式: ${config.installMode}`);
  printColoredMessage('cyan', `📦 包管理器: ${config.packageManager}`);
  console.log();
  
  // 安装依赖
  if (config.installMode === 'all' || config.installMode === 'frontend') {
    if (checkDirectoryExists('frontend')) {
      installDeps('frontend', dependencies.frontend.dependencies, false);
      if (config.devDependencies) {
        installDeps('frontend', dependencies.frontend.devDependencies, true);
      }
    } else {
      printColoredMessage('yellow', '⚠️ frontend 目录不存在，跳过安装');
    }
  }
  
  if (config.installMode === 'all' || config.installMode === 'mattermost-frontend') {
    if (checkDirectoryExists('mattermost-frontend')) {
      installDeps('mattermost-frontend', dependencies['mattermost-frontend'].dependencies, false);
      if (config.devDependencies) {
        installDeps('mattermost-frontend', dependencies['mattermost-frontend'].devDependencies, true);
      }
    } else {
      printColoredMessage('yellow', '⚠️ mattermost-frontend 目录不存在，跳过安装');
    }
  }
  
  if (config.installMode === 'all' || config.installMode === 'mattermost-backend') {
    if (checkDirectoryExists('mattermost-backend')) {
      installDeps('mattermost-backend', dependencies['mattermost-backend'].dependencies, false);
      if (config.devDependencies) {
        installDeps('mattermost-backend', dependencies['mattermost-backend'].devDependencies, true);
      }
    } else {
      printColoredMessage('yellow', '⚠️ mattermost-backend 目录不存在，跳过安装');
    }
  }
  
  // 安装根目录依赖
  // 这是为了解决根目录脚本运行的依赖
  if (config.installMode === 'all' && fs.existsSync('package.json')) {
    const rootDeps = [
      '@types/node'
    ];
    
    installDeps('.', rootDeps, true);
  }
  
  console.log();
  printColoredMessage('bright', '='.repeat(50));
  printColoredMessage('green', '   🎉 依赖安装完成！');
  printColoredMessage('bright', '='.repeat(50));
  console.log();
  printColoredMessage('cyan', '👉 现在您可以运行以下命令启动应用：');
  printColoredMessage('yellow', '   node start-mobile.js');
  console.log();
}

// 运行主函数
main().catch(err => {
  printColoredMessage('red', `❌ 运行出错：${err.message}`);
  process.exit(1);
});