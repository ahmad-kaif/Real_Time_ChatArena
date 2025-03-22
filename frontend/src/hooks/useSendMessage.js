import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  const sendMessage = async (message) => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    setLoading(true);
    try {
      if (selectedConversation?.isAI) {
        const res = await fetch(`/api/ai-chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }) // Sending only the message
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "AI request failed");

        setMessages([
          ...messages,
          { senderId: authUser._id, message }, // User's message
          { senderId: "ai", message: data.message || "No response from AI" } // AI response
        ]);
      } else {
        const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, senderId: authUser._id }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to send message");
        }

        const data = await res.json();
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
