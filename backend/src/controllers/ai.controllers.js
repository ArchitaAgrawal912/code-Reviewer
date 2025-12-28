import { generateContent } from '../services/ai.service.js';
import Review from '../models/Review.model.js';


export const getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("Prompt query parameter is required");
    }

    try {
        // 1. CACHE CHECK: Look for the exact same code in MongoDB
        const existingReview = await Review.findOne({ code: code });

        if (existingReview) {
            console.log("Serving from Cache (Database)");
            // Return existing review and stop execution here
            return res.status(200).json(existingReview);
        }

        // Now properly inside the function
        const response = await generateContent(code);
        //  Save to MongoDB
        // This is what makes data appear in Compass!
        const savedReview = await Review.create({
            code: code,
            reviewText: response.reviewText, // Make sure these keys match your service output
            improvedCode: response.improvedCode
        });

       console.log("📡 Calling Gemini API (New Code detected)");  
        res.status(200).json(savedReview);
    } catch (error) {
        res.status(500).send("AI Service Error: " + error.message);
    }
};


//Get all previous reviews
export const getHistory = async (req, res) => {
    try {
        const history = await Review.find()
        .select('createdAt _id code reviewText improvedCode')
        .sort({ createdAt: -1 })
        .limit(20); //Review.find(): This tells MongoDB to find documents in the "Reviews" collection. Since the parentheses () are empty, it finds all documents.-1: This stands for Descending Order (Newest to Oldest). If it were 1, it would be Ascending (Oldest to Newest).

//.limit(20); This is a performance optimization. It tells MongoDB: "Only give me the most recent 20 items."
        res.status(200).json(history);
   } catch (error) {
        // Send the specific status code back to the frontend
        res.status(error.status || 500).json({ 
            message: error.message || "An unexpected error occurred" 
        });
    }
};