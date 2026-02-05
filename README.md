LINE Bot with Perplexity AI Integration (Node.js)
[
[
[
[

A LINE Bot built using Express.js that integrates with the Perplexity AI API to provide intelligent responses to user messages.
​

Features
LINE Messaging API integration
​

Express.js web server
​

Perplexity AI API for natural language processing
​

Easy configuration via environment variables
​

Prerequisites
Node.js 18+
​

A LINE developer account and channel
​

Perplexity AI API key
​

Setup and Installation
Clone the repository

bash
git clone https://github.com/chinpeerapat/line-bot-perplexity-ai.git
cd line-bot-perplexity-ai
Install dependencies

bash
npm install
Set up environment variables

Create a .env file in the project root with the following variables:

text
LINE_CHANNEL_SECRET=your_line_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
PERPLEXITY_API_KEY=your_perplexity_api_key
PORT=8000
PERPLEXITY_MODEL=sonar-pro
PERPLEXITY_MAX_TOKENS=500
PERPLEXITY_SEARCH_CONTEXT_SIZE=low
PERPLEXITY_SYSTEM_PROMPT="You are a helpful assistant that provides accurate and useful information.\nPlease keep your answers concise and to the point, optimized for reading on a small screen."
Run the application

bash
npm start
Development
Project Structure
text
line-bot-perplexity-ai/
├── src/
│   ├── config.js           # Configuration settings
│   ├── server.js           # Express application
│   ├── lineHandler.js      # LINE webhook event handler
│   └── perplexity.js       # Perplexity AI client
├── .env                    # Environment variables (create this file)
├── package.json            # Dependencies
├── ecosystem.config.js     # PM2 config (optional)
└── README.md               # Project documentation
Deployment
Local Deployment with ngrok
For testing, use ngrok to expose your local server:

Install ngrok: ngrok.com/download
​

Start your server: npm start

In a new terminal: npx ngrok http 8000

Copy the HTTPS URL (e.g., https://xxxx.ngrok.io) and set + "/webhook" as Webhook URL in LINE Channel settings
​

Production Deployment
Use services like:

Heroku
​

AWS Elastic Beanstalk

Google Cloud Run

Digital Ocean App Platform

Set environment variables in your deployment platform.
​

LINE Bot Configuration
Go to LINE Developers Console

Create/select provider and Messaging API Channel

Get Channel Secret and Access Token

Set Webhook URL to your app's URL + "/webhook"

Enable "Use webhook"
​

Perplexity AI Configuration
Go to Perplexity AI

Get API key

Set in .env: PERPLEXITY_API_KEY, PERPLEXITY_MODEL, etc.
​

License
MIT License

Contributing
Contributions welcome! Submit a Pull Request.
