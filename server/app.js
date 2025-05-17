import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import aiRouter from "./routes/ai.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/test', (req,res)=>{
    res.send('Hello to the MindEase backend')
})



app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/ai', aiRouter)

const PORT = process.env.PORT || 6000

app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`)
})

export default app;