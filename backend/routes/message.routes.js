import express from "express";
import multer from "multer";
import path from "path";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in the "uploads" directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, upload.single("file"), sendMessage);  // File Upload Added

export default router;
