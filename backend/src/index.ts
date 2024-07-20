import express from "express"
import { router as userRouter } from "./router/user"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(express.json())
app.use("/user", userRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})