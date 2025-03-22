import express from "express";

import { aiChatController } from "../controllers/aiChatController.js";



const router = express.Router();

router.post("/",aiChatController);


export default router;
