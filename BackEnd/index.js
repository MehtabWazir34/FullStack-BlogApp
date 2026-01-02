import express from "express"
import connectDB from "./db/db.js"
const app = express()
import cors from "cors"
import myUserRouters from "./MyRoutes/UserRouters.js"
import myBlogRouters from "./MyRoutes/BlogRouters.js"
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // if using cookies or auth headers
  })
);

connectDB()

app.use('/user', myUserRouters);
app.use('/blog', myBlogRouters)

app.get("/test", (req, res)=>{
    res.status(200).json({mssg: "checking route"})
})

app.listen(3000, ()=>{
    console.log("APP IS LISTNING ON PORT 3000");
    
})

