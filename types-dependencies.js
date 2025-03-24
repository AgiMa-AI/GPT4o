#!/usr/bin/env node

/**
 * TypeScript类型声明安装脚本
 * 用于解决项目中的类型错误问题
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
console.log(`${colors.bright}${colors.cyan}      TypeScript类型声明安装脚本                    ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}====================================================${colors.reset}\n`);

// 目录路径
const rootDir = process.cwd();
const frontendIMDir = path.join(rootDir, 'frontend/im');
const frontendAgimaDir = path.join(rootDir, 'frontend/agima');
const backendDir = path.join(rootDir, 'backend');
const databaseDir = path.join(rootDir, 'database');

// 前端类型声明包
const frontendTypes = [
  '@types/react',
  '@types/react-dom',
  '@types/react-router-dom',
  '@types/node'
];

// 后端类型声明包
const backendTypes = [
  '@types/express',
  '@types/cors',
  '@types/node',
  '@types/helmet',
  '@types/compression',
  '@types/body-parser',
  '@types/socket.io',
  '@types/morgan',
  '@types/express-rate-limit'
];

// 数据库类型声明包
const databaseTypes = [
  '@types/node',
  '@types/sqlite3',
  '@types/pg'
];

// 运行npm命令
function runNpmCommand(command, cwd) {
  console.log(`${colors.yellow}运行命令: ${command} ${colors.reset}在 ${colors.blue}${cwd}${colors.reset}`);
  try {
    execSync(command, { 
      cwd, 
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: '1' }
    });
    return true;
  } catch (error) {
    console.error(`${colors.red}命令执行失败: ${error.message}${colors.reset}`);
    return false;
  }
}

// 安装类型声明包
function installTypeDeclarations(directory, packages, dev = true) {
  if (!fs.existsSync(directory)) {
    console.log(`${colors.yellow}目录不存在，跳过: ${directory}${colors.reset}`);
    return false;
  }
  
  const flag = dev ? '--save-dev' : '--save';
  const command = `npm install ${flag} ${packages.join(' ')}`;
  
  return runNpmCommand(command, directory);
}

// 在项目各层安装类型声明
function installAllTypeDeclarations() {
  console.log(`${colors.bright}[1/4] 在IM前端安装类型声明...${colors.reset}`);
  const imSuccess = installTypeDeclarations(frontendIMDir, frontendTypes);
  console.log(imSuccess 
    ? `${colors.green}IM前端类型声明安装完成✓${colors.reset}\n` 
    : `${colors.red}IM前端类型声明安装失败×${colors.reset}\n`);
  
  console.log(`${colors.bright}[2/4] 在Agima移动前端安装类型声明...${colors.reset}`);
  const agimaSuccess = installTypeDeclarations(frontendAgimaDir, frontendTypes);
  console.log(agimaSuccess 
    ? `${colors.green}Agima移动前端类型声明安装完成✓${colors.reset}\n` 
    : `${colors.red}Agima移动前端类型声明安装失败×${colors.reset}\n`);
  
  console.log(`${colors.bright}[3/4] 在后端安装类型声明...${colors.reset}`);
  const backendSuccess = installTypeDeclarations(backendDir, backendTypes);
  console.log(backendSuccess 
    ? `${colors.green}后端类型声明安装完成✓${colors.reset}\n` 
    : `${colors.red}后端类型声明安装失败×${colors.reset}\n`);
  
  console.log(`${colors.bright}[4/4] 在数据库服务中安装类型声明...${colors.reset}`);
  const dbSuccess = installTypeDeclarations(databaseDir, databaseTypes);
  console.log(dbSuccess 
    ? `${colors.green}数据库类型声明安装完成✓${colors.reset}\n` 
    : `${colors.red}数据库类型声明安装失败×${colors.reset}\n`);
  
  return imSuccess && agimaSuccess && backendSuccess && dbSuccess;
}

// 创建tsconfig.json修复过的版本
function fixTsConfigs() {
  const directories = [frontendIMDir, frontendAgimaDir, backendDir, databaseDir];
  
  console.log(`${colors.bright}[额外步骤] 修复tsconfig.json文件...${colors.reset}`);
  
  for (const directory of directories) {
    const tsConfigPath = path.join(directory, 'tsconfig.json');
    
    if (fs.existsSync(tsConfigPath)) {
      try {
        const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
        
        // 确保包含类型声明
        if (!tsConfig.compilerOptions) {
          tsConfig.compilerOptions = {};
        }
        
        // 添加类型声明
        tsConfig.compilerOptions.types = [
          "node",
          ...(tsConfig.compilerOptions.types || [])
        ];
        
        // 更新JSX设置
        if (directory === frontendIMDir || directory === frontendAgimaDir) {
          tsConfig.compilerOptions.jsx = "react-jsx";
          tsConfig.compilerOptions.jsxImportSource = "react";
        }
        
        // 写入更新后的配置
        fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
        console.log(`${colors.green}已修复 ${tsConfigPath}${colors.reset}`);
      } catch (error) {
        console.error(`${colors.red}修复tsconfig.json失败: ${error.message}${colors.reset}`);
      }
    }
  }
  
  console.log(`${colors.green}tsconfig.json文件修复完成✓${colors.reset}\n`);
}

// 主函数
async function main() {
  try {
    const success = installAllTypeDeclarations();
    
    if (success) {
      fixTsConfigs();
      console.log(`\n${colors.bright}${colors.green}TypeScript类型声明安装成功！${colors.reset}`);
      console.log(`${colors.cyan}所有TypeScript类型错误现在应该已修复。${colors.reset}`);
    } else {
      console.log(`\n${colors.yellow}某些类型声明安装可能失败，请检查错误信息并手动安装。${colors.reset}`);
    }
    
    console.log(`\n${colors.bright}提示: ${colors.reset}`);
    console.log(`运行 ${colors.bright}node migrate.js${colors.reset} 重新组织项目文件结构`);
    console.log(`运行 ${colors.bright}node start.js${colors.reset} 启动项目服务`);
    
  } catch (error) {
    console.error(`${colors.red}类型声明安装失败: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// 执行主函数
main();