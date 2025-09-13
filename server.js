import express from "express"
import dotenv from "dotenv"
import cors from 'cors'

import { connectToDB } from "./config/DB.js"
import courseRouter from "./routes/course.js"
import userRoutes from "./routes/user.js"
import orderRouter from "./routes/order.js"
import uploadRouter from "./routes/upload.js"


dotenv.config()
const app = express()


connectToDB()
app.use(cors())
app.use(express.json())


app.use("/api/upload", uploadRouter)
app.use("/api/course", courseRouter)
app.use("/api/user", userRoutes)
app.use("/api/order", orderRouter)

let port = process.env.PORT


app.use((err, req, res, next) => {
  return res.status(500).json({ title: "Server Error", message: err.message })
})


app.listen(port, () => {
  console.log("app is listening in port " + port)
})



