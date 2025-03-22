import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  const socketUrl =
    process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://chatarena-frpx.onrender.com";

  useEffect(() => {
    if (authUser) {
      const socket = io(socketUrl, {
        query: { userId: authUser._id },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Listen for the "receiveMessage" event
      socket.on("receiveMessage", (data) => {
        if (data.type === "image") {
          // Handle image message
          console.log("Received image URL:", data.content);
          // Render image as an <img> tag in the UI
        } else {
          // Handle text message
          console.log("Received text message:", data.content);
        }
      });

      // Cleanup when socket disconnects
      return () => {
        socket.off("receiveMessage"); // Unsubscribe from event when component unmounts
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
