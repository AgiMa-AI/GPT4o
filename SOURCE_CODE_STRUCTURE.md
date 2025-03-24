# AgiMa项目源码结构

以下是项目源码在"C:\Users\Ll-Fr\Desktop\AgiMa-项目"文件夹中的组织结构:

## 源码目录结构

```
C:\Users\Ll-Fr\Desktop\AgiMa-项目\
├── 前端\
│   ├── IM\                    # 即时通讯前端
│   │   ├── src\               # IM源代码
│   │   ├── public\            # 静态资源
│   │   ├── package.json       # 依赖配置
│   │   └── tsconfig.json      # TypeScript配置
│   │
│   └── AgiMa\                 # AgiMa移动端
│       ├── src\               # 移动端源代码
│       │   ├── components\    # UI组件
│       │   ├── pages\         # 页面组件
│       │   ├── hooks\         # React Hooks
│       │   ├── services\      # API服务
│       │   └── types\         # TypeScript类型
│       ├── public\            # 静态资源
│       ├── package.json       # 依赖配置
│       └── tsconfig.json      # TypeScript配置
│
├── 后端\                      # Mattermost后端适配
│   ├── src\                   # 后端源代码
│   │   ├── api\               # API路由
│   │   ├── controllers\       # 控制器
│   │   ├── middleware\        # 中间件
│   │   ├── models\            # 数据模型
│   │   ├── utils\             # 工具函数
│   │   └── modules\           # PM模块系统
│   ├── package.json           # 依赖配置
│   └── tsconfig.json          # TypeScript配置
│
└── 数据库\                    # 数据库服务
    ├── migrations\            # 数据库迁移
    ├── seeds\                 # 种子数据
    ├── models\                # 数据模型
    ├── schema\                # 数据库架构
    ├── package.json           # 依赖配置
    └── config.json            # 数据库配置
```

## 源码文件整理

### 前端/IM

从原项目中复制以下文件到"C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM\":

1. `src/components/` 下的所有文件（排除mobile相关）
2. 复制 `index.html` 和基础配置文件
3. 将前端所需的静态资源复制到 `public/` 目录

### 前端/AgiMa

从原项目中复制以下文件到"C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa\":

1. `src/pages/mobile/` 下的所有组件文件
2. `src/services/mobileAdapter.ts` 和 `src/services/mattermostApiService.ts`
3. `src/MobileApp.tsx` 作为应用入口
4. 所有移动端相关的钩子和工具函数
5. 相关的TypeScript类型定义文件

### 后端

从原项目中复制以下文件到"C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端\":

1. `mattermost-backend/src/` 下的所有文件
2. 后端配置文件和依赖项配置
3. PM模块系统相关文件

### 数据库

从原项目中复制以下文件到"C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库\":

1. 数据库模型和迁移文件
2. 数据库配置和种子数据
3. 查询和数据访问层代码

## 安装依赖

在每个目录中运行以下命令安装依赖和类型声明包:

```bash
# 在每个子目录中安装依赖
npm install

# 安装类型声明包解决TypeScript错误
npm install --save-dev @types/react @types/react-dom @types/react-router-dom @types/node @types/express
```

## 源码中的错误修复

目前代码中显示的TypeScript类型错误主要是因为缺少类型声明包，安装上述依赖后即可解决。这些错误不会影响实际功能，只是TypeScript类型检查的警告。