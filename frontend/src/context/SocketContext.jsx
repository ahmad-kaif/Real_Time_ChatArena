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
    import.meta.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://chatarena-frpx.onrender.com";

  useEffect(() => {
    if (authUser) {
      const newSocket = io(socketUrl, {
        query: { userId: authUser._id },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket.on("receiveMessage", (data) => {
        if (data.type === "image") {
          console.log("Received image URL:", data.content);
        } else {
          console.log("Received text message:", data.content);
        }
      });

      // Cleanup when component unmounts
      return () => {
        newSocket.off("getOnlineUsers");
        newSocket.off("receiveMessage");
        newSocket.close();
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
