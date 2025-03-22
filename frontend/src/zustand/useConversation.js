import { create } from 'zustand';

const useConversation = create((set) => ({
  messages: [],
  selectedConversation: null, // Initially no conversation selected
  setMessages: (newMessages) => set({ messages: newMessages }),

  setSelectedConversation: (conversation) => {
    if (!conversation) return;
    if (conversation.name === "AI Assistant") {
      set({
        selectedConversation: { ...conversation, _id: "ai_bot", isAI: true },
      });
    } else {
      set({ selectedConversation: conversation });
    }
  },
}));

export default useConversation;
