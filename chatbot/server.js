const express = require('express');
const cors = require('cors');
const path = require('path');
const { GEMINI_API_KEY } = require('./config/config');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/chat', async (req, res) => {
    try {
        const systemPrompt = `
            You are a friendly, conversational AI. Please respond in simple, everyday language.
            - Keep responses short and casual
            - Avoid technical terms unless specifically asked
            - Don't use bullet points, asterisks, or markdown
            - Respond as if talking to a friend
            - Use 2-3 short paragraphs maximum
            
            Example format:
            A carrot is a crunchy orange vegetable that grows underground. It's sweet-tasting and really good for you, especially for your eyes because it's full of vitamin A.

            You can eat carrots raw as a snack, cook them in different dishes, or juice them. They also come in other colors like purple and white, though orange is the most common.
        `;
        
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: systemPrompt + "\n\nUser question: " + req.body.message + "\n\nProvide a simple, conversational response:"
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.8,
                    maxOutputTokens: 150,  // Further limited for conciseness
                }
            })
        });

        const data = await response.json();
        
        // Clean up the response text
        let cleanedResponse = data.candidates[0].content.parts[0].text
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/#{1,6}\s/g, '')
            .replace(/•/g, '')
            .replace(/[\n\r]+/g, '\n\n')  // Standardize line breaks
            .replace(/- /g, '')  // Remove list markers
            .trim();

        // Send cleaned response
        res.json({
            candidates: [{
                content: {
                    parts: [{
                        text: cleanedResponse
                    }]
                }
            }]
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 