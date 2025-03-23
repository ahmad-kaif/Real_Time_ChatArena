import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();
const __dirname = path.resolve();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// File Upload Route
router.post("/", upload.single("file"), (req, res) => {
    console.log("Received file:", req.file);

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({ message: "File uploaded successfully", file: req.file });
});

// Serve uploaded files
router.use("/", express.static(uploadDir));

export default router;
