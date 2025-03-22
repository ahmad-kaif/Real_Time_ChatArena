import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();

  // Check if it's the AI Chat Friend
  const isAI = conversation.isAI || false;
  const isOnline = isAI ? true : onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`text-sm md:text-lg flex gap-2 items-center hover:bg-blue-900 rounded p-2 py-1 cursor-pointer
                    ${isSelected ? "bg-sky-500" : ""}
                `}
        onClick={() => setSelectedConversation(conversation)}
      >
        {/* Avatar */}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-8 md:w-14 rounded-full">
            <img
              src={
                isAI
                  ? "/ai-img.jpg"
                  : conversation.profilePic || "/default-avatar.png"
              }
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = "/default-avatar.png"; // Fallback image
              }}
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col flex-1">
          <div className="flex gap-20 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
