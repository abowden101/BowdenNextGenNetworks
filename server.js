require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are the BowdenNextGenNetworks AI. You represent a top-tier MSP in Orlando.
                        Focus on network security, professionalism, and local expertise. 
                        User: ${req.body.message}`;
        
        const result = await model.generateContent(prompt);
        res.json({ reply: result.response.text() });
    } catch (error) {
        res.status(500).json({ reply: "Connection to SOC lost. Please retry." });
    }
});

app.listen(3000, () => console.log('BowdenNGN Server Active on Port 3000'));
