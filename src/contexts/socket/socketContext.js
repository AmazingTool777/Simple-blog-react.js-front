import { createContext } from "react";

const socketContext = createContext({
  socket: null,
  setSocket: (socket) => {},
  connectSocket: () => {},
});

export default socketContext;
