require('dotenv').config();
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.CHAT_GPT_API_KEY,
    organization: process.env.CHAT_GPT_ORGANISATION_KEY
});

module.exports = {
    openai
}