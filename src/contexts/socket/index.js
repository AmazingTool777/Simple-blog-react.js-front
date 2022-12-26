import { useContext } from "react";
import socketContext from "./socketContext";
export { default as SocketProvider } from "./SocketProvider";

export function useSocket() {
  return useContext(socketContext);
}

export default socketContext;
