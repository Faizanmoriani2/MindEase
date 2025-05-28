import { create } from "domain";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import { generateAIResponse } from "../utils/aiResponse.js";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_API_KEY);

export const createChat = async (req, res) => {
  try {
    const { userId, mood } = req.body;

    const newChat = new Chat({
      user: userId,
      mood,
      messages: [],
    });

    await newChat.save();

    res.status(201).json({
      success: true,
      message: "New chat session started",
      data: newChat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create chat",
    });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    const chats = await Chat.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch chats",
    });
  }
};

export const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId).populate("user");

    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve chat",
    });
  }
};

export const appendMessageToChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { sender, content } = req.body;

    if (!sender || !content) {
      return res.status(400).json({
        success: false,
        message: "Sender and content are required",
      });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const userMessage = {sender, content};

    chat.messages.push(userMessage);

    const mood = chat.mood;
    const moodContext = {
        happy: "Respond in a cheerful and supportive tone.",
        neutral: "Respond calmly and professionally.",
        sad: "Respond with empathy and encouragement.",
        angry: "Respond with calmness and reassurance.",
        anxious: "Respond with gentle encouragement and reassurance.",
    }


    // const prompt = `${moodContext[mood]}\nUser: ${content}`;

    const prompt = `
You are a compassionate mental health assistant. 
Only respond to messages related to emotional well-being, mood, mental state, stress, or anxiety.
If the message is irrelevant, respond: "I'm here to support your emotional well-being. Let’s focus on how you’re feeling today."

${moodContext[mood]}\nUser: ${content}
`;


    const response = await client.chatCompletion({
        provider: "nscale",
        model: "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      })

    const aiReply = response.choices?.[0]?.message?.content || "I'm here for you.";

    chat.messages.push({
        sender: "ai",
        content: aiReply
    })

    //  ----- MOCK AI RESPONSE ----
    // const aiReply = generateAIResponse(content);
    // const aiMessage = {sender: 'ai', content: aiReply};
    // chat.messages.push(aiMessage);

    await chat.save();

    res.status(200).json({
      success: true,
      message: "Message appended",
      data: chat.messages,
    });
  } catch (error) {
    console.error("Error appending message:", error);
    res.statusgetUserMoodHistory(500).json({
      success: false,
      message: "Something went wrong while appending the message",
    });
  }
};

export const getMessagesByChatId = async (req, res) => {
    try {
      const { chatId } = req.params;
      const chat = await Chat.findById(chatId);
  
      if (!chat) {
        return res.status(404).json({ success: false, message: "Chat not found" });
      }
  
      res.status(200).json({
        success: true,
        data: chat.messages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch messages",
      });
    }
  };
  
  export const getUserMoodHistory = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const moodData = await Chat.find({ user: userId })
        .select("mood createdAt -_id")
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        data: moodData
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch mood history"
      });
    }
  };
  
  export const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;

        const deleted = await Chat.findByIdAndDelete(chatId);

        if(!deleted){
            return res.status(404).json({
                success:false,
                message:'Chat not found',
            });
        }

        res.status(200).json({
            success: true,
            message: "chat deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Failed to delete chat" });
    }
  }

  export const deleteMessageFromChat = async(req,res)=> {
    try {
        const { chatId, messageIndex} = req.params;

        const chat = await Chat.findById(chatId);

        if(!chat){
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        if(messageIndex < 0 || messageIndex >= chat.messages.length){
            return res.status(400).json({
                success:true,
                message: "Invalid Message index",
            });
        }

        chat.messages.splice(messageIndex, 1); 
        await chat.save();
        res.status(200).json({ success: true, message: "Message deleted successfully", data: chat.messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Failed to delete message" });
    }
  }