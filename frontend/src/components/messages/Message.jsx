import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const actualSenderId = message.senderId || message.sender; // Ensure correct sender detection
  console.log(message);

  const isAI = actualSenderId === "ai" || message.isAI === true;
  const fromMe = actualSenderId === authUser._id && !isAI; // Ensure AI messages stay on left

  // Alignment based on sender
  const chatClassName = fromMe ? "chat-end" : "chat-start";

  // Profile picture assignment
  const profilePic =
    fromMe
      ? authUser.profilePic || "/default-avatar.png"
      : isAI
      ? "/ai-img.jpg"
      : selectedConversation?.profilePic ||
        `https://api.dicebear.com/7.x/identicon/svg?seed=${selectedConversation?.username}`;

  // Background color for different message types
  const bubbleBgColor = fromMe
    ? "bg-blue-500"
    : isAI
    ? "bg-gray-700"
    : "bg-gray-500";

  // Apply shake effect if needed
  const shakeClass = message.shouldShake ? "shake" : "";

  // Extract formatted time (handle missing `createdAt`)
  const formattedTime = message.createdAt ? extractTime(message.createdAt) : "Just now";

  return (
    <div className={`chat ${chatClassName}`}>
      {/* Profile Picture */}
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={profilePic}
            alt="Profile"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
        </div>
      </div>

      {/* Message Content */}
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
        {/* Show Image if present */}
        {message.fileUrl ? (
          <img
            src={message.fileUrl}
            alt="Sent file"
            className="w-40 h-auto rounded-lg mt-1"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : null}

        {/* Show Text Message */}
        {message.message || "📷 Sent an image"}
      </div>

      {/* Message Time */}
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
