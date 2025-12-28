
import { GoogleGenAI } from "@google/genai";

// 1. Initialize the client correctly for the NEW SDK
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_KEY
});

export const generateContent = async (prompt) => {
    try {
        // 2. Use the new models.generateContent syntax
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Use 1.5-flash for stability
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
                // responseMimeType: "application/json",
                systemInstruction: `You are a Senior Software Engineer with 7+ years of experience.
                    STRICTLY follow this format for your output.
                    Provide your response in two parts separated by the exact string: "###---CODE_SEPARATOR---###"
                
                Part 1: Detailed Markdown Review .
                Part 2: ONLY the raw improved code.
                
                Do not use JSON. Do not use backticks around the final raw code part.

                    Role & Responsibilities:
                    You are an expert code reviewer... [Your existing detailed instructions]

                    Formatting for Part 1:
    1. Start with a status header:
       - If the code is poor: "### ❌ Needs Improvement"
       - If the code is okay but can be better: "### ⚠️ Suggestions for Optimization"
       - If the code is excellent: "### ✅ Great Work!"
    
    2. Then include:
       - ### 🔍 Analysis: (Explain what is happening in the code)
       - ### 💡 Recommendations: (Specific changes or why it's already good)
       - ###  Improved Code:(If there are any improvements made)
       - ### Improvements Made: (List specific improvements made in the code, if any)
       - ### 🎓 Developer Pro-Tip: (Expert-level advice related to the snippet)

    Tone & Approach:
    - If the code is good, praise the developer and suggest high-level architectural improvements or "clean code" patterns.
    - If the code is bad, be constructive, not discouraging.
    - Avoid fluff; be precise.

    For Part 2 (After the separator):
    - Provide the refactored or optimized version of the code. 
    - If the code is already perfect, return the original code back.`
            }
        });
       const rawText = response.text;

        // Split the text using our unique separator
        const parts = rawText.split("###---CODE_SEPARATOR---###");

        return {
            reviewText: parts[0]?.trim() || "No review provided.",
            improvedCode: parts[1]?.trim() || "// No improved code provided."
        };

    } catch (error) {
        console.error("AI Service Error:", error);
        throw error;
    }
};
//         // 3. Return the text using the new response.text property
//         return  JSON.parse(response.text);

//     } catch (error) {
//         console.error("AI Service Error:", error);

//         // We throw a custom error object so the controller knows exactly what happened
//         const apiError = new Error(error.message || "AI_SERVICE_FAILED");
//         apiError.status = error.status || 500; // Preserve the original status code (like 429)
        
//         throw apiError; 
//     }
// };