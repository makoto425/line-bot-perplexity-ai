const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');

const app = express();
app.use(express.json());

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
const client = new line.Client(config);

app.post('/callback', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.json({ success: true }))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') return Promise.resolve(null);
  
  const userMsg = event.message.text;
  
  try {
    const response = await axios.post('https://api.perplexity.ai/chat/completions', {
      model: 'sonar-pro',
      messages: [{ role: 'user', content: userMsg }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    
    const aiReply = response.data.choices[0].message.content.slice(0, 2000);
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: aiReply
    });
  } catch (error) {
    console.error('Perplexity API error:', error.message);
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '抱歉，回答出错了！'
    });
  }
}

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {  // 添加 '0.0.0.0'
  console.log(`Server running on port ${port}`);
});
