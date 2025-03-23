import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  const sendMessage = async (message, file = null) => {
    if (!message.trim() && !file) {
      toast.error("Message cannot be empty");
      return;
    }

    setLoading(true);
    try {
      if (selectedConversation?.isAI) {
        // AI chat only supports text messages
        const res = await fetch(`/api/ai-chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "AI request failed");

        setMessages([
          ...messages,
          { senderId: authUser._id, message }, // User message
          { senderId: "ai", message: data.message || "No response from AI" }, // AI response
        ]);
      } else {
        // Regular chat: Send text + file (if any)
        const formData = new FormData();
        formData.append("message", message);
        formData.append("senderId", authUser._id);
        if (file) {
          console.log("File being sent:", file); // Debugging file before sending
          formData.append("file", file);
        }

        const res = await fetch(
          `/api/messages/send/${selectedConversation._id}`,
          {
            method: "POST",
            body: formData, // Use FormData instead of JSON
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to send message");
        }
        const data = await res.json();
        // console.log("Response from backend:", data);
        setMessages([...messages, data]);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
