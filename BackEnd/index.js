import express from "express"
import userRouter from "./routes/user.routes.js"
import blogRouter from "./routes/blog.routes.js"
import connectDB from "./db/db.js"
const app = express()
import cors from "cors"
import searchRouter from "./routes/search.routes.js"
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5175", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // if using cookies or auth headers
  })
);

connectDB()

app.use("/user", userRouter)
app.use("/blog", blogRouter)
app.use("/user", searchRouter)

app.get("/test", (req, res)=>{
    res.status(200).json({mssg: "checking route"})
})

app.listen(3000, ()=>{
    console.log("APP IS LISTNING ON PORT 3000");
    
})

