import { useState, useEffect } from "react";

// API calls
import { fetchPost } from "../apis/posts-api";

function usePost(postId) {
  const [post, setPost] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPost(postId)
      .then((post) => {
        console.log(post);
        setLoading(false);
        setPost(post);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  return { post, isLoading };
}

export default usePost;
