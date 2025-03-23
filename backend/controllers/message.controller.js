import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    // console.log("Request body:", req.body);
    // console.log("Uploaded file:", req.file); // Check if file is received

    let { id: receiverId } = req.params;
    const senderId = req.user._id;
    receiverId = receiverId.trim();

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Process file upload if exists
    let fileUrl = null;
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`; // Save file path
    }

    // Create a new message with text or file
    const newMessage = new Message({
      senderId,
      receiverId,
      message: req.body.message || "", // Empty if only file is sent
      fileUrl, // Store file URL if uploaded
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // Send the message via Socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in message controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


  

export const getMessages = async (req,res) => {
    try {
        
        const { id: userToChatId } = req.params;
        // console.log(`helooo`,req.params);
        const senderId = req.user._id;
        // console.log(senderId);

        // ✅ Handle AI Chat Separately
        if (userToChatId === "ai_chat_friend") {
          return res.status(200).json([
              { sender: "ai", message: "Hello! How can I assist you today?" }
          ]);
      }

    
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId]},
        }).populate("messages");
        // console.log(conversation)


        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getmessage controller", error.message)
        res.status(500).json({error:"Internal server error"})
    }
}