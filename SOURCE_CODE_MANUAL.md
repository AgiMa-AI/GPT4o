# 源码手动复制指南

本文档提供如何将源代码手动组织到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目` 文件夹中的详细指导。

## 准备工作

1. 创建目标目录结构：
   ```
   C:\Users\Ll-Fr\Desktop\AgiMa-项目\
   ├── 前端\
   │   ├── IM\
   │   │   ├── src\
   │   │   ├── public\
   │   └── AgiMa\
   │       ├── src\
   │       ├── public\
   ├── 后端\
   │   ├── src\
   │   ├── config\
   └── 数据库\
       ├── migrations\
       ├── models\
   ```

## 文件复制指南

### 一、前端/IM 部分

1. 从原项目复制以下文件：
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/components/` (除mobile相关) → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\components\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/pages/` (除mobile相关) → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\pages\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/hooks/` (除useInstanceData.tsx、useInstanceFavorites.tsx、useInstanceRentals.tsx) → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\hooks\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/context/` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\context\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/utils/` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\utils\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/types/` (除agi.ts) → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\types\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/services/` (除mattermostApiService.ts, mobileAdapter.ts) → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\services\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/lib/` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\lib\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/data/` (除instances.ts) → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\data\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/styles/` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\styles\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/App.tsx` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\App.tsx`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/main.tsx` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\main.tsx`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/vite-env.d.ts` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\vite-env.d.ts`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/index.css` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\index.css`

2. 复制配置文件：
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/frontend/package.json` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\package.json`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/tsconfig.json` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\tsconfig.json`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/vite.config.ts` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\vite.config.ts`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/index.html` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\index.html`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/postcss.config.js` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\postcss.config.js`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/tailwind.config.ts` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\tailwind.config.ts`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/eslint.config.js` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\eslint.config.js`

3. 复制静态资源：
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/public/` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\public\`

### 二、前端/AgiMa 部分

1. 复制移动端组件和服务：
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/pages/mobile/` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\pages\mobile\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/services/mobileAdapter.ts` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\services\mobileAdapter.ts`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/services/mattermostApiService.ts` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\services\mattermostApiService.ts`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/MobileApp.tsx` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\MobileApp.tsx`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/data/instances.ts` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\data\instances.ts`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/types/agi.ts` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\types\agi.ts`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/hooks/useInstanceData.tsx` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\useInstanceData.tsx`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/hooks/useInstanceFavorites.tsx` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\useInstanceFavorites.tsx`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/hooks/useInstanceRentals.tsx` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\useInstanceRentals.tsx`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/hooks/useInstances.tsx` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\useInstances.tsx`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/hooks/use-mobile.tsx` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\use-mobile.tsx`

2. 复制UI组件（移动端需要的）：
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/components/ui/` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\components\ui\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/components/layout/MobileLayoutReset.tsx` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\components\layout\MobileLayoutReset.tsx`

3. 复制配置文件和入口：
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/frontend/agima/package.json` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\package.json`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/tsconfig.json` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\tsconfig.json`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/vite.config.ts` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\vite.config.ts`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/index.html` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\index.html`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/postcss.config.js` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\postcss.config.js`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/tailwind.config.ts` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\tailwind.config.ts`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/eslint.config.js` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\eslint.config.js`

4. 复制样式和辅助文件：
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/styles/` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\styles\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/lib/utils.ts` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\lib\utils.ts`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/vite-env.d.ts` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\vite-env.d.ts`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/index.css` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\index.css`

5. 创建移动版入口文件：
   在 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\main.tsx` 中放入以下内容：
   ```tsx
   import React from 'react'
   import ReactDOM from 'react-dom/client'
   import './index.css'
   import MobileApp from './MobileApp'

   ReactDOM.createRoot(document.getElementById('root')!).render(
     <React.StrictMode>
       <MobileApp />
     </React.StrictMode>,
   )
   ```

6. 复制静态资源：
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/public/` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\public\`

### 三、后端部分

1. 复制后端源码：
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/mattermost-backend/src/` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/mattermost-backend/src/modules/pmInterface.ts` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\modules\pmInterface.ts`

2. 复制配置文件：
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/mattermost-backend/package.json` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\package.json`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/tsconfig.node.json` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\tsconfig.node.json`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/.env` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\.env`

3. 创建后端启动脚本：
   在 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\start.js` 中放入以下内容：
   ```js
   // 后端服务启动脚本
   console.log('正在启动后端服务...');
   require('./dist/server.js');
   ```

### 四、数据库部分

1. 复制数据库模型和迁移文件：
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/backend/package.json` → `C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\package.json`

2. 创建基本数据库架构：
   在 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\models\index.js` 中放入以下内容：
   ```js
   // 数据库模型入口
   const fs = require('fs');
   const path = require('path');
   const Sequelize = require('sequelize');
   
   const env = process.env.NODE_ENV || 'development';
   const config = require('../config/config.json')[env];
   
   const sequelize = new Sequelize(
     config.database, 
     config.username, 
     config.password, 
     config
   );
   
   const db = {};
   
   // 加载所有模型文件
   fs.readdirSync(__dirname)
     .filter(file => file !== 'index.js')
     .forEach(file => {
       const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
       db[model.name] = model;
     });
   
   // 设置模型关联
   Object.keys(db).forEach(modelName => {
     if (db[modelName].associate) {
       db[modelName].associate(db);
     }
   });
   
   db.sequelize = sequelize;
   db.Sequelize = Sequelize;
   
   module.exports = db;
   ```

3. 创建配置文件：
   在 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\config\config.json` 中放入以下内容：
   ```json
   {
     "development": {
       "username": "postgres",
       "password": "postgres",
       "database": "mattermost_dev",
       "host": "127.0.0.1",
       "dialect": "postgres",
       "logging": false
     },
     "test": {
       "username": "postgres",
       "password": "postgres",
       "database": "mattermost_test",
       "host": "127.0.0.1",
       "dialect": "postgres",
       "logging": false
     },
     "production": {
       "username": "postgres",
       "password": "postgres",
       "database": "mattermost_prod",
       "host": "127.0.0.1",
       "dialect": "postgres",
       "logging": false
     }
   }
   ```

## 安装依赖

在每个目录中分别执行以下命令安装依赖：

```bash
# 前端/IM
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM
npm install
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# 前端/AgiMa
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa
npm install
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# 后端
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端
npm install
npm install --save-dev @types/node @types/express @types/cors @types/compression

# 数据库
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库
npm install
npm install --save-dev @types/node sequelize sequelize-cli pg pg-hstore
```

## 运行项目

完成文件复制和依赖安装后，可以分别在各个目录中运行以下命令启动服务：

```bash
# 前端/IM
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM
npm run dev

# 前端/AgiMa
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa
npm run dev

# 后端
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端
npm run build
npm start

# 数据库
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库
npx sequelize-cli db:migrate
```

## 注意事项

1. TypeScript类型错误不影响实际功能，安装相应的类型声明包即可解决。
2. 如果在运行过程中遇到路径问题，请检查各个文件中的导入路径是否正确。
3. 确保数据库配置正确，并且PostgreSQL已经安装并运行。
4. PM模块的整合将在后端运行后通过pmInterface提供的API接口完成。