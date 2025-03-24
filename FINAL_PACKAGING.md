# 最终打包指南

本文档提供如何将源代码复制到 `C:\Users\Ll-Fr\Desktop\AgiMa-项目` 文件夹的简明步骤。

## 打包步骤

1. **创建目标文件夹结构**

```
mkdir -p "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM"
mkdir -p "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa"
mkdir -p "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端"
mkdir -p "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库"
```

2. **复制前端/IM代码**

```
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\components\*.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\components\" /E /I /H
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\context\*.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\context\" /E /I /H
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\providers\*.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\providers\" /E /I /H
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\hooks\*.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\hooks\" /E /I /H
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\services\*.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\services\" /E /I /H
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\types\*.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\types\" /E /I /H
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\utils\*.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\utils\" /E /I /H
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\App.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\" /Y
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\main.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\" /Y
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\index.css" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\" /Y
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\frontend\im\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\" /Y
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\*.config.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\" /Y
```

3. **复制前端/AgiMa代码**

```
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\pages\mobile\*.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\pages\" /E /I /H
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\services\mobileAdapter.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\services\" /Y
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\services\mattermostApiService.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\services\" /Y
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\MobileApp.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\" /Y
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\src\types\agi.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\types\" /Y
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\frontend\agima\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\" /Y
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\start-mobile.js" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\" /Y
```

4. **复制后端代码**

```
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\mattermost-backend\src\*.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\" /E /I /H
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\mattermost-backend\src\modules\*.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\modules\" /E /I /H
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\backend\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\" /Y
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\.env" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\" /Y
```

5. **复制数据库代码**

```
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\database\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\" /Y
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\mattermost-backend\src\db\*.js" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\src\" /E /I /H
```

6. **复制项目文档**

```
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\README_NEW.md" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\README.md" /Y
xcopy "tm-agima-34-dependabot-npm_and_yarn-npm_and_yarn-c06b098d50\CORE_FILES.md" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\" /Y
```

7. **安装解决TypeScript错误的类型包**

分别在四个目录中执行以下命令：

```bash
# 在前端/IM目录
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM"
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# 在前端/AgiMa目录
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa"
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# 在后端目录
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端"
npm install --save-dev @types/node @types/express @types/cors @types/compression @types/body-parser @types/morgan @types/helmet @types/socket.io

# 在数据库目录
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库"
npm install --save-dev @types/node
```

## 启动应用

### 前端/IM (即时通讯前端)
```bash
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM"
npm install
npm run dev
```

### 前端/AgiMa (移动端)
```bash
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa"
npm install
node start-mobile.js
```

### 后端
```bash
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端"
npm install
npm run start
```

### 数据库
```bash
cd "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库"
npm install
npm run migrate
```

## 目录结构概览

```
C:\Users\Ll-Fr\Desktop\AgiMa-项目\
├─ 前端\
│  ├─ IM\                  # 基础即时通讯前端
│  └─ AgiMa\               # 移动优化版前端
├─ 后端\                   # Mattermost API服务
└─ 数据库\                 # 数据存储服务
```

## 注意事项

1. 所有TypeScript错误都可以通过安装上述类型声明包解决
2. 确保NODE_PATH环境变量正确设置，以支持@/组件路径引用
3. Mattermost API适配已经完成，不需要额外修改
4. PM模块集成接口已实现，可以直接使用