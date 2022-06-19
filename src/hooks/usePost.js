import { useState, useEffect } from "react";

// API calls
import { fetchPost } from "../apis/posts-api";

function usePost(postId) {
  const [post, setPost] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPost(postId)
      .then((post) => {
        setLoading(false);
        setPost(post);
        setHasFetched(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setHasFetched(true);
      });
  }, [postId]);

  return { post, isLoading, hasFetched, handlePostChange: setPost };
}

export default usePost;
