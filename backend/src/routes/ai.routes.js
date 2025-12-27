import express from 'express';
import { getReview } from '../controllers/ai.controllers.js';

const router = express.Router();

router.post("/get-review", getReview);

// This 'router' IS what becomes 'aiRoutes' in other files
export default router;