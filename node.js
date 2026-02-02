const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const app = express();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are the BowdenNextGenNetworks AI. 
                   Help users with Orlando networking and MSP security. 
                   User asks: ${req.body.message}`;

    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
});
