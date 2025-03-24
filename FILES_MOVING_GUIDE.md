# 文件移动操作指南

本文档提供如何将源代码文件移动到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目` 文件夹的详细说明。

## 第一步：创建基本目录结构

在 `C:\Users\Ll-Fr\Desktop\AgiMa-项目` 中创建以下目录：

```
C:\Users\Ll-Fr\Desktop\AgiMa-项目\
├── 前端\
│   ├── IM\
│   └── AgiMa\
├── 后端\
└── 数据库\
```

## 第二步：复制前端/IM 文件

从当前项目中复制以下文件和目录到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\`：

1. **基本配置文件**
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/frontend/im/package.json` → `前端\IM\package.json`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/tsconfig.json` → `前端\IM\tsconfig.json`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/index.html` → `前端\IM\index.html`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/vite.config.ts` → `前端\IM\vite.config.ts`

2. **源代码文件**
   - 创建 `前端\IM\src\` 目录
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/main.tsx` → `前端\IM\src\main.tsx`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/App.tsx` → `前端\IM\src\App.tsx`(去除移动端相关代码)
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/index.css` → `前端\IM\src\index.css`
   - 复制 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/components/` 下的所有非移动端组件到 `前端\IM\src\components\`

3. **公共资源文件**
   - 创建 `前端\IM\public\` 目录
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/public/` 下的所有文件复制到 `前端\IM\public\`

4. **工具、钩子和服务**
   - 复制 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/hooks/` 到 `前端\IM\src\hooks\`(排除移动端相关的钩子)
   - 复制 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/services/` 到 `前端\IM\src\services\`(排除mattermostApiService.ts和mobileAdapter.ts)
   - 复制 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/utils/` 和 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/lib/` 到 `前端\IM\src\utils\` 和 `前端\IM\src\lib\`
   - 复制 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/types/` 到 `前端\IM\src\types\`
   - 复制 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/context/` 到 `前端\IM\src\context\`

## 第三步：复制前端/AgiMa 文件

从当前项目中复制以下文件和目录到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\`：

1. **基本配置文件**
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/frontend/agima/package.json` → `前端\AgiMa\package.json`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/tsconfig.json` → `前端\AgiMa\tsconfig.json`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/index.html` → `前端\AgiMa\index.html`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/vite.config.ts` → `前端\AgiMa\vite.config.ts`

2. **源代码文件**
   - 创建 `前端\AgiMa\src\` 目录
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/MobileApp.tsx` → `前端\AgiMa\src\App.tsx`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/index.css` → `前端\AgiMa\src\index.css`
   - 创建 `前端\AgiMa\src\main.tsx` (修改为导入MobileApp)
   
3. **移动端页面和组件**
   - 创建 `前端\AgiMa\src\pages\` 目录
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/pages/mobile/` 下的所有文件复制到 `前端\AgiMa\src\pages\`
   - 重命名：从MobileXXX.tsx到XXX.tsx (例如MobileInstances.tsx → Instances.tsx)
   - 复制 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/components/ui/` 到 `前端\AgiMa\src\components\ui\`
   
4. **Mattermost API适配层**
   - 创建 `前端\AgiMa\src\services\` 目录
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/services/mattermostApiService.ts` → `前端\AgiMa\src\services\mattermostApiService.ts`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/services/mobileAdapter.ts` → `前端\AgiMa\src\services\mobileAdapter.ts`
   
5. **类型定义和工具**
   - 复制 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/types/` 到 `前端\AgiMa\src\types\`
   - 复制 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/lib/` 到 `前端\AgiMa\src\lib\`
   - 创建 `前端\AgiMa\src\hooks\` 目录
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/hooks/use-mobile.tsx` → `前端\AgiMa\src\hooks\use-mobile.tsx`
   - 根据需要复制其他钩子文件

6. **公共资源文件**
   - 创建 `前端\AgiMa\public\` 目录
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/public/` 下的所有文件复制到 `前端\AgiMa\public\`

## 第四步：复制后端文件

从当前项目中复制以下文件和目录到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\`：

1. **基本配置文件**
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/backend/package.json` → `后端\package.json`
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/mattermost-backend/package.json` → `后端\package.json`（合并依赖）
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/.env` → `后端\.env`
   
2. **源代码文件**
   - 创建 `后端\src\` 目录
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/mattermost-backend/src/server.ts` → `后端\src\server.ts`
   - 创建以下子目录：
     - `后端\src\routes\`
     - `后端\src\controllers\`
     - `后端\src\middleware\`
     - `后端\src\utils\`
     - `后端\src\models\`
   
3. **PM模块系统**
   - 创建 `后端\src\modules\` 目录
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/mattermost-backend/src/modules/pmInterface.ts` → `后端\src\modules\pmInterface.ts`

## 第五步：复制数据库文件

从当前项目中复制以下文件和目录到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\`：

1. **基本配置文件**
   - `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/database/package.json` → `数据库\package.json`
   - 创建 `数据库\config.json` 配置文件

2. **数据库模型和脚本**
   - 创建以下子目录：
     - `数据库\migrations\`
     - `数据库\seeds\`
     - `数据库\models\`
     - `数据库\schema\`

## 安装依赖

安装TypeScript类型声明包以解决类型错误:

```bash
# 前端/IM 和 前端/AgiMa 目录中执行
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# 后端目录中执行
npm install --save-dev @types/node @types/express @types/cors @types/helmet @types/compression @types/body-parser @types/socket.io @types/morgan
```

完成上述步骤后，项目结构将清晰地分为四个主要部分，每个部分都有独立的功能和责任，可以更有效地开发和维护。

## 类型错误解决

当前代码中出现的类型错误主要是由于缺少类型声明包导致的。具体来说：

1. React相关错误:
   - `找不到模块"react"或其相应的类型声明`
   - `找不到命名空间"React"`
   - `此 JSX 标记要求模块路径 'react/jsx-runtime' 存在`
   
   解决方案: `npm install --save-dev @types/react @types/react-dom`

2. React Router相关错误:
   - `找不到模块"react-router-dom"或其相应的类型声明`
   
   解决方案: `npm install --save-dev @types/react-router-dom`

3. 后端相关错误:
   - Express, Cors, Socket.io等模块类型声明缺失
   - Node.js内置对象(如process)的类型声明缺失
   
   解决方案: `npm install --save-dev @types/node @types/express @types/cors @types/socket.io` 等