import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    code: { type: String, required: true },
    reviewText: { type: String, required: true },
    improvedCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Automatically stores the time
});

export default mongoose.model('Review', ReviewSchema);