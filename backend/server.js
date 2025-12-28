import 'dotenv/config'; // Modern way to load .env
import mongoose from 'mongoose';
import app from './src/app.js'; // Must include .js extension


const PORT = process.env.PORT || 3000;


// 1. Database Connection Logic
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Kill the server if DB fails
    }
};
// 2. Start Server only after DB is ready
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    }); // server is started due to app.listen

 
});

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// }); // server is started due to app.listen

 