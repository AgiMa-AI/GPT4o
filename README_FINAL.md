# AgiMa项目 + Mattermost集成

本项目将AgiMa前端与Mattermost后端进行集成，已移动端优化为主，并移除了官方监控和依赖。项目按照清晰的四部分结构组织，便于开发和维护。

## 项目结构

文件夹位置：`C:\Users\Ll-Fr\Desktop\AgiMa-项目`

### 1. 前端/IM
即时通讯前端模块，包含基础UI组件和页面。

```
前端/IM/
├── node_modules/          # 依赖包
├── public/                # 静态资源
├── src/                   # 源代码
│   ├── components/        # 非移动端UI组件
│   ├── context/           # 上下文提供者
│   ├── hooks/             # 基础钩子函数
│   ├── pages/             # 非移动页面
│   ├── services/          # 基础服务
│   ├── styles/            # 样式文件
│   ├── types/             # 类型定义
│   └── utils/             # 工具函数
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript配置
└── vite.config.ts         # Vite构建配置
```

### 2. 前端/AgiMa
移动端优化的前端模块，与Mattermost后端API交互。

```
前端/AgiMa/
├── node_modules/          # 依赖包
├── public/                # 静态资源
├── src/                   # 源代码
│   ├── MobileApp.tsx      # 移动应用入口
│   ├── components/        # 移动端组件
│   ├── hooks/             # 移动端钩子
│   ├── pages/             # 移动端页面
│   │   └── mobile/        # 移动端页面组件
│   ├── services/          # 移动端服务
│   │   ├── mattermostApiService.ts  # Mattermost API服务
│   │   └── mobileAdapter.ts         # 移动端适配器
│   └── types/             # 类型定义
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript配置
└── vite.config.ts         # Vite构建配置
```

### 3. 后端
后端服务，与Mattermost API集成，处理数据交互。

```
后端/
├── node_modules/          # 依赖包
├── public/                # 静态资源
├── src/                   # 源代码
│   ├── db/                # 数据库连接
│   ├── middleware/        # 中间件
│   ├── modules/           # PM模块系统
│   │   └── pmInterface.ts # PM模块接口
│   ├── routes/            # API路由
│   ├── socket/            # WebSocket处理
│   ├── utils/             # 工具函数
│   │   └── antiMonitoring.js # 反监控工具
│   └── server.ts          # 服务器入口
├── .env                   # 环境变量
└── package.json           # 项目配置
```

### 4. 数据库
数据库服务，存储用户和实例数据。

```
数据库/
├── migrations/            # 数据库迁移
├── models/                # 数据模型
├── seeds/                 # 种子数据
└── package.json           # 项目配置
```

## 安装指南

### 1. 安装依赖

在每个目录中分别执行：

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
npm install --save-dev @types/node @types/express @types/cors @types/compression @types/helmet @types/body-parser @types/morgan @types/socket.io

# 数据库
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库
npm install
npm install --save-dev sequelize sequelize-cli
```

### 2. 配置环境变量

在`后端/.env`文件中设置：

```
PORT=8065
NODE_ENV=development
CORS_ORIGIN=*
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=agima
JWT_SECRET=your_jwt_secret_key
MATTERMOST_API_URL=http://localhost:8065/api/v4
```

## 运行项目

### 前端开发

```bash
# 前端/IM
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\IM
npm run dev

# 前端/AgiMa
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\前端\AgiMa
npm run dev
```

### 后端服务

```bash
# 后端
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\后端
npm run build
npm run start
```

### 数据库服务

```bash
# 数据库迁移
cd C:\Users\Ll-Fr\Desktop\AgiMa-项目\数据库
npx sequelize-cli db:migrate
```

## 关键功能和特性

1. **移动端优化**：为移动设备提供了专门的UI和交互体验
2. **Mattermost集成**：通过mattermostApiService与Mattermost后端API交互
3. **PM模块系统**：通过pmInterface支持动态加载自定义API逻辑
4. **反监控措施**：移除了官方监控和遥测功能

## 修复TypeScript错误

当前环境中的TypeScript错误主要是因为缺少类型声明包导致的，安装所需的@types包后即可解决：

```bash
npm install --save-dev @types/react @types/react-dom @types/react-router-dom
npm install --save-dev @types/node @types/express @types/cors @types/compression
```

这些错误不影响实际功能运行，仅在开发过程中显示警告。

## 源代码移动指南

详细的源代码文件移动指南请参考 [QUICK_GUIDE.md](./QUICK_GUIDE.md) 文件。该文件包含了将现有代码组织到新文件夹结构的具体步骤。

## 特别说明

本项目已移除了Mattermost官方的监控和遥测功能，通过setupAntiMonitoring中间件阻止了所有监控请求。在使用过程中，请确保不会泄露敏感信息或违反相关法规。