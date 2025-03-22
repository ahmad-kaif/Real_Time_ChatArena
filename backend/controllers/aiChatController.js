import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export const aiChatController = async (req, res) => {
    try {
        const { message } = req.body; // Expecting { message } in the request body

        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Message field is required and must be a string" });
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: message }] }]
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(500).json({ error: errorData.error?.message || "AI request failed" });
        }

        const data = await response.json();
        const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

        res.json({ message: aiResponse });

    } catch (error) {
        console.error("Error in AI Chat:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};
