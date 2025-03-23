import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const actualSenderId = message.senderId || message.sender;
  const isAI = actualSenderId === "ai" || message.isAI === true;
  const fromMe = actualSenderId === authUser._id && !isAI;

  const chatClassName = fromMe ? "chat-end" : "chat-start";

  const profilePic = fromMe
    ? authUser.profilePic || "/default-avatar.png"
    : isAI
    ? "/ai-img.jpg"
    : selectedConversation?.profilePic ||
      `https://api.dicebear.com/7.x/identicon/svg?seed=${selectedConversation?.username}`;

  const bubbleBgColor = fromMe
    ? "bg-blue-500"
    : isAI
    ? "bg-gray-700"
    : "bg-gray-500";

  const shakeClass = message.shouldShake ? "shake" : "";

  const formattedTime = message.createdAt
    ? extractTime(message.createdAt)
    : "Just now";

  // Function to check if the file is an image
  const isImage = (url) => {
    return /\.(jpeg|jpg|png|gif|webp)$/i.test(url);
  };

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
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {/* Show Image if present */}
        {message.fileUrl && isImage(message.fileUrl) ? (
          <img
            src={`http://localhost:5000${message.fileUrl}`}
            alt="Sent file"
            className="w-40 h-auto rounded-lg mt-1"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : message.fileUrl ? (
          // Show Download Link for Non-Image Files
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg mt-1">
            {/* PDF Icon */}
            <img src="/pdf-icon.png" alt="PDF" className="w-8 h-8" />

            {/* File Info */}
            <div className="flex-1">
              <p
                className="text-sm font-medium truncate w-40"
                title={message.fileUrl.split("/").pop()}
              >
                {message.fileUrl.split("/").pop()}
              </p>
              <p className="text-xs opacity-70">PDF Document</p>
            </div>

            {/* Download Button */}
            <a
              href={`http://localhost:5000${message.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition"
            >
              ⬇ Download
            </a>
          </div>
        ) : null}

        {/* Show Text Message */}
        {message.message && <p>{message.message}</p>}
      </div>

      {/* Message Time */}
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
