import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRouter from "./MyRoutes/UserRouters.js";
import blogRouter from "./MyRoutes/BlogRouters.js";
import mongoose from "mongoose";

dotenv.config(); // Load .env variables

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // frontend URL from env
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // allow auth headers/cookies
  })
);

connectDB();

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.use((error, req, res, next)=>{
  if(error instanceof mongoose.CastError){
    res.status(401).json({message : 'invalide ID'})
  }
  res.status(500).json({message : "Error takes place."})
})

app.get("/test", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});



app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
