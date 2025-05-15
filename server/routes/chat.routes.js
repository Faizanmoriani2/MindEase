import { Router } from "express";
import { createChat, getChatById, getUserChats, appendMessageToChat, getMessagesByChatId } from "../controllers/chat.controller.js";

const chatRouter = Router();

// -- /api/v1/chat

chatRouter.post('/', createChat);

chatRouter.get('/user/:userId', getUserChats);

chatRouter.get('/:chatId', getChatById);

chatRouter.put("/append/:chatId", appendMessageToChat); 

chatRouter.get('/:chatId/messages', getMessagesByChatId)

export default chatRouter;