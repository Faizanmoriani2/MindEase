// controllers/chat.controller.js
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
// import Message from "../models/chat.model.js"

export const createChat = async (req, res) => {
  try {
    const { userId, mood } = req.body;

    const newChat = new Chat({
      user: userId,
      mood,
      messages: [], // messages will be pushed during conversation
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

    chat.messages.push({ sender, content });
    await chat.save();

    res.status(200).json({
      success: true,
      message: "Message appended",
      data: chat.messages,
    });
  } catch (error) {
    console.error("Error appending message:", error);
    res.status(500).json({
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
  