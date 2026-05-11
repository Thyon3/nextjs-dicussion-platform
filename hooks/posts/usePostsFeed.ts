import { postStateAtom } from "@/atoms/postsAtom";
import { useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import useCustomToast from "../useCustomToast";
import { useIntersectionObserver } from "../useIntersectionObserver";
import { Post } from "@/types/post";
import { getPosts as getPostsApi } from "@/lib/api/posts";

type UsePostsFeedProps = {
  communityId?: string;
  communityIds?: string[];
  isGenericHome?: boolean;
};

/**
 * A custom hook that manages post feed for communities and home page.
 * It handles fetching of posts from the backend.
 * @param communityId - Optional identifier to fetch posts for a specific community.
 */
const usePostsFeed = ({
  communityId,
}: UsePostsFeedProps) => {
  const setPostStateValue = useSetAtom(postStateAtom);
  const [loading, setLoading] = useState(false);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const showToast = useCustomToast();

  const observerOptions = useMemo(() => ({ threshold: 0.5 }), []);
  const { ref } = useIntersectionObserver(observerOptions);

  const fetchPosts = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const posts = await getPostsApi(communityId);

      setNoMorePosts(true); // Backend doesn't support pagination yet, so we assume no more posts
      
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("Error: fetchPosts", error);
      showToast({
        title: "Could not Fetch Posts",
        description: error.message || "There was an error fetching posts",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    
    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        posts: [],
      }));
    };
  }, [communityId, setPostStateValue]);

  return {
    loading,
    fetchPosts,
    ref,
    noMorePosts,
  };
};

export default usePostsFeed;

