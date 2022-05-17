import { useRef } from "react";

/* Custom hook for checking if a component has been updated on not */
function useCheckIfUpdated() {
  const updatesNbRef = useRef(0);
  if (updatesNbRef.current === 1) updatesNbRef.current++;
  return updatesNbRef.current > 1;
}

export default useCheckIfUpdated;
