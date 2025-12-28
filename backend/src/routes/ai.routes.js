import express from 'express';
// We import both controllers now: one for the AI logic, one for history
import { getReview, getHistory } from '../controllers/ai.controllers.js';

const router = express.Router();

/**
 * @route   POST /ai/get-review
 * @desc    Get AI feedback for a code snippet and save to DB
 * @access  Public
 */
router.post("/get-review", getReview);

/**
 * @route   GET /ai/history
 * @desc    Fetch the most recent 20 code reviews from MongoDB
 * @access  Public
 */
router.get("/history", getHistory);

// This 'router' IS what becomes 'aiRoutes' in other files
export default router;