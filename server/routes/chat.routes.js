import { Router } from "express";
import { createChat, getChatById, getUserChats, appendMessageToChat, getMessagesByChatId, getUserMoodHistory, deleteChat, deleteMessageFromChat } from "../controllers/chat.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const chatRouter = Router();

// -- /api/v1/chat

chatRouter.post('/', protect,createChat);

chatRouter.get('/user/:userId', protect ,getUserChats);

chatRouter.get('/:chatId', protect,getChatById);

chatRouter.put("/append/:chatId", protect,appendMessageToChat); 

chatRouter.get('/:chatId/messages', protect,getMessagesByChatId)

chatRouter.delete('/:chatId', protect, deleteChat);

chatRouter.delete("/:chatId/message/:messageIndex", protect, deleteMessageFromChat);

chatRouter.get("/mood-history/:userId", protect, getUserMoodHistory)


chatRouter.post('/:chatId/message', protect, appendMessageToChat);


export default chatRouter;