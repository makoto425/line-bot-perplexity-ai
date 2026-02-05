const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');

const app = express();

// ===== LINE 配置 =====
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);

// ⚠️ 不要在这里用 app.use(express.json());
// LINE 需要原始 body 来做签名验证

// ===== Webhook 路由 =====
// 这里使用 line.middleware(config) 自己处理 raw body + 验签
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

    const choice = response.data?.choices?.[0];
    const content = choice?.message?.content;

    let aiReply = '';
    if (typeof content === 'string') {
      aiReply = content;
    } else {
      aiReply = JSON.stringify(content ?? choice ?? response.data);
    }

    aiReply = aiReply.slice(0, 2000);

    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: aiReply,
    });
  } catch (error) {
    console.error(
      'Perplexity API error:',
      error.response?.data || error.message || error
    );

    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '抱歉，回答出错了！',
    });
  }
}

// ===== 启动服务器（Render） =====
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
