#!/usr/bin/env node

/**
 * Agi-Ma + Mattermost 集成项目启动脚本
 * 用于启动前端/IM、前端/AgiMa、后端和数据库服务
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
console.log(`${colors.bright}${colors.cyan}       Agi-Ma + Mattermost 集成项目启动脚本         ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}====================================================${colors.reset}\n`);

// 获取启动模式
const args = process.argv.slice(2);
let startMode = 'all'; // 默认启动所有服务

if (args.length > 0) {
  startMode = args[0];
}

// 检查环境变量
if (!fs.existsSync('.env')) {
  console.log(`${colors.yellow}警告: 未找到.env文件，将使用默认配置${colors.reset}`);
  // 创建默认.env文件
  const defaultEnv = 
`# Agi-Ma + Mattermost 集成项目环境配置
APP_MODE=development
FRONTEND_PORT=3000
BACKEND_PORT=8065
DATABASE_URL=sqlite://./database/data.sqlite
DISABLE_OFFICIAL_MONITORING=true
MATTERMOST_API_URL=http://localhost:8065/api/v4
CORS_ORIGIN=*`;

  fs.writeFileSync('.env', defaultEnv);
  console.log(`${colors.green}已创建默认.env文件${colors.reset}`);
}

// 检查配置
console.log(`${colors.green}[1/4] 检查配置...${colors.reset}`);
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
  console.log(`${colors.red}项目结构不完整，请先创建所需目录或运行安装脚本 (node install.js)${colors.reset}`);
  process.exit(1);
}

console.log(`${colors.green}配置检查通过✓${colors.reset}\n`);

// 启动数据库服务
async function startDatabase() {
  console.log(`${colors.green}[2/4] 启动数据库服务...${colors.reset}`);
  
  return new Promise((resolve, reject) => {
    const dbProcess = spawn('node', ['src/index.js'], { 
      cwd: path.join(process.cwd(), 'database'),
      stdio: 'pipe',
      shell: true
    });
    
    dbProcess.stdout.on('data', (data) => {
      console.log(`${colors.blue}[数据库] ${data.toString().trim()}${colors.reset}`);
    });
    
    dbProcess.stderr.on('data', (data) => {
      console.error(`${colors.red}[数据库错误] ${data.toString().trim()}${colors.reset}`);
    });
    
    // 等待数据库准备就绪
    let startTimeout = setTimeout(() => {
      console.log(`${colors.yellow}[数据库] 假设数据库已准备就绪 (超时)${colors.reset}`);
      resolve(dbProcess);
    }, 5000);
    
    dbProcess.stdout.on('data', (data) => {
      if (data.toString().includes('Database ready')) {
        clearTimeout(startTimeout);
        console.log(`${colors.green}[数据库] 服务已启动✓${colors.reset}\n`);
        resolve(dbProcess);
      }
    });
    
    dbProcess.on('error', (err) => {
      clearTimeout(startTimeout);
      console.error(`${colors.red}[数据库] 启动失败: ${err.message}${colors.reset}`);
      reject(err);
    });
  });
}

// 启动后端服务
async function startBackend() {
  console.log(`${colors.green}[3/4] 启动后端服务...${colors.reset}`);
  
  return new Promise((resolve, reject) => {
    const backendProcess = spawn('node', ['src/server.js'], { 
      cwd: path.join(process.cwd(), 'backend'),
      stdio: 'pipe',
      shell: true
    });
    
    backendProcess.stdout.on('data', (data) => {
      console.log(`${colors.yellow}[后端] ${data.toString().trim()}${colors.reset}`);
    });
    
    backendProcess.stderr.on('data', (data) => {
      console.error(`${colors.red}[后端错误] ${data.toString().trim()}${colors.reset}`);
    });
    
    // 等待后端准备就绪
    let startTimeout = setTimeout(() => {
      console.log(`${colors.yellow}[后端] 假设后端已准备就绪 (超时)${colors.reset}`);
      resolve(backendProcess);
    }, 8000);
    
    backendProcess.stdout.on('data', (data) => {
      if (data.toString().includes('服务器已启动') || data.toString().includes('Server running')) {
        clearTimeout(startTimeout);
        console.log(`${colors.green}[后端] 服务已启动✓${colors.reset}\n`);
        resolve(backendProcess);
      }
    });
    
    backendProcess.on('error', (err) => {
      clearTimeout(startTimeout);
      console.error(`${colors.red}[后端] 启动失败: ${err.message}${colors.reset}`);
      reject(err);
    });
  });
}

// 启动前端服务
async function startFrontend(type) {
  const dirName = type === 'im' ? 'IM前端' : 'AgiMa前端';
  console.log(`${colors.green}[4/4] 启动${dirName}服务...${colors.reset}`);
  
  const cwd = path.join(process.cwd(), `frontend/${type}`);
  
  return new Promise((resolve, reject) => {
    const frontendProcess = spawn('npm', ['run', 'dev'], { 
      cwd: cwd,
      stdio: 'pipe',
      shell: true
    });
    
    frontendProcess.stdout.on('data', (data) => {
      console.log(`${colors.cyan}[${dirName}] ${data.toString().trim()}${colors.reset}`);
    });
    
    frontendProcess.stderr.on('data', (data) => {
      console.error(`${colors.red}[${dirName}错误] ${data.toString().trim()}${colors.reset}`);
    });
    
    // 等待前端准备就绪
    let startTimeout = setTimeout(() => {
      console.log(`${colors.yellow}[${dirName}] 假设前端已准备就绪 (超时)${colors.reset}`);
      resolve(frontendProcess);
    }, 15000);
    
    frontendProcess.stdout.on('data', (data) => {
      if (data.toString().includes('ready in') || data.toString().includes('Local:')) {
        clearTimeout(startTimeout);
        console.log(`${colors.green}[${dirName}] 服务已启动✓${colors.reset}\n`);
        resolve(frontendProcess);
      }
    });
    
    frontendProcess.on('error', (err) => {
      clearTimeout(startTimeout);
      console.error(`${colors.red}[${dirName}] 启动失败: ${err.message}${colors.reset}`);
      reject(err);
    });
  });
}

// 主函数
async function main() {
  try {
    console.log(`${colors.bright}启动模式: ${startMode}${colors.reset}\n`);
    
    let dbProcess = null;
    let backendProcess = null;
    let imFrontendProcess = null;
    let agimaFrontendProcess = null;
    
    // 启动所选服务
    if (startMode === 'all' || startMode === 'database') {
      dbProcess = await startDatabase();
    }
    
    if (startMode === 'all' || startMode === 'backend') {
      backendProcess = await startBackend();
    }
    
    if (startMode === 'all' || startMode === 'im') {
      imFrontendProcess = await startFrontend('im');
    }
    
    if (startMode === 'all' || startMode === 'agima') {
      agimaFrontendProcess = await startFrontend('agima');
    }
    
    console.log(`\n${colors.bright}${colors.green}所有服务已启动！${colors.reset}`);
    
    if (imFrontendProcess) {
      console.log(`${colors.cyan}IM前端: http://localhost:3000${colors.reset}`);
    }
    
    if (agimaFrontendProcess) {
      console.log(`${colors.cyan}AgiMa前端: http://localhost:3100${colors.reset}`);
    }
    
    if (backendProcess) {
      console.log(`${colors.yellow}后端API: http://localhost:8065/api${colors.reset}`);
    }
    
    console.log(`\n${colors.bright}按 Ctrl+C 停止所有服务${colors.reset}`);
    
    // 处理进程退出
    process.on('SIGINT', async () => {
      console.log(`\n${colors.bright}正在停止所有服务...${colors.reset}`);
      
      const processes = [dbProcess, backendProcess, imFrontendProcess, agimaFrontendProcess].filter(p => p);
      
      for (const proc of processes) {
        if (proc) {
          proc.kill('SIGINT');
        }
      }
      
      // 给进程一点时间来清理
      setTimeout(() => {
        console.log(`${colors.bright}${colors.green}所有服务已停止✓${colors.reset}`);
        process.exit(0);
      }, 1000);
    });
    
  } catch (error) {
    console.error(`${colors.red}启动失败: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// 执行主函数
main();