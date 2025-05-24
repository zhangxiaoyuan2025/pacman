# 🔥 吵架包赢神器 - AI智能回怼助手

## 项目简介

**吵架包赢神器** 是一个专为王者荣耀玩家打造的AI智能回怼工具网站。通过强大的DeepSeek V3 AI模型，帮助玩家生成机智、有力的回击内容，让你在游戏聊天中永远占据上风！

### ✨ 功能特色

- 🤖 **AI智能生成** - 基于DeepSeek V3模型，生成3条不同风格的回击内容
- 🎚️ **语气强度调节** - 1-10级可调节滑动条，从温和回应到激烈反击
- 📱 **响应式设计** - 完美适配手机和电脑端，王者荣耀风格UI
- 💾 **本地历史记录** - 自动保存使用历史，最多保留50条记录
- ⚡ **一键复制** - 快速复制生成的回复内容到游戏中使用
- 🎯 **多种回击风格** - 精准回击、智慧型、气势型三种不同风格

## 🚀 快速开始

### 1. 在线体验
访问：[https://quarrel-master.vercel.app](https://quarrel-master.vercel.app)

### 2. 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 在浏览器中打开 http://localhost:3000
```

## 🎮 使用方法

1. **输入对方话语** - 在文本框中输入需要回怼的内容
2. **调节语气强度** - 拖动滑动条选择回击强度（1-10级）
3. **生成AI回复** - 点击"开始吵架"按钮，AI将生成3条回击内容
4. **复制使用** - 选择最合适的回复，一键复制到游戏中

### 语气强度说明
- **1-3级**：🤝 温和回应，以理服人
- **4-7级**：⚡ 中等强度，据理力争  
- **8-10级**：🔥 激烈反击，气势压人

## 🛠️ 技术栈

- **框架**: Next.js 14 + TypeScript
- **样式**: Tailwind CSS + 自定义CSS
- **AI模型**: OpenRouter DeepSeek V3
- **存储**: localStorage (本地存储)
- **部署**: Vercel

## 📁 项目结构

```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 主页面
│   │   ├── layout.tsx         # 根布局
│   │   └── globals.css        # 全局样式
│   ├── components/            # React组件
│   │   ├── InputSection.tsx   # 输入区域
│   │   ├── ResultSection.tsx  # 结果显示
│   │   └── HistorySection.tsx # 历史记录
│   ├── lib/                   # 工具库
│   │   ├── ai-client.ts       # AI API客户端
│   │   └── storage.ts         # 本地存储
│   └── types/                 # TypeScript类型
│       └── index.ts
├── public/                    # 静态资源
├── package.json
└── README.md
```

## 🎨 设计风格

### 配色方案（王者荣耀风格）
- **主色调**: 金色渐变 `#FFD700` → `#FFA500`
- **辅助色**: 深蓝色 `#1a237e`、红色 `#d32f2f`
- **背景色**: 深色系 `#0d1421`

### UI特点
- ✨ 发光效果和阴影
- 🔄 流畅的动画过渡
- 📐 圆角卡片设计
- 🌈 渐变背景装饰

## 🔧 开发说明

### 环境要求
- Node.js 18+
- npm 或 yarn

### 开发命令
```bash
npm run dev      # 开发服务器
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 代码检查
```

### API配置
本项目使用OpenRouter的DeepSeek V3模型。如需自定义配置，可在 `src/lib/ai-client.ts` 中修改：

```typescript
const API_KEY = 'your-api-key';
const MODEL = 'deepseek/deepseek-chat';
```

## 📝 更新日志

### v1.0.0 (2024-05-24)
- 🎉 首次发布
- ✅ 基础功能完成
- ✅ AI集成完成
- ✅ 响应式设计完成
- ✅ 本地存储功能

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 贡献步骤
1. Fork本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## ⚠️ 免责声明

- 本工具仅供娱乐使用，请文明游戏，理性交流
- 生成的回复内容仅供参考，请根据实际情况适当调整
- 请遵守游戏规则和社区准则，营造良好的游戏环境

## 💡 反馈与支持

如果你觉得这个项目有用，请给个 ⭐Star⭐ 支持一下！

有问题或建议？欢迎：
- 📧 提交Issue
- 💬 参与Discussion
- 🐛 报告Bug

---

**让AI助你在王者峡谷中舌战群雄！🎮** 