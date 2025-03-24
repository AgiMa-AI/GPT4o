/**
 * 移动端开发服务器启动脚本
 * 用于整合前端UI、Mattermost前端适配层和后端服务
 */

const { exec, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 运行模式 (all | frontend | mattermost-frontend | mattermost-backend)
const RUN_MODE = process.env.RUN_MODE || 'all';

// 安装必要依赖
const installDependencies = async () => {
  console.log('正在安装必要依赖...');
  
  // 安装类型声明包，修复TS类型错误
  const typeDeps = [
    '@types/react',
    '@types/react-dom',
    '@types/react-router-dom',
    '@types/node',
    '@types/express'
  ];
  
  await executeCommand(`npm install --save-dev ${typeDeps.join(' ')}`);
  console.log('已安装类型声明依赖');
};

// 启动前端服务
const startFrontend = async () => {
  console.log('启动前端UI服务 (A)...');
  const frontendProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'frontend'),
    env: { ...process.env, PORT: 3000 },
    stdio: 'inherit'
  });
  
  frontendProcess.on('error', (error) => {
    console.error('前端启动错误:', error);
  });
  
  return frontendProcess;
};

// 启动Mattermost前端适配层
const startMattermostFrontend = async () => {
  console.log('启动Mattermost前端适配层 (B)...');
  const mattermostFrontendProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'mattermost-frontend'),
    env: { ...process.env, PORT: 3001 },
    stdio: 'inherit'
  });
  
  mattermostFrontendProcess.on('error', (error) => {
    console.error('Mattermost前端适配层启动错误:', error);
  });
  
  return mattermostFrontendProcess;
};

// 启动后端服务
const startBackend = async () => {
  console.log('启动Mattermost后端服务 (C)...');
  const backendProcess = spawn('node', ['src/server.js'], {
    cwd: path.join(__dirname, 'mattermost-backend'),
    env: { ...process.env, PORT: 8065 },
    stdio: 'inherit'
  });
  
  backendProcess.on('error', (error) => {
    console.error('后端启动错误:', error);
  });
  
  return backendProcess;
};

// 移除官方监控和遥测
const disableOfficialMonitoring = async () => {
  console.log('禁用官方监控和遥测...');
  
  // 检查并创建反监控文件
  const antiMonitoringFile = path.join(__dirname, 'mattermost-backend/src/utils/antiMonitoring.js');
  
  if (!fs.existsSync(antiMonitoringFile)) {
    fs.writeFileSync(antiMonitoringFile, `
/**
 * 反监控和遥测模块
 * 阻止官方监控和数据收集
 */

exports.setupAntiMonitoring = (app) => {
  // 阻止遥测请求
  app.use((req, res, next) => {
    const blockedEndpoints = [
      '/api/v4/telemetry',
      '/api/v4/analytics', 
      '/api/v4/usage',
      '/api/v4/tracking'
    ];
    
    if (blockedEndpoints.some(endpoint => req.path.includes(endpoint))) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    // 阻止包含遥测相关参数的请求
    const telemetryParams = ['tracking_id', 'analytics', 'telemetry'];
    if (req.query && Object.keys(req.query).some(key => 
      telemetryParams.includes(key.toLowerCase()))) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    next();
  });
  
  console.log('已启用反监控机制，阻止所有遥测和监控请求');
};
    `);
    console.log('已创建反监控模块');
  } else {
    console.log('反监控模块已存在');
  }
};

// 加载PM模块（如果提供）
const loadPMModules = async () => {
  const pmModulesDir = process.env.PM_MODULES_DIR;
  
  if (!pmModulesDir) {
    console.log('未指定PM模块目录，跳过加载');
    return;
  }
  
  if (!fs.existsSync(pmModulesDir)) {
    console.log(`PM模块目录 ${pmModulesDir} 不存在，跳过加载`);
    return;
  }
  
  console.log(`正在从 ${pmModulesDir} 加载PM模块...`);
  
  // 这里可以添加PM模块加载逻辑
  // 目前使用pmInterface中的loadPMModulesFromDirectory函数
};

// 执行命令
const executeCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        console.error(`命令执行错误: ${error}`);
        reject(error);
        return;
      }
      
      if (stderr) {
        console.warn(`命令警告: ${stderr}`);
      }
      
      if (stdout) {
        console.log(stdout);
      }
      
      resolve();
    });
  });
};

// 主函数
const main = async () => {
  try {
    // 确保目录结构存在
    if (!fs.existsSync(path.join(__dirname, 'frontend'))) {
      fs.mkdirSync(path.join(__dirname, 'frontend'), { recursive: true });
    }
    if (!fs.existsSync(path.join(__dirname, 'mattermost-frontend'))) {
      fs.mkdirSync(path.join(__dirname, 'mattermost-frontend'), { recursive: true });
    }
    if (!fs.existsSync(path.join(__dirname, 'mattermost-backend'))) {
      fs.mkdirSync(path.join(__dirname, 'mattermost-backend'), { recursive: true });
    }
    
    // 安装依赖
    await installDependencies();
    
    // 禁用官方监控
    await disableOfficialMonitoring();
    
    // 加载PM模块
    await loadPMModules();
    
    // 根据运行模式启动服务
    const processes = [];
    
    if (RUN_MODE === 'all' || RUN_MODE === 'frontend') {
      processes.push(await startFrontend());
    }
    
    if (RUN_MODE === 'all' || RUN_MODE === 'mattermost-frontend') {
      processes.push(await startMattermostFrontend());
    }
    
    if (RUN_MODE === 'all' || RUN_MODE === 'mattermost-backend') {
      processes.push(await startBackend());
    }
    
    console.log(`服务已启动，运行模式: ${RUN_MODE}`);
    console.log('前端UI (A): http://localhost:3000');
    console.log('Mattermost前端 (B): http://localhost:3001');
    console.log('Mattermost后端 (C): http://localhost:8065');
    
    // 优雅退出
    const handleExit = () => {
      console.log('\n正在关闭服务...');
      processes.forEach(process => {
        if (!process.killed) {
          process.kill();
        }
      });
      
      process.exit(0);
    };
    
    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);
    
  } catch (error) {
    console.error('启动失败:', error);
    process.exit(1);
  }
};

// 启动服务
main();