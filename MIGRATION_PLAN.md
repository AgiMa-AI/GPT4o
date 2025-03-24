# 文件迁移实施计划

本文档详细描述如何将现有代码重组到新的四部分架构中。

## 新架构概览

```
项目根目录/
├── 前端/                   # 前端代码
│   ├── IM/                # 即时通讯前端
│   └── AgiMa/             # 移动优化前端
├── 后端/                   # 后端服务
└── 数据库/                 # 数据存储服务
```

## 迁移步骤

### 第一步：创建目录结构

确保以下目录存在：
- 前端/IM
- 前端/AgiMa
- 后端
- 数据库

### 第二步：移动与分类文件

#### 移动到 前端/IM

以下文件应移动到 `前端/IM` 目录：

- `src/components/ai/AIDialogPanel.tsx`
- `src/pages/ai-*.tsx` (所有AI相关页面)
- 所有聊天相关组件和页面

#### 移动到 前端/AgiMa

以下文件应移动到 `前端/AgiMa` 目录：

- `src/MobileApp.tsx`
- `src/pages/mobile/*.tsx` (所有移动端页面)
- `src/services/mobileAdapter.ts`
- `src/services/mattermostApiService.ts`
- `src/hooks/use-mobile.tsx`

#### 移动到 后端

以下文件应移动到 `后端` 目录：

- `mattermost-backend/src/server.ts`
- `mattermost-backend/src/modules/pmInterface.ts`
- API相关服务和路由

#### 移动到 数据库

以下文件应移动到 `数据库` 目录：

- 数据库连接配置
- 数据模型定义
- 迁移脚本

### 第三步：删除不必要的文件

以下文件可以删除：

- 重复的配置文件
- 未使用的模块和组件
- 临时文件和备份

### 第四步：更新导入路径

所有移动的文件中，需要更新其导入路径，确保它们指向正确的新位置。例如：

```typescript
// 原始导入
import { Component } from '@/components/ui/component';

// 更新后的导入 (前端/IM)
import { Component } from '../../components/ui/component';

// 或使用别名（需配置tsconfig.json）
import { Component } from '@im/components/ui/component';
```

### 第五步：配置文件更新

更新以下配置文件以支持新的目录结构：

1. **tsconfig.json** - 每个部分都需要有自己的TypeScript配置
2. **package.json** - 每个部分都需要有自己的依赖和脚本
3. **vite.config.ts** - 更新构建配置

### 第六步：安装依赖和类型定义

运行 `types-dependencies.js` 安装所有必要的类型定义包，解决TypeScript错误。

## 特别注意事项

1. **确保路径正确**：移动文件时要特别注意路径的正确性，尤其是导入语句
2. **保持功能一致**：迁移后的应用应该保持原有功能不变
3. **逐步测试**：建议分部分迁移并测试，而不是一次性移动所有文件

## 迁移后需要进行的测试

1. **构建测试**：确保每个部分都能成功构建
2. **功能测试**：验证所有核心功能正常工作
3. **集成测试**：测试四个部分之间的交互

## 类型错误解决方案

项目中存在TypeScript类型错误，安装以下包可解决：

```bash
# 前端类型
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# 后端类型
npm install --save-dev @types/node @types/express @types/cors
npm install --save-dev @types/helmet @types/compression @types/socket.io
```

## 迁移完成后的验证

使用下列命令验证迁移是否成功：

```bash
node start.js  # 启动所有服务
```

访问应用并确认所有功能正常工作。