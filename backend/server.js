import 'dotenv/config'; // Modern way to load .env
import app from './src/app.js'; // Must include .js extension

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}); // server is started due to app.listen

