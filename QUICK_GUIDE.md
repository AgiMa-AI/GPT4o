# 源码快速复制指南

## 基本操作步骤

1. 首先在`C:\Users\Ll-Fr\Desktop\`创建`AgiMa-项目`文件夹
2. 在该文件夹中创建四个主要子文件夹：
   - `前端\IM`
   - `前端\AgiMa`
   - `后端`
   - `数据库`

## 文件移动摘要

### 前端/IM部分
- 复制所有非移动端相关的UI组件：
  ```
  src/components/ -> 前端\IM\src\components\
  ```
- 复制基础页面、hooks和服务：
  ```
  src/pages/ (除mobile/) -> 前端\IM\src\pages\
  src/hooks/ (基础hooks) -> 前端\IM\src\hooks\
  src/services/ (除mattermostApiService.ts和mobileAdapter.ts) -> 前端\IM\src\services\
  ```
- 复制基础配置文件：
  ```
  tsconfig.json, vite.config.ts, package.json -> 前端\IM\
  ```

### 前端/AgiMa部分
- 复制所有移动端相关组件和服务：
  ```
  src/pages/mobile/ -> 前端\AgiMa\src\pages\mobile\
  src/MobileApp.tsx -> 前端\AgiMa\src\MobileApp.tsx
  src/services/mobileAdapter.ts -> 前端\AgiMa\src\services\mobileAdapter.ts
  src/services/mattermostApiService.ts -> 前端\AgiMa\src\services\mattermostApiService.ts
  ```
- 复制移动端实例钩子：
  ```
  src/hooks/useInstances.tsx -> 前端\AgiMa\src\hooks\useInstances.tsx
  src/hooks/useInstanceData.tsx -> 前端\AgiMa\src\hooks\useInstanceData.tsx
  src/hooks/useInstanceFavorites.tsx -> 前端\AgiMa\src\hooks\useInstanceFavorites.tsx
  src/hooks/useInstanceRentals.tsx -> 前端\AgiMa\src\hooks\useInstanceRentals.tsx
  src/hooks/use-mobile.tsx -> 前端\AgiMa\src\hooks\use-mobile.tsx
  ```

### 后端部分
- 复制后端服务和PM模块：
  ```
  mattermost-backend/src/ -> 后端\src\
  mattermost-backend/src/modules/pmInterface.ts -> 后端\src\modules\pmInterface.ts
  ```
- 复制配置文件：
  ```
  mattermost-backend/package.json -> 后端\package.json
  .env -> 后端\.env
  ```

### 数据库部分
- 创建基本数据库结构：
  ```
  database/package.json -> 数据库\package.json
  ```
- 创建models和migrations文件夹

## 安装依赖和修复类型错误

在各个目录中执行以下命令：

```bash
# 前端/IM 和 前端/AgiMa
npm install
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# 后端
npm install
npm install --save-dev @types/node @types/express @types/cors @types/compression

# 数据库
npm install
npm install --save-dev sequelize sequelize-cli pg pg-hstore
```

## 启动项目

```bash
# 前端/IM
cd 前端\IM
npm run dev

# 前端/AgiMa
cd 前端\AgiMa
npm run dev

# 后端
cd 后端
npm run build
npm start
```

详细指南请参考 [SOURCE_CODE_MANUAL.md](./SOURCE_CODE_MANUAL.md)