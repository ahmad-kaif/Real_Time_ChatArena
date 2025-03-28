import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import aiChatRoutes from "./routes/aiChat.routes.js";  // <-- Add this line

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors()); 
app.use(express.urlencoded({ extended: true })); // Ensure form data is parsed
app.use(express.json()); // JSON parsing (must come AFTER multer)
app.use(cookieParser());
// Serve frontend build files
app.use(express.static(path.resolve("frontend", "dist")));


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai-chat", aiChatRoutes); 

// import uploadRoutes from "./routes/upload.routes.js";  // <-- Import this

// app.use("/api/upload", uploadRoutes);  // <-- Add this

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}`);
  await connectToMongoDB();
});
