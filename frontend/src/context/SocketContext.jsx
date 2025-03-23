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
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://chatarena-frpx.onrender.com";

  useEffect(() => {
    if (authUser) {
      // Close any existing socket before creating a new one
      if (socket) {
        socket.close();
      }

      const newSocket = io(socketUrl, {
        query: { userId: authUser._id },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket.on("receiveMessage", (data) => {
        console.log(
          data.type === "image"
            ? "Received image URL: " + data.content
            : "Received text message: " + data.content
        );
      });

      // Listen for file messages
      newSocket.on("receiveFile", (data) => {
        console.log("Received file:", data.fileUrl);
        // Update state to display the file in UI
      });

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
  }, [authUser]); // Dependency array

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
