import { useState, useMemo, useEffect } from "react";
import io from "socket.io-client";

// Server config
import apiConfig from "../../configs/api-config";

// The context
import socketContext from "./socketContext";

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    connectSocket();
  }, []);

  async function connectSocket() {
    const connectionURL = `${apiConfig.host}:${apiConfig.port}`;
    let socket;
    try {
      socket = io(connectionURL, {
        transports: ["websocket"],
      });
      setSocket(socket);
    } catch (error) {
      console.log(error);
      return;
    }
    await new Promise((resolve, reject) => {
      socket.on("connect", () => {
        resolve();
      });
    });
  }

  const contextValue = useMemo(
    () => ({
      socket,
      setSocket,
    }),
    [socket]
  );

  return <socketContext.Provider value={contextValue}>{children}</socketContext.Provider>;
}
