import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRouter from "./MyRoutes/UserRouters.js";
import blogRouter from "./MyRoutes/BlogRouters.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

connectDB();

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

app.use((error, req, res, next) => {
  if (error instanceof mongoose.CastError) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  next(error);
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
  console.log(`Local server running on port ${PORT}`);
});

export default app;
