import { useState, useMemo, useEffect } from "react";
import io from "socket.io-client";

// Server config
import apiConfig from "../../configs/api-config";

// The context
import socketContext from "./socketContext";

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  /**
   * Establishes a websockets connection to the server
   *
   * @returns Whether the socket has been successfully set or not
   */
  async function connectSocket() {
    const connectionURL = `${apiConfig.host}:${apiConfig.port}`;
    let socket;
    try {
      socket = io(connectionURL, {
        transports: ["websocket"],
        auth: {
          token: localStorage.getItem("access-token") || null,
        },
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    socket.on("connect", () => {
      setSocket(socket);
    });
    return true;
  }

  const contextValue = useMemo(
    () => ({
      socket,
      setSocket,
      connectSocket,
    }),
    [socket]
  );

  // Clearing the socket connection listener
  useEffect(() => {
    if (socket) {
      return () => socket.off("connect");
    }
  }, [socket]);

  return <socketContext.Provider value={contextValue}>{children}</socketContext.Provider>;
}
