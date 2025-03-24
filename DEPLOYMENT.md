# AgiMa + Mattermost 部署指南

本文档提供如何将项目源码打包和部署到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目` 目录的详细步骤。

## 目录结构

项目被组织为四个主要部分：

```
C:\Users\Ll-Fr\Desktop\AgiMa-项目\
├── 前端\
│   ├── IM\         # 即时通讯前端
│   └── AgiMa\      # 移动端优化版本
├── 后端\           # API服务和业务逻辑
└── 数据库\         # 数据存储和模型
```

## 部署步骤

### 1. 创建基础目录结构

```
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库"
```

### 2. 部署前端/IM部分

复制以下文件到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\` 目录：

```
# 配置文件
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\frontend\im\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\tsconfig.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\vite.config.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\index.html" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\"

# 创建源码目录
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\components"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\hooks"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\pages"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\types"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\services"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\utils"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\context"

# 复制主要源码文件 (排除移动端特定文件)
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\components" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\components\" /E /I /exclude:mobile
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\pages" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\pages\" /E /I /exclude:mobile
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\types" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\types\" /E /I
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\services" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\services\" /E /I /exclude:mobileAdapter.ts
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\context" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\context\" /E /I
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\utils" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\utils\" /E /I

# 复制App.tsx和主入口文件
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\App.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\main.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\index.css" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\vite-env.d.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\"
```

### 3. 部署前端/AgiMa部分

复制以下文件到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\` 目录：

```
# 配置文件
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\frontend\agima\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\tsconfig.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\vite.config.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\index.html" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\"

# 创建源码目录
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\components"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\components\ui"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\pages"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\pages\mobile"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\types"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\services"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\context"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\data"

# 复制移动端特定文件
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\MobileApp.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\"
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\pages\mobile" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\pages\mobile\" /E /I
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\services\mobileAdapter.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\services\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\services\mattermostApiService.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\services\"

# 复制必要的UI组件
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\components\ui" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\components\ui\" /E /I

# 复制hooks和数据
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\hooks\use-mobile.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\hooks\useInstances.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\hooks\useInstanceData.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\hooks\useInstanceFavorites.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\hooks\useInstanceRentals.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\hooks\useAuth.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\"

# 复制类型和上下文
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\types\agi.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\types\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\types\auth.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\types\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\context\AuthContext.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\context\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\providers\AuthProvider.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\providers\"

# 复制数据文件
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\data\instances.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\data\"

# 复制入口文件
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\main.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\index.css" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\vite-env.d.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\"
```

### 4. 部署后端部分

复制以下文件到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\` 目录：

```
# 配置文件
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\backend\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\.env" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\"

# 创建源码目录
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\middleware"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\utils"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\socket"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\modules"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\public"

# 复制服务器入口和模块
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\mattermost-backend\src\server.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\"
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\mattermost-backend\src\modules\pmInterface.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\modules\"

# 创建必要的空文件
echo // Auth routes > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\auth.js"
echo // Users routes > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\users.js"
echo // Channels routes > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\channels.js"
echo // Messages routes > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\messages.js"
echo // Teams routes > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\teams.js"
echo // Admin routes > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\admin.js"
echo // Integrations routes > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\integrations.js"

echo // Auth middleware > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\middleware\auth.js"
echo // Error handler > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\middleware\errorHandler.js"

echo // Socket handlers > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\socket\handlers.js"

echo // Anti-monitoring utils > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\utils\antiMonitoring.js"
echo // Logger > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\utils\logger.js"

mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\db"
echo // Database init > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\db\index.js"
```

### 5. 部署数据库部分

复制以下文件到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\` 目录：

```
# 配置文件
copy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\database\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\"

# 创建源码目录
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\migrations"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\models"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\seeders"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\config"

# 创建配置文件
echo // Database config > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\config\config.js"
echo // Sequelize config > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\.sequelizerc"
```

## 解决TypeScript类型错误

以上配置完成后，需要安装相关类型声明包来解决TypeScript错误：

### 前端/IM和前端/AgiMa

在这两个目录中分别执行：

```bash
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM"
npm install
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa"
npm install
npm install --save-dev @types/react @types/react-dom @types/react-router-dom
```

### 后端

```bash
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端"
npm install
npm install --save-dev @types/node @types/express @types/cors @types/compression @types/body-parser @types/morgan @types/helmet @types/socket.io
```

### 数据库

```bash
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库"
npm install
npm install --save-dev sequelize sequelize-cli pg pg-hstore
```

## 启动项目

### 前端/IM

```bash
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM"
npm run dev
```

### 前端/AgiMa

```bash
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa"
npm run dev
```

### 后端

```bash
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端"
npm run build
npm start
```

### 数据库

数据库部分通常不需要单独启动，它会被后端服务引用和管理。

## 注意事项

1. 所有TypeScript错误都是由于缺少类型声明包导致的，安装上述包后应该能解决
2. 修改配置文件中的路径引用，确保它们指向正确的位置
3. 在启动应用前，确保已正确安装所有依赖
4. 后端服务需要先于前端启动，以确保API服务可用