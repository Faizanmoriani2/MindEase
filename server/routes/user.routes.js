import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

// -- /api/v1/users

userRouter.get('/', getUsers)

userRouter.get('/:id', getUser)

export default userRouter;