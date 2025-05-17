import express from "express";
import { getAIResponse } from "../controllers/ai.controller.js";

const aiRouter = express.Router();

// -- /api/v1/ai'

aiRouter.post("/generate", getAIResponse);

export default aiRouter