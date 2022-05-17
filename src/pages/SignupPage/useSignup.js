import { useState } from "react";

// Custom hook for the signup page
function useSignup() {
  const [step, setStep] = useState(1);

  return { step, handleStepChange: setStep };
}

export default useSignup;
