const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant for the Municipality of Isulan Engineering Office. You can help with questions about building permits, forms, and other engineering-related inquiries."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 500
        });

        res.json({ 
            reply: completion.choices[0].message.content 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Failed to get response from AI' 
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 