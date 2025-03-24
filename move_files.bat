@echo off
REM AgiMa项目文件移动脚本
REM 本脚本将自动创建目录结构并复制文件到C:\Users\Ll-Fr\Desktop\AgiMa-项目

echo 正在创建目录结构...
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库"

echo 创建子目录...
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\components"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\pages"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\services"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\services"
mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\modules"

echo 复制前端/IM文件...
xcopy /E /I "%~dp0src\components\ai" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\components\ai"
copy "%~dp0frontend\im\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\"

echo 复制前端/AgiMa文件...
copy "%~dp0src\MobileApp.tsx" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\"
xcopy /E /I "%~dp0src\pages\mobile" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\pages\mobile"
copy "%~dp0src\services\mobileAdapter.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\services\"
copy "%~dp0frontend\agima\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\"

echo 复制后端文件...
copy "%~dp0mattermost-backend\src\server.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\"
xcopy /E /I "%~dp0mattermost-backend\src\modules" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\modules"
copy "%~dp0src\services\mattermostApiService.ts" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\src\services\"
copy "%~dp0backend\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\"

echo 复制数据库文件...
copy "%~dp0database\package.json" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\"

echo 复制说明文档...
copy "%~dp0README.md" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\"
copy "%~dp0PROJECT_COMPLETE.md" "C:\Users\Ll-Fr\Desktop\AgiMa-项目\说明文档.md"

echo 创建类型声明安装脚本...
(
echo @echo off
echo REM 安装类型声明包
echo echo 正在安装前端/IM类型声明包...
echo cd "前端\IM"
echo npm install --save-dev @types/react @types/react-dom @types/react-router-dom
echo npm install
echo.
echo echo 正在安装前端/AgiMa类型声明包...
echo cd ..\AgiMa
echo npm install --save-dev @types/react @types/react-dom @types/react-router-dom
echo npm install
echo.
echo echo 正在安装后端类型声明包...
echo cd ..\..\后端
echo npm install --save-dev @types/node @types/express @types/socket.io @types/cors
echo npm install
echo.
echo echo 正在安装数据库类型声明包...
echo cd ..\数据库
echo npm install --save-dev @types/node
echo npm install
echo.
echo echo 所有依赖安装完成!
echo pause
) > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\安装依赖.bat"

echo 创建启动脚本...
(
echo @echo off
echo REM 启动AgiMa后端和前端
echo echo 启动后端服务...
echo start cmd /k "cd 后端 && npm run start"
echo.
echo echo 启动前端/AgiMa...
echo start cmd /k "cd 前端\AgiMa && npm run dev"
echo.
echo echo 服务已启动!
) > "C:\Users\Ll-Fr\Desktop\AgiMa-项目\启动服务.bat"

echo.
echo 文件移动完成! 所有文件已复制到: C:\Users\Ll-Fr\Desktop\AgiMa-项目
echo.
echo 后续步骤:
echo 1. 运行 C:\Users\Ll-Fr\Desktop\AgiMa-项目\安装依赖.bat 安装所需依赖
echo 2. 运行 C:\Users\Ll-Fr\Desktop\AgiMa-项目\启动服务.bat 启动应用
echo.
pause