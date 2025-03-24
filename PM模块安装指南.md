# AgiMa + Mattermost PM模块安装指南

## PM模块系统概述

PM模块系统是AgiMa + Mattermost集成项目的核心扩展机制，允许动态添加功能而无需修改核心代码。每个模块都可以：

- 注册新的API端点
- 添加WebSocket事件处理程序
- 扩展数据模型
- 提供自定义业务逻辑

## 模块安装步骤

### 1. 准备模块目录

在服务器上执行以下命令：

```bash
# 连接到服务器
ssh root@38.207.177.236 -p 22

# 创建模块目录
mkdir -p /root/agima-project/后端/modules
cd /root/agima-project/后端/modules
```

### 2. 创建示例模块

```bash
# 创建模块目录结构
mkdir -p custom-api/src
cd custom-api

# 创建package.json
cat > package.json << 'EOF'
{
  "name": "custom-api",
  "version": "1.0.0",
  "description": "AgiMa自定义API模块",
  "main": "index.js",
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

# 创建模块主文件
cat > index.js << 'EOF'
/**
 * 自定义API功能示例PM模块
 */
module.exports = {
  // 模块元数据
  meta: {
    name: 'custom-api',
    version: '1.0.0',
    description: '为AgiMa扩展自定义API功能',
    author: 'AgiMa Team'
  },
  
  // 存储上下文引用
  context: null,
  
  /**
   * 初始化模块
   */
  async init(context) {
    this.context = context;
    context.logger.info('自定义API模块已初始化');
    
    // 创建数据目录
    const path = require('path');
    const { promises: fs } = require('fs');
    const dataDir = path.join(process.cwd(), 'data', 'custom-api');
    try {
      await fs.mkdir(dataDir, { recursive: true });
      context.logger.info(`数据目录已创建: ${dataDir}`);
    } catch (error) {
      context.logger.error(`创建数据目录失败: ${error.message}`);
    }
  },
  
  /**
   * 注册路由
   */
  registerRoutes(app) {
    // 添加自定义API端点
    app.get('/api/custom/stats', this.getStats.bind(this));
    app.post('/api/custom/feedback', this.submitFeedback.bind(this));
    app.get('/api/custom/gpu-benchmarks', this.getGPUBenchmarks.bind(this));
    
    this.context.logger.info('自定义API路由已注册');
  },
  
  /**
   * 注册Socket处理程序
   */
  registerSocketHandlers(io) {
    // 创建自定义命名空间
    const customNamespace = io.of('/custom');
    
    customNamespace.on('connection', (socket) => {
      this.context.logger.info(`客户端连接到自定义命名空间: ${socket.id}`);
      
      // 处理实时更新请求
      socket.on('subscribe-gpu-updates', async (data) => {
        const { instanceId } = data;
        socket.join(`gpu-${instanceId}`);
        
        // 发送初始数据
        try {
          const benchmarkData = await this.loadBenchmarkData(instanceId);
          socket.emit('gpu-benchmark-data', benchmarkData);
        } catch (error) {
          socket.emit('error', { 
            message: '加载基准数据失败', 
            code: 'BENCHMARK_LOAD_FAILED' 
          });
        }
      });
      
      // 取消订阅
      socket.on('unsubscribe-gpu-updates', (data) => {
        const { instanceId } = data;
        socket.leave(`gpu-${instanceId}`);
      });
      
      // 断开连接
      socket.on('disconnect', () => {
        this.context.logger.info(`客户端断开自定义命名空间连接: ${socket.id}`);
      });
    });
    
    // 设置定期更新
    setInterval(() => {
      // 模拟实时性能数据
      const performanceData = this.generateRandomPerformanceData();
      customNamespace.emit('system-performance', performanceData);
    }, 5000);
  },
  
  /**
   * 获取系统统计信息API处理程序
   */
  async getStats(req, res) {
    try {
      // 生成一些模拟统计数据
      const stats = {
        activeInstances: Math.floor(Math.random() * 100) + 50,
        totalUsers: Math.floor(Math.random() * 1000) + 500,
        averageRentDuration: Math.floor(Math.random() * 48) + 24,
        popularGPUs: [
          { name: 'NVIDIA RTX 4090', count: Math.floor(Math.random() * 50) + 20 },
          { name: 'NVIDIA A100', count: Math.floor(Math.random() * 40) + 15 },
          { name: 'AMD Radeon Pro VII', count: Math.floor(Math.random() * 30) + 10 }
        ],
        timestamp: new Date().toISOString()
      };
      
      res.json(stats);
    } catch (error) {
      this.context.logger.error(`获取统计数据失败: ${error.message}`);
      res.status(500).json({ error: '获取统计数据失败' });
    }
  },
  
  /**
   * 提交反馈API处理程序
   */
  async submitFeedback(req, res) {
    try {
      const { userId, rating, comment, category } = req.body;
      
      // 验证输入
      if (!userId || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: '无效的输入数据' });
      }
      
      // 安全处理用户输入
      const sanitizedComment = this.context.utils.validate.escape(comment || '');
      
      // 存储反馈
      const feedback = {
        userId,
        rating,
        comment: sanitizedComment,
        category: category || 'general',
        timestamp: new Date().toISOString()
      };
      
      const path = require('path');
      const { promises: fs } = require('fs');
      const feedbackFile = path.join(
        process.cwd(), 
        'data', 
        'custom-api', 
        `feedback-${Date.now()}.json`
      );
      
      await fs.writeFile(
        feedbackFile, 
        JSON.stringify(feedback, null, 2), 
        'utf8'
      );
      
      this.context.logger.info(`反馈已保存: ${feedbackFile}`);
      res.status(201).json({ success: true, id: path.basename(feedbackFile) });
    } catch (error) {
      this.context.logger.error(`提交反馈失败: ${error.message}`);
      res.status(500).json({ error: '提交反馈失败' });
    }
  },
  
  /**
   * 获取GPU基准测试数据API处理程序
   */
  async getGPUBenchmarks(req, res) {
    try {
      const { gpu } = req.query;
      
      if (!gpu) {
        return res.status(400).json({ error: '必须指定GPU型号' });
      }
      
      // 加载或生成基准数据
      const benchmarkData = await this.loadBenchmarkData(gpu);
      res.json(benchmarkData);
    } catch (error) {
      this.context.logger.error(`获取GPU基准测试数据失败: ${error.message}`);
      res.status(500).json({ error: '获取GPU基准测试数据失败' });
    }
  },
  
  /**
   * 加载GPU基准测试数据
   */
  async loadBenchmarkData(gpu) {
    // 模拟从数据库或文件加载数据
    // 在真实场景中，这会从数据库或API获取
    
    // 生成一些模拟基准数据
    return {
      gpu,
      scores: {
        rendering: Math.floor(Math.random() * 5000) + 8000,
        compute: Math.floor(Math.random() * 10000) + 15000,
        gaming: Math.floor(Math.random() * 3000) + 5000
      },
      comparisonPercentile: Math.floor(Math.random() * 100),
      powerEfficiency: Math.floor(Math.random() * 50) + 50,
      thermals: {
        idle: Math.floor(Math.random() * 20) + 30,
        load: Math.floor(Math.random() * 30) + 60
      },
      updatedAt: new Date().toISOString()
    };
  },
  
  /**
   * 生成随机性能数据
   */
  generateRandomPerformanceData() {
    return {
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      gpu: Math.floor(Math.random() * 100),
      network: {
        up: Math.floor(Math.random() * 100),
        down: Math.floor(Math.random() * 100)
      },
      timestamp: new Date().toISOString()
    };
  },
  
  /**
   * 清理模块
   */
  async cleanup() {
    this.context.logger.info('自定义API模块正在清理...');
    // 执行必要的清理操作
  }
};
EOF

# 创建src目录下的辅助文件
cd src
cat > utils.js << 'EOF'
/**
 * 辅助工具函数
 */
exports.formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString();
};

exports.calculateAverage = (values) => {
  if (!values || values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
};
EOF

# 返回到模块根目录
cd ..
```

### 3. 安装模块依赖

```bash
# 安装模块依赖
npm install
```

### 4. 注册模块到系统

编辑后端服务配置文件：

```bash
cd /root/agima-project/后端
nano src/config/modules.json
```

添加以下内容（如果文件不存在则创建）：

```json
{
  "enabled": true,
  "modulesPath": "../modules",
  "autoload": ["custom-api"]
}
```

### 5. 重启后端服务

```bash
# 查找后端服务进程
ps aux | grep node | grep backend

# 终止进程
kill -9 [进程ID]

# 重新启动后端服务
cd /root/agima-project/后端
nohup npm start > backend.log 2>&1 &
```

## 创建自定义PM模块

### 模块结构

PM模块需要遵循以下基本结构：

```
my-module/
├── package.json      # 依赖声明
├── index.js          # 主入口文件
└── src/              # 源代码目录
    ├── routes/       # API路由
    ├── models/       # 数据模型
    └── utils/        # 工具函数
```

### 模块接口定义

每个PM模块必须实现以下接口：

```javascript
module.exports = {
  // 模块元数据
  meta: {
    name: "模块名称",
    version: "1.0.0",
    description: "模块描述",
    author: "作者信息"
  },
  
  // 生命周期方法
  init(context) {
    // 初始化代码
  },
  
  cleanup() {
    // 清理代码（可选）
  },
  
  // 扩展点
  registerRoutes(app) {
    // 注册API路由
  },
  
  registerSocketHandlers(io) {
    // 注册WebSocket处理程序
  },
  
  extendModels() {
    // 扩展数据模型（可选）
  }
};
```

## 模块管理命令

### 列出已安装模块

```bash
cd /root/agima-project/后端
node -e "const { PMModuleManager } = require('./src/modules/loader'); const manager = new PMModuleManager({}); console.log(manager.getAllModules().map(m => m.meta));"
```

### 启用/禁用模块

编辑配置文件：

```bash
nano src/config/modules.json
```

在`autoload`数组中添加或删除模块名称。

### 手动加载模块

在后端服务代码中添加：

```javascript
const { loadPMModulesFromDirectory } = require('./modules/loader');
const modulesDir = path.join(__dirname, '../modules');
loadPMModulesFromDirectory(modulesDir, moduleManager);
```

## 模块开发最佳实践

1. **模块隔离**：每个模块应该是独立的，避免直接依赖其他模块
2. **优雅退出**：实现`cleanup`方法以处理模块卸载
3. **错误处理**：使用`context.logger`记录错误并妥善处理异常
4. **性能优化**：避免阻塞操作，使用异步处理大量数据
5. **安全性**：验证和清理所有用户输入
6. **文档**：为模块提供清晰的文档和使用示例

## 接口测试

安装完成后，测试模块是否正常工作：

```bash
# 测试统计API
curl http://38.207.177.236:4000/api/custom/stats

# 测试提交反馈API
curl -X POST http://38.207.177.236:4000/api/custom/feedback \
  -H "Content-Type: application/json" \
  -d '{"userId":"test123","rating":5,"comment":"Great service!"}'

# 测试GPU基准测试API
curl http://38.207.177.236:4000/api/custom/gpu-benchmarks?gpu=NVIDIA%20RTX%204090
```

## 故障排除

### 问题：模块加载失败

检查日志文件：

```bash
tail -f /root/agima-project/后端/backend.log
```

常见原因：
- 依赖缺失
- 路径错误
- 语法错误

### 问题：API端点不可用

1. 确认模块已正确加载
2. 检查路由注册逻辑
3. 测试基本连接：`curl http://38.207.177.236:4000/api/healthcheck`

### 问题：WebSocket连接失败

1. 检查WebSocket服务是否正在运行
2. 验证命名空间是否正确创建
3. 使用WebSocket客户端工具测试连接

## 高级用法

### 数据持久化

使用模块上下文中的数据库连接：

```javascript
async function saveData(data) {
  try {
    await this.context.db.collection('myCollection').insertOne(data);
  } catch (error) {
    this.context.logger.error('保存数据失败', error);
  }
}
```

### 定时任务

在模块中实现定时任务：

```javascript
let intervalId;

// 在init中设置
init(context) {
  // 每小时执行一次
  intervalId = setInterval(this.hourlyTask.bind(this), 3600000);
}

// 在cleanup中清理
cleanup() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

hourlyTask() {
  // 定时任务逻辑
}
```

### 跨模块通信

使用全局事件总线进行模块间通信：

```javascript
// 创建事件总线
const EventEmitter = require('events');
const eventBus = new EventEmitter();

// 在一个模块中发布事件
eventBus.emit('data-updated', { id: '123', value: 'new-value' });

// 在另一个模块中订阅事件
eventBus.on('data-updated', (data) => {
  console.log('数据已更新:', data);
});
```

---

如有其他问题，请参考项目文档或联系系统管理员。