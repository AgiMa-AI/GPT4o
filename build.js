/**
 * Agi-Ma + Mattermost 集成项目编译脚本
 * 编译前端、Mattermost前端适配和后端服务
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置
const config = {
  mode: process.env.MODE || 'all', // all | frontend | mattermost-frontend | mattermost-backend
  installDeps: process.env.INSTALL_DEPS !== 'false',
  skipTests: process.env.SKIP_TESTS === 'true'
};

console.log('=== Agi-Ma + Mattermost 集成项目编译脚本 ===');
console.log(`运行模式: ${config.mode}`);
console.log(`安装依赖: ${config.installDeps ? '是' : '否'}`);
console.log(`跳过测试: ${config.skipTests ? '是' : '否'}`);
console.log('=======================================');

// 确保目录存在
const dirs = ['frontend', 'mattermost-frontend', 'mattermost-backend', 'dist'];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`创建目录: ${dir}`);
  }
});

// 安装TypeScript类型声明依赖
if (config.installDeps) {
  console.log('\n=== 安装TypeScript类型声明依赖 ===');
  try {
    console.log('正在安装React和相关类型定义...');
    execSync('npm install --save-dev @types/react @types/react-dom @types/react-router-dom @types/node', { stdio: 'inherit' });
  } catch (error) {
    console.error('安装TypeScript类型声明依赖失败:', error.message);
    process.exit(1);
  }
}

// 编译前端UI (A层)
if (config.mode === 'all' || config.mode === 'frontend') {
  console.log('\n=== 编译前端UI (A层) ===');
  try {
    process.chdir('./frontend');
    
    if (config.installDeps) {
      console.log('安装前端依赖...');
      execSync('npm install', { stdio: 'inherit' });
    }
    
    console.log('编译前端...');
    execSync('npm run build', { stdio: 'inherit' });
    
    if (!config.skipTests) {
      console.log('运行前端测试...');
      execSync('npm test', { stdio: 'inherit' });
    }
    
    console.log('前端编译完成!');
    process.chdir('..');
  } catch (error) {
    console.error('前端编译失败:', error.message);
    process.chdir('..');
    process.exit(1);
  }
}

// 编译Mattermost前端适配 (B层)
if (config.mode === 'all' || config.mode === 'mattermost-frontend') {
  console.log('\n=== 编译Mattermost前端适配 (B层) ===');
  try {
    process.chdir('./mattermost-frontend');
    
    if (config.installDeps) {
      console.log('安装Mattermost前端依赖...');
      execSync('npm install', { stdio: 'inherit' });
    }
    
    console.log('编译Mattermost前端适配...');
    execSync('npm run build', { stdio: 'inherit' });
    
    if (!config.skipTests) {
      console.log('运行Mattermost前端测试...');
      execSync('npm test', { stdio: 'inherit' });
    }
    
    console.log('Mattermost前端适配编译完成!');
    process.chdir('..');
  } catch (error) {
    console.error('Mattermost前端适配编译失败:', error.message);
    process.chdir('..');
    process.exit(1);
  }
}

// 编译后端 (C层)
if (config.mode === 'all' || config.mode === 'mattermost-backend') {
  console.log('\n=== 编译后端 (C层) ===');
  try {
    process.chdir('./mattermost-backend');
    
    if (config.installDeps) {
      console.log('安装后端依赖...');
      execSync('npm install express cors helmet compression body-parser socket.io morgan dotenv express-rate-limit', { stdio: 'inherit' });
      execSync('npm install --save-dev typescript ts-node @types/express @types/cors @types/helmet @types/compression @types/body-parser @types/socket.io @types/morgan', { stdio: 'inherit' });
    }
    
    console.log('编译后端...');
    execSync('npm run build', { stdio: 'inherit' });
    
    if (!config.skipTests) {
      console.log('运行后端测试...');
      execSync('npm test', { stdio: 'inherit' });
    }
    
    console.log('后端编译完成!');
    process.chdir('..');
  } catch (error) {
    console.error('后端编译失败:', error.message);
    process.chdir('..');
    process.exit(1);
  }
}

// 集成编译结果
console.log('\n=== 集成编译结果 ===');
try {
  console.log('创建dist目录...');
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist', { recursive: true });
  }
  
  if (config.mode === 'all' || config.mode === 'frontend') {
    console.log('复制前端编译结果...');
    execSync('cp -r ./frontend/dist/* ./dist/', { stdio: 'inherit' });
  }
  
  if (config.mode === 'all' || config.mode === 'mattermost-frontend') {
    console.log('集成Mattermost前端适配...');
    execSync('cp -r ./mattermost-frontend/dist/* ./dist/', { stdio: 'inherit' });
  }
  
  if (config.mode === 'all' || config.mode === 'mattermost-backend') {
    console.log('集成后端服务...');
    if (!fs.existsSync('./dist/server')) {
      fs.mkdirSync('./dist/server', { recursive: true });
    }
    execSync('cp -r ./mattermost-backend/dist/* ./dist/server/', { stdio: 'inherit' });
  }
  
  // 复制主入口文件和配置
  console.log('复制主入口文件和配置...');
  fs.copyFileSync('./index.js', './dist/index.js');
  
  // 创建package.json
  console.log('创建dist的package.json...');
  const packageJson = {
    name: "agi-ma-mattermost",
    version: "1.0.0",
    description: "Agi-Ma移动端 + Mattermost集成项目",
    main: "index.js",
    scripts: {
      start: "node index.js",
      "start:frontend": "MODE=frontend node index.js",
      "start:mattermost-frontend": "MODE=mattermost-frontend node index.js",
      "start:backend": "MODE=mattermost-backend node index.js"
    },
    dependencies: {
      express: "^4.18.2",
      cors: "^2.8.5",
      helmet: "^7.1.0",
      compression: "^1.7.4",
      "body-parser": "^1.20.2",
      "socket.io": "^4.7.2",
      morgan: "^1.10.0",
      dotenv: "^16.3.1",
      "express-rate-limit": "^7.1.5"
    }
  };
  
  fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2));
  
  // 创建运行说明
  console.log('创建运行说明...');
  fs.copyFileSync('./README.md', './dist/README.md');
  
  console.log('\n=== 编译完成! ===');
  console.log('编译结果位于 ./dist 目录');
  console.log('运行命令: cd dist && npm start');
  console.log('=======================================');
} catch (error) {
  console.error('集成编译结果失败:', error.message);
  process.exit(1);
}