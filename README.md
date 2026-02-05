<div align="center">

# 🤖 LINE Bot with Perplexity AI Integration

[![GitHub license](https://img.shields.io/github/license/makoto425/line-bot-perplexity-ai?style=for-the-badge)](https://github.com/makoto425/line-bot-perplexity-ai/blob/main/LICENSE)
[![Node.js Version](https://img.shields.io/badge/node.js-18%2B-brightgreen?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![LINE Bot SDK](https://img.shields.io/badge/LINE%20Bot%20SDK-latest-00C300?style=for-the-badge&logo=line)](https://github.com/line/line-bot-sdk-nodejs)
[![Perplexity AI](https://img.shields.io/badge/Perplexity-AI-9333EA?style=for-the-badge&logo=perplexity)](https://www.perplexity.ai/)

**🚀 一个基于 Express.js 的 LINE Bot，集成 Perplexity AI 提供智能对话功能**

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [部署](#-部署) • [配置](#-配置) • [贡献](#-贡献)

---

</div>

## ✨ 功能特性

<table>
<tr>
<td width="33%" align="center">
  
### 💬 LINE 消息整合
无缝对接 LINE Messaging API  
实时响应用户消息

</td>
<td width="33%" align="center">
  
### 🧠 Perplexity AI 驱动
先进的自然语言处理  
精准智能的回复

</td>
<td width="33%" align="center">
  
### ⚡ 快速部署
Express.js 轻量级框架  
环境变量简易配置

</td>
</tr>
</table>

## 📋 前置条件

在开始之前，请确保你已经拥有：

- ✅ **Node.js 18+** - [下载安装](https://nodejs.org/)
- ✅ **LINE Developer 账户** - [注册地址](https://developers.line.biz/)
- ✅ **Perplexity AI API Key** - [获取 API Key](https://www.perplexity.ai/)

## 🚀 快速开始

### 1️⃣ 克隆项目

```bash
git clone https://github.com/makoto425/line-bot-perplexity-ai.git
cd line-bot-perplexity-ai
```

### 2️⃣ 安装依赖

```bash
npm install
```

### 3️⃣ 配置环境变量

在项目根目录创建 `.env` 文件：

```env
# LINE 配置
LINE_CHANNEL_SECRET=your_line_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token

# Perplexity AI 配置
PERPLEXITY_API_KEY=your_perplexity_api_key
PERPLEXITY_MODEL=sonar-pro
PERPLEXITY_MAX_TOKENS=500
PERPLEXITY_SEARCH_CONTEXT_SIZE=low

# 系统提示词
PERPLEXITY_SYSTEM_PROMPT="You are a helpful assistant that provides accurate and useful information.\nPlease keep your answers concise and to the point, optimized for reading on a small screen."

# 服务器端口
PORT=8000
```

### 4️⃣ 启动应用

```bash
npm start
```

🎉 服务器将在 `http://localhost:8000` 启动！

## 📁 项目结构

```
line-bot-perplexity-ai/
├── 📂 src/
│   ├── 📄 config.js           # 配置文件管理
│   ├── 📄 server.js           # Express 服务器入口
│   ├── 📄 lineHandler.js      # LINE Webhook 处理
│   └── 📄 perplexity.js       # Perplexity AI 客户端
├── 📄 .env                    # 环境变量（需自行创建）
├── 📄 package.json            # 依赖管理
├── 📄 ecosystem.config.js     # PM2 配置（可选）
└── 📄 README.md               # 项目文档
```

## 🌐 部署

### 本地测试（使用 ngrok）

<details>
<summary>📖 点击展开详细步骤</summary>

1. **安装 ngrok**
   ```bash
   npm install -g ngrok
   ```

2. **启动本地服务器**
   ```bash
   npm start
   ```

3. **在新终端窗口运行 ngrok**
   ```bash
   npx ngrok http 8000
   ```

4. **配置 LINE Webhook**
   - 复制 ngrok 提供的 HTTPS URL（例如：`https://xxxx.ngrok.io`）
   - 在 LINE Developers Console 设置 Webhook URL：`https://xxxx.ngrok.io/webhook`
   - 启用「Use webhook」选项

</details>

### 生产环境部署

推荐使用以下平台：

| 平台 | 特点 | 适用场景 |
|------|------|----------|
| 🔷 **Heroku** | 简单易用，免费套餐 | 个人项目、快速原型 |
| 🟠 **AWS Elastic Beanstalk** | 强大扩展性 | 企业级应用 |
| 🔵 **Google Cloud Run** | 按需付费 | 成本敏感项目 |
| 🟦 **Digital Ocean** | 价格透明 | 中小型项目 |

> ⚠️ **重要提醒**：部署时务必在平台配置所有必需的环境变量

## ⚙️ 配置

### LINE Bot 配置

1. 访问 [LINE Developers Console](https://developers.line.biz/console/)
2. 创建或选择 Provider
3. 创建新的 **Messaging API Channel**
4. 获取 **Channel Secret** 和 **Channel Access Token**
5. 设置 Webhook URL：`https://your-domain.com/webhook`
6. 启用「**Use webhook**」选项

### Perplexity AI 配置

<details>
<summary>📖 可用模型说明</summary>

| 模型 | 描述 | 使用场景 |
|------|------|----------|
| `sonar` | 基础模型 | 一般对话 |
| `sonar-pro` | 专业模型 | 复杂查询 |
| `sonar-reasoning` | 推理模型 | 逻辑分析 |

</details>

在 `.env` 文件中配置：
- `PERPLEXITY_API_KEY` - 你的 API 密钥
- `PERPLEXITY_MODEL` - 选择模型
- `PERPLEXITY_MAX_TOKENS` - 最大 token 数（建议 300-1000）
- `PERPLEXITY_SEARCH_CONTEXT_SIZE` - 搜索上下文大小（low/medium/high）

## 🛠️ 开发

### 开发模式

```bash
npm run dev
```

### 生产构建

```bash
npm run build
npm run start:prod
```

## 🤝 贡献

欢迎贡献！参与方式：

1. 🍴 Fork 本项目
2. 🔀 创建特性分支（`git checkout -b feature/AmazingFeature`）
3. 💾 提交更改（`git commit -m 'Add some AmazingFeature'`）
4. 📤 推送到分支（`git push origin feature/AmazingFeature`）
5. 🎉 提交 Pull Request

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可 - 详见 LICENSE 文件

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐ Star！**

Made with ❤️ by [makoto425](https://github.com/makoto425)

</div>
