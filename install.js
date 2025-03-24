#!/usr/bin/env node

/**
 * 项目依赖安装脚本
 * 用于安装所有必要的依赖和类型声明包
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
console.log(`${colors.bright}${colors.cyan}        Agi-Ma + Mattermost 依赖安装脚本            ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}====================================================${colors.reset}\n`);

// 检查项目结构
console.log(`${colors.green}[1/5] 检查项目结构...${colors.reset}`);
const requiredDirs = [
  'frontend/im',
  'frontend/agima',
  'backend',
  'database'
];

let allDirsExist = true;
for (const dir of requiredDirs) {
  if (!fs.existsSync(dir)) {
    console.log(`${colors.red}目录不存在: ${dir}${colors.reset}`);
    allDirsExist = false;
  }
}

if (!allDirsExist) {
  console.log(`${colors.red}项目结构不完整，请先创建所需目录${colors.reset}`);
  process.exit(1);
}

console.log(`${colors.green}项目结构检查通过✓${colors.reset}\n`);

// 安装前端依赖
console.log(`${colors.green}[2/5] 安装IM前端依赖...${colors.reset}`);
try {
  execSync('cd frontend/im && npm install --save react react-dom react-router-dom lucide-react axios tailwindcss', { stdio: 'inherit' });
  execSync('cd frontend/im && npm install --save-dev @types/react @types/react-dom @types/react-router-dom typescript eslint', { stdio: 'inherit' });
  console.log(`${colors.green}IM前端依赖安装成功✓${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}IM前端依赖安装失败: ${error.message}${colors.reset}`);
}

console.log(`${colors.green}[3/5] 安装AgiMa前端依赖...${colors.reset}`);
try {
  execSync('cd frontend/agima && npm install --save react react-dom react-router-dom lucide-react axios tailwindcss', { stdio: 'inherit' });
  execSync('cd frontend/agima && npm install --save-dev @types/react @types/react-dom @types/react-router-dom typescript eslint', { stdio: 'inherit' });
  console.log(`${colors.green}AgiMa前端依赖安装成功✓${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}AgiMa前端依赖安装失败: ${error.message}${colors.reset}`);
}

// 安装后端依赖
console.log(`${colors.green}[4/5] 安装后端依赖...${colors.reset}`);
try {
  execSync('cd backend && npm install --save express cors helmet compression body-parser socket.io morgan dotenv express-rate-limit', { stdio: 'inherit' });
  execSync('cd backend && npm install --save-dev @types/express @types/cors @types/helmet @types/compression @types/body-parser @types/socket.io @types/morgan @types/node', { stdio: 'inherit' });
  console.log(`${colors.green}后端依赖安装成功✓${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}后端依赖安装失败: ${error.message}${colors.reset}`);
}

// 安装数据库依赖
console.log(`${colors.green}[5/5] 安装数据库依赖...${colors.reset}`);
try {
  execSync('cd database && npm install --save knex pg sqlite3 mysql2 mongodb mongoose sequelize dotenv', { stdio: 'inherit' });
  execSync('cd database && npm install --save-dev @types/node @types/pg @types/mongoose typescript', { stdio: 'inherit' });
  console.log(`${colors.green}数据库依赖安装成功✓${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}数据库依赖安装失败: ${error.message}${colors.reset}`);
}

// 安装完成
console.log(`\n${colors.bright}${colors.cyan}====================================================${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}                 依赖安装已完成                    ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}====================================================${colors.reset}\n`);

console.log(`${colors.green}可以使用以下命令启动项目:${colors.reset}`);
console.log(`${colors.yellow}1. 启动前端开发服务器:${colors.reset} node run-frontend.js`);
console.log(`${colors.yellow}2. 启动后端服务:${colors.reset} node run-backend.js`);
console.log(`${colors.yellow}3. 启动完整项目:${colors.reset} node start.js\n`);

console.log(`${colors.green}注意:${colors.reset} 首次运行可能需要设置环境变量，请参考README.md\n`);