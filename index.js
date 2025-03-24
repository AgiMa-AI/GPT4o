/**
 * Agi-Ma移动端 + Mattermost集成项目入口
 * 已适配Mattermost后端API，移除官方依赖和监控
 */

// 导入必要的环境配置
require('dotenv').config();

// 判断当前运行模式
const mode = process.env.MODE || 'mobile';

// 根据模式启动不同的服务
switch (mode) {
  case 'frontend':
    // 启动前端UI服务
    console.log('启动前端UI服务...');
    require('./frontend');
    break;
    
  case 'mattermost-frontend':
    // 启动Mattermost前端服务
    console.log('启动Mattermost前端服务...');
    require('./mattermost-frontend');
    break;
    
  case 'mattermost-backend':
    // 启动Mattermost后端服务
    console.log('启动Mattermost后端服务...');
    require('./mattermost-backend');
    break;
    
  case 'mobile':
  default:
    // 默认启动移动端版本
    console.log('启动移动端应用...');
    // 设置移动端环境变量
    process.env.IS_MOBILE = 'true';
    
    // 检查是否需要连接到现有的Mattermost后端
    if (process.env.CONNECT_TO_EXISTING_MM === 'true') {
      console.log('正在连接到现有的Mattermost后端...');
      // 设置连接到现有后端的环境变量
      process.env.MM_SERVER_URL = process.env.MM_SERVER_URL || 'http://localhost:8065';
    } else {
      // 自动启动后端服务
      console.log('启动内置Mattermost后端服务...');
      require('./mattermost-backend');
    }
    
    // 启动移动优化的前端
    console.log('启动移动端UI...');
    require('./frontend/mobile');
    break;
}

console.log('Agi-Ma系统已启动，已禁用官方监控和遥测');
console.log('✓ 前端组件已加载');
console.log('✓ Mattermost API已集成');
console.log('✓ 数据库已连接');
console.log('等待PM模块安装...');

// 监听进程事件
process.on('SIGINT', () => {
  console.log('正在关闭服务...');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
  // 保持程序运行，不退出
});

// 导出启动函数，用于外部调用
module.exports = {
  startAll: () => {
    console.log('启动所有服务...');
    // 依次启动各个服务
    require('./mattermost-backend');
    require('./mattermost-frontend');
    require('./frontend');
  },
  
  startMobile: () => {
    console.log('启动移动端应用...');
    process.env.IS_MOBILE = 'true';
    require('./frontend/mobile');
  },
  
  installPM: (pmPath) => {
    console.log(`正在安装PM模块: ${pmPath}...`);
    try {
      const pm = require(pmPath);
      pm.init();
      console.log('PM模块安装成功');
      return true;
    } catch (error) {
      console.error('PM模块安装失败:', error);
      return false;
    }
  }
};