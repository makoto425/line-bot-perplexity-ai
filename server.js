const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');

const app = express();
app.use(express.json());

// ===== LINE 配置 =====
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);

// ===== Webhook 路由 =====
// LINE Webhook URL 要设成 https://你的-render-域名.onrender.com/callback
app.post('/callback', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.json({ success: true }))
    .catch((err) => {
      console.error('handleEvent error:', err);
      res.status(500).end();
    });
});

// ===== 处理每个事件 =====
async function handleEvent(event) {
  // 不是文字讯息就忽略
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const userMsg = event.message.text;

  try {
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'sonar-pro',
        messages: [{ role: 'user', content: userMsg }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    // 安全取得 Perplexity 回覆
    const choice = response.data?.choices?.[0];
    const content = choice?.message?.content;

    let aiReply = '';

    if (typeof content === 'string') {
      aiReply = content;
    } else {
      // 如果不是字串（可能是 object/array），转成 JSON 字串避免 ERR_INVALID_ARG_TYPE
      aiReply = JSON.stringify(content ?? choice ?? response.data);
    }

    // 限制长度，避免超过 LINE 限制
    aiReply = aiReply.slice(0, 2000);

    // 回给使用者
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: aiReply,
    });
  } catch (error) {
    // 印出更详细的错误
    console.error(
      'Perplexity API error:',
      error.response?.data || error.message || error
    );

    // 即使出错，也回一段话给使用者，避免 500
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '抱歉，回答出错了！',
    });
  }
}

// ===== 启动服务器（Render 必须这样） =====
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
