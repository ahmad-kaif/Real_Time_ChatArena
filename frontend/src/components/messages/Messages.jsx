import { useEffect, useRef, useMemo } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeltons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages = [], loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef(null);

  // Ensure messages is always an array
  const safeMessages = useMemo(() => Array.isArray(messages) ? messages : [], [messages]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [safeMessages.length]); // Only scroll when new messages arrive

  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* Messages list */}
      {!loading && safeMessages.length > 0 ? (
        safeMessages.map((message, index) => (
          <div key={message._id || `ai-message-${index}`} ref={index === safeMessages.length - 1 ? lastMessageRef : null}>
            {message.type === "image" ? (
              <img src={message.content} alt="Shared" className="w-32 h-32 object-cover" />
            ) : (
              <Message message={message} />
            )}
          </div>
        ))
      ) : (
        !loading && <p className="text-center">Send a message to start the conversation</p>
      )}

      {/* Skeleton loaders */}
      {loading && Array.from({ length: 3 }).map((_, idx) => <MessageSkeleton key={idx} />)}
    </div>
  );
};

export default Messages;
