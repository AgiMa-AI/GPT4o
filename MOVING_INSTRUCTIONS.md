# 文件移动指南

本文档说明如何将项目源码移动到目标目录 `C:\Users\Ll-Fr\Desktop\AgiMa-项目`，并保持四层架构。

## 目标路径结构

```
C:\Users\Ll-Fr\Desktop\AgiMa-项目\
├─ 前端\
│  ├─ IM\                   # 即时通讯前端模块
│  └─ AgiMa\                # 移动优化版前端模块
├─ 后端\                    # Mattermost API服务适配层
└─ 数据库\                  # 数据存储和管理模块
```

## 移动步骤

1. **创建目录结构**

   首先在桌面上创建主目录及其子目录：

   ```
   mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目"
   mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端"
   mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM"
   mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa"
   mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端"
   mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库"
   ```

2. **复制源文件**

   将以下文件复制到相应目录：

   **前端/IM (即时通讯):**
   - 将 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/components/ai` 复制到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\components\`
   - 将 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/frontend/im/package.json` 复制到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\`

   **前端/AgiMa (移动端):**
   - 将 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/MobileApp.tsx` 复制到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\`
   - 将 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/pages/mobile` 目录复制到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\pages\`
   - 将 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/services/mobileAdapter.ts` 复制到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\services\`
   - 将 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/frontend/agima/package.json` 复制到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\`

   **后端:**
   - 将 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/mattermost-backend/src/server.ts` 复制到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\`
   - 将 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/mattermost-backend/src/modules` 目录复制到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\`
   - 将 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/src/services/mattermostApiService.ts` 复制到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\services\`
   - 将 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/backend/package.json` 复制到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\`

   **数据库:**
   - 将 `tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50/database/package.json` 复制到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\`

   **文档和配置:**
   - 将项目文档复制到根目录: `C:\Users\Ll-Fr\Desktop\AgiMa-项目\README.md`

3. **安装依赖和修复类型错误**

   在各子目录中运行:

   ```bash
   npm install --save-dev @types/react @types/react-dom @types/react-router-dom @types/node @types/express
   npm install
   ```

## 项目启动

完成上述步骤后，可以通过以下方式启动项目:

1. **启动后端服务**
   ```
   cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端"
   npm run start
   ```

2. **启动移动端AgiMa前端**
   ```
   cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa"
   npm run dev
   ```

现在您可以通过浏览器访问移动版应用，并与Mattermost后端进行交互。