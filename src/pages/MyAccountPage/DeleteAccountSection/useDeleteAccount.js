import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// API calls
import { deleteUserAccount } from "../../../apis/users-api";

// Other custom hooks
import useCurrentUser from "../../../hooks/useCurrentUser";

// Custom hook for the user account deletion section
export default function useDeleteAccount() {
  const [password, setPassword] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { currentUser, logout } = useCurrentUser();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!password) return setError("Your password is required");
      setSubmitting(true);
      try {
        await deleteUserAccount(currentUser._id, { password });
        logout(() => navigate("/auth/signup"));
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        if (error.response.status === 400) setError("Your password is wrong");
      }
    },
    [currentUser._id, logout, navigate, password]
  );

  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), []);

  const handlePasswordReset = useCallback(() => setPassword(""), []);

  return { password, error, isSubmitting, handlePasswordChange, handlePasswordReset, handleSubmit };
}
