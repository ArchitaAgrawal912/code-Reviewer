import express from 'express';
import aiRoutes from './routes/ai.routes.js'; // Must include .js extension
import cors from 'cors';
const app = express();
app.use(cors());

//Middleware duee to req.body usage
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/ai', aiRoutes);

export default app;