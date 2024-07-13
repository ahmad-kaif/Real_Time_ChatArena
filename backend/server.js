import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js"


const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config(); 

app.use(express.json()); //to parse the incoming request  with json payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);


// app.get("/", (req,res) => {
//     // root route - http://localhost:5000/
//     res.send("HEllo00000")
// });



app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port: ${PORT}`)
})
