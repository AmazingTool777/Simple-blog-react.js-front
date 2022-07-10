import { useState, useEffect } from "react";

// Custom hook for an API call
export default function useApiCall(apiCall, errorHandler = () => {}, dependencies = []) {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiCall()
      .then((_responseData) => {
        setLoading(false);
        setResponseData(_responseData);
      })
      .catch((error) => {
        setLoading(false);
        errorHandler(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return [isLoading, responseData];
}
