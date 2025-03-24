# 代码保存位置说明

## 主要保存路径

所有代码文件应保存在以下目录：

**C:\Users\Ll-Fr\Desktop\AgiMa-项目**

## 文件夹结构

```
C:\Users\Ll-Fr\Desktop\AgiMa-项目\
├─ 前端\
│  ├─ IM\                   # 即时通讯前端模块
│  └─ AgiMa\                # 移动优化版前端模块
├─ 后端\                    # Mattermost API服务适配层
└─ 数据库\                  # 数据存储和管理模块
```

## 文件移动步骤

1. **创建基本目录结构**
   ```
   mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目"
   mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端"
   mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM"
   mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa"
   mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端"
   mkdir "C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库"
   ```

2. **移动前端/AgiMa文件**
   - 将 `src/MobileApp.tsx` → `前端\AgiMa\MobileApp.tsx`
   - 将 `src/pages/mobile/*` → `前端\AgiMa\pages\`
   - 将 `src/services/mobileAdapter.ts` → `前端\AgiMa\services\`
   - 将 `src/components/ui` → `前端\AgiMa\components\ui\`

3. **移动前端/IM文件**
   - 将 `src/components/ai` → `前端\IM\components\ai\`
   - 将 `src/components/auth` → `前端\IM\components\auth\`

4. **移动后端文件**
   - 将 `mattermost-backend/src/server.ts` → `后端\server.ts`
   - 将 `mattermost-backend/src/modules/` → `后端\modules\`
   - 将 `src/services/mattermostApiService.ts` → `后端\services\`

5. **移动数据库文件**
   - 将 `database/package.json` → `数据库\package.json`

6. **安装依赖**
   在每个子目录中执行：
   ```
   npm install
   npm install --save-dev @types/react @types/react-dom @types/react-router-dom @types/node @types/express
   ```

## 关键文件清单

### 前端/AgiMa (移动端)
- `MobileApp.tsx` - 移动应用入口
- `pages/MobileInstances.tsx` - 实例列表
- `pages/MobileDetails.tsx` - 实例详情
- `pages/MobileWallet.tsx` - 钱包
- `pages/MobileLogin.tsx` - 登录
- `services/mobileAdapter.ts` - 移动端API适配器

### 前端/IM (即时通讯)
- `components/ai/*.tsx` - AI聊天组件
- `components/auth/*.tsx` - 认证组件

### 后端
- `server.ts` - 服务器入口
- `modules/pmInterface.ts` - PM模块接口
- `services/mattermostApiService.ts` - Mattermost API服务

### 数据库
- `package.json` - 数据库模块配置

## 类型错误解决方案

当前环境中的TypeScript类型错误（找不到react、express等模块）是因为缺少类型声明包。在每个模块目录中运行以下命令即可解决：

```bash
npm install --save-dev @types/react @types/react-dom @types/react-router-dom @types/node @types/express