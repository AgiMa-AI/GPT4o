@echo off
REM AgiMa项目源码归档脚本
REM 本脚本将自动将源码按四部分结构归档到C:\Users\Ll-Fr\Desktop\AgiMa-项目目录

echo ==========================================================
echo        AgiMa项目源码归档脚本
echo ==========================================================
echo 本脚本将自动将源码按照以下四部分结构归档:
echo  1. 前端/IM - 即时通讯前端模块
echo  2. 前端/AgiMa - 移动优化前端模块
echo  3. 后端 - API服务和业务逻辑
echo  4. 数据库 - 数据存储服务
echo.
echo 目标路径: C:\Users\Ll-Fr\Desktop\AgiMa-项目
echo ==========================================================
echo.

REM 创建主目录
if not exist "C:\Users\Ll-Fr\Desktop\AgiMa-项目" (
  echo 创建主目录...
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目"
)

REM 创建四个子目录
if not exist "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM" (
  echo 创建前端/IM目录...
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM"
)

if not exist "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa" (
  echo 创建前端/AgiMa目录...
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa"
)

if not exist "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端" (
  echo 创建后端目录...
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端"
)

if not exist "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库" (
  echo 创建数据库目录...
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库"
)

echo 所有目录创建完成!
echo.

REM 复制前端/IM文件
echo 复制前端/IM文件...
if exist "frontend\im\package.json" (
  xcopy "frontend\im\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\" /E /I /Y
) else (
  xcopy "src\components\ai\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\components\ai\" /E /I /Y
  xcopy "src\components\auth\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\components\auth\" /E /I /Y
  xcopy "src\components\ui\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\components\ui\" /E /I /Y
  xcopy "src\context\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\context\" /E /I /Y
  xcopy "src\hooks\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\hooks\" /E /I /Y
  xcopy "src\pages\auth\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\pages\auth\" /E /I /Y
  xcopy "src\types\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\types\" /E /I /Y
  xcopy "src\utils\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\utils\" /E /I /Y
  xcopy "src\lib\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\lib\" /E /I /Y
  xcopy "src\index.css" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\" /Y
  xcopy "src\main.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\src\" /Y
  xcopy "package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\" /Y
  xcopy "tsconfig.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\" /Y
  xcopy "vite.config.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\" /Y
)

REM 复制前端/AgiMa文件
echo 复制前端/AgiMa文件...
if exist "frontend\agima\package.json" (
  xcopy "frontend\agima\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\" /E /I /Y
) else (
  xcopy "src\MobileApp.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\" /Y
  xcopy "src\pages\mobile\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\pages\mobile\" /E /I /Y
  xcopy "src\services\mobileAdapter.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\services\" /Y
  xcopy "src\services\mattermostApiService.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\services\" /Y
  xcopy "src\components\ui\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\components\ui\" /E /I /Y
  xcopy "src\types\agi.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\types\" /Y
  xcopy "src\types\auth.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\types\" /Y
  xcopy "src\hooks\use-mobile.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\" /Y
  xcopy "src\hooks\useAuth.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\" /Y
  xcopy "src\hooks\useInstances.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\hooks\" /Y
  xcopy "src\data\instances.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\data\" /Y
  xcopy "src\lib\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\lib\" /E /I /Y
  xcopy "src\index.css" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\" /Y
  xcopy "src\main.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\src\" /Y
  xcopy "package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\" /Y
  xcopy "tsconfig.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\" /Y
  xcopy "vite.config.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\" /Y
)

REM 复制后端文件
echo 复制后端文件...
if exist "backend\package.json" (
  xcopy "backend\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\" /E /I /Y
) else (
  xcopy "mattermost-backend\src\server.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\" /Y
  xcopy "mattermost-backend\src\modules\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\modules\" /E /I /Y
  xcopy "mattermost-backend\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\" /Y
  xcopy ".env" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\" /Y
  
  REM 创建缺少的目录和文件
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes"
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\middleware"
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\utils"
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\db"
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\socket"
  
  REM 创建示例文件
  echo // 验证中间件 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\middleware\auth.js"
  echo // 错误处理中间件 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\middleware\errorHandler.js"
  echo // 防监控工具 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\utils\antiMonitoring.js"
  echo // 日志工具 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\utils\logger.js"
  echo // 数据库初始化 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\db\index.js"
  echo // Socket处理程序 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\socket\handlers.js"
  
  echo // 用户认证路由 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\auth.js"
  echo // 用户管理路由 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\users.js"
  echo // 频道管理路由 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\channels.js"
  echo // 消息管理路由 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\messages.js"
  echo // 团队管理路由 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\teams.js"
  echo // 管理员路由 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\admin.js"
  echo // 集成路由 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\routes\integrations.js"
)

REM 复制数据库文件
echo 复制数据库文件...
if exist "database\package.json" (
  xcopy "database\*.*" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\" /E /I /Y
) else (
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\src\models"
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\src\migrations"
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\src\seeders"
  mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\src\config"
  
  REM 复制数据库配置文件
  xcopy "database\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\" /Y
  
  REM 创建示例文件
  echo // 数据库配置 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\src\config\database.js"
  echo // 用户模型 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\src\models\User.js"
  echo // 实例模型 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\src\models\Instance.js"
  echo // 交易模型 > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\src\models\Transaction.js"
)

REM 复制脚本和文档
echo 复制脚本和文档...
xcopy "安装依赖.bat" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\" /Y
xcopy "启动服务.bat" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\" /Y
xcopy "最终文件结构指南.md" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\" /Y

echo.
echo ==========================================================
echo        归档完成!
echo ==========================================================
echo 所有文件已成功归档到:
echo C:\Users\Ll-Fr\Desktop\AgiMa-项目
echo.
echo 请按照以下步骤继续:
echo 1. 进入 C:\Users\Ll-Fr\Desktop\AgiMa-项目 目录
echo 2. 运行 安装依赖.bat 安装所需的依赖包
echo 3. 运行 启动服务.bat 启动所需的服务
echo.
echo 详情请参考 最终文件结构指南.md
echo ==========================================================

pause