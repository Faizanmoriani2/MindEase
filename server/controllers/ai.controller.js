import axios from "axios";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";
dotenv.config();

const client = new InferenceClient(process.env.HF_API_KEY)

export const getAIResponse = async (req, res) => {
    try {

        const { prompt } = req.body;

        if(!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        const chatCompletion = await client.chatCompletion({
            provider: "nscale",
            model: "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const aiMessage = chatCompletion.choices?.[0]?.message?.content || "No response generated."
        
        res.status(200).json({
            success: true,
            aiMessage,
        });

    } catch (error) {
        console.error("AI error:", error);
        res.status(500).json({
        success: false,
        message: "Failed to generate AI response",
        });
    }
} 

