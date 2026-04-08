import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import ServerlessHttp from "serverless-http";
// import userRouter from "../MyRoutes/UserRouters.js";   // ✅ fixed path
// import blogRouter from "../MyRoutes/BlogRouters.js";   // ✅ fixed path
import blogRouter from "../../MyRoutes/BlogRouters.js";
import userRouter from "../../MyRoutes/UserRouters.js";
import ServerlessHttp from "serverless-http";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Cached DB connection (important for serverless — avoids reconnecting on every invoke)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("DB Connected.");
  } catch (error) {
    console.log("ERR to connectDB", error);
  }
};
connectDB();

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

// ✅ CastError handler
app.use((error, req, res, next) => {
  if (error instanceof mongoose.CastError) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  next(error);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ REMOVE app.listen() — not needed in serverless
// app.listen(...)

// ✅ Fixed typo: hanlder → handler
export const handler = ServerlessHttp(app, {
  basePath: "/.netlify/functions/api"   // strips this prefix before matching routes
});