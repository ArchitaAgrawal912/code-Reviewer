import { generateContent } from '../services/ai.service.js';

export const getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("Prompt query parameter is required");
    }

    try {
        // Now properly inside the function
        const response = await generateContent(code);
        res.send(response);
    } catch (error) {
        res.status(500).send("AI Service Error: " + error.message);
    }
};
