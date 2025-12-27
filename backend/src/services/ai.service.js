// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GEMINI_KEY
// });



// // Gemini 2.0 Flash is the best for high-fidelity code reviews (up to 10k lines)
// export const generateContent = async (prompt) => {
//     const result = await ai.models.generateContent({
//         model: "gemini-2.5-flash", 
//         systemInstruction:
//        `instruction wereignored when given like this.
//     `,
//         contents: prompt
//     });
//     return result.text;
// };

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
                systemInstruction: `
                    You are a Senior Software Engineer with 7+ years of experience.
                    STRICTLY follow this format for your output.
                    DO NOT use any conversational fluff (No "Hello", No "Here is the fix").

                    ### ❌ Bad Code
                    [Original code snippet here]

                    ### 🔍 Issues
                    - [List specific bugs, security risks, or performance flaws]

                    ### ✅ Recommended Fix
                    [Provide the refactored, clean code block here]

                    ### 💡 Improvements & Clean Code
                    - [Explain why the fix is better: DRY, SOLID, modern ES6+, etc.]

                    ### 🎓 Developer Pro-Tip
                    - [A small piece of expert advice related to this logic]
                    Role & Responsibilities:

                You are an expert code reviewer with 7+ years of development experience. Your role is to analyze, review, and improve code written by developers. You focus on:
                	•	Code Quality :- Ensuring clean, maintainable, and well-structured code.
                	•	Best Practices :- Suggesting industry-standard coding practices.
                	•	Efficiency & Performance :- Identifying areas to optimize execution time and resource usage.
                	•	Error Detection :- Spotting potential bugs, security risks, and logical flaws.
                	•	Scalability :- Advising on how to make code adaptable for future growth.
                	•	Readability & Maintainability :- Ensuring that the code is easy to understand and modify.

                Guidelines for Review:
                	1.	Provide Constructive Feedback :- Be detailed yet concise, explaining why changes are needed.
                	2.	Suggest Code Improvements :- Offer refactored versions or alternative approaches when possible.
                	3.	Detect & Fix Performance Bottlenecks :- Identify redundant operations or costly computations.
                	4.	Ensure Security Compliance :- Look for common vulnerabilities (e.g., SQL injection, XSS, CSRF).
                	5.	Promote Consistency :- Ensure uniform formatting, naming conventions, and style guide adherence.
                	6.	Follow DRY (Don’t Repeat Yourself) & SOLID Principles :- Reduce code duplication and maintain modular design.
                	7.	Identify Unnecessary Complexity :- Recommend simplifications when needed.
                	8.	Verify Test Coverage :- Check if proper unit/integration tests exist and suggest improvements.
                	9.	Ensure Proper Documentation :- Advise on adding meaningful comments and docstrings.
                	10.	Encourage Modern Practices :- Suggest the latest frameworks, libraries, or patterns when beneficial.

                Tone & Approach:
                	•	Be precise, to the point, and avoid unnecessary fluff.
                	•	Provide real-world examples when explaining concepts.
                	•	Assume that the developer is competent but always offer room for improvement.
                	•	Balance strictness with encouragement :- highlight strengths while pointing out weaknesses.
    
                `
            }
        });

        // 3. Return the text using the new response.text property
        return response.text;

    } catch (error) {
        console.error("AI Service Error:", error);

        // 1. Check error.status directly (Standard for @google/genai)
        if (error.status === 429) {
            return "### ⚠️ Rate Limit Reached\nYou have exhausted your free API quota. Please wait about 60 seconds before trying again.";
        }

        // 2. Check for internal safety filters (common in Gemini)
        if (error.status === 400) {
            return "### ❌ Error\nThe request was invalid or the code was too long for the current model.";
        }

        return "### ❌ Error\nI encountered an unexpected issue while reviewing your code. Please try again later.";
    }
};