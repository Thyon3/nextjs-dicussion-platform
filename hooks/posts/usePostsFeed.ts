import { postStateAtom } from "@/atoms/postsAtom";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import useCustomToast from "../useCustomToast";
import { useIntersectionObserver } from "../useIntersectionObserver";
import { Post } from "@/types/post";
import { getPosts as getPostsApi } from "@/lib/api/posts";

type UsePostsFeedProps = {
  communityId?: string;
  communityIds?: string[];
  isGenericHome?: boolean;
  sort?: string;
};

/**
 * A custom hook that manages post feed for communities and home page with a Riverpod-like caching layer.
 * It caches posts using a Jotai atom and serves cached data instantly when returning to a page.
 * @param communityId - Optional identifier to fetch posts for a specific community.
 */
const usePostsFeed = ({
  communityId,
  sort,
}: UsePostsFeedProps) => {
  const [postStateValue, setPostStateValue] = useAtom(postStateAtom);
  const [loading, setLoading] = useState(false);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const showToast = useCustomToast();

  const observerOptions = useMemo(() => ({ threshold: 0.5 }), []);
  const { ref } = useIntersectionObserver(observerOptions);

  const cacheKey = communityId ? `${communityId}_${sort || "hot"}` : `home_${sort || "hot"}`;

  const fetchPosts = async (forceRefetch = false) => {
    if (loading) return;

    // Check cache
    const cached = postStateValue.feedCache[cacheKey];
    const isFresh = cached && Date.now() - cached.fetchedAt < 30000; // 30 seconds freshness window

    if (isFresh && !forceRefetch) {
      // Data is fresh, update list to match cached content and skip network request
      setPostStateValue((prev) => ({
        ...prev,
        posts: cached.posts,
      }));
      setNoMorePosts(true);
      return;
    }

    // Stale-While-Revalidate: display cached feed immediately to prevent blank/spinner screen
    if (cached) {
      setPostStateValue((prev) => ({
        ...prev,
        posts: cached.posts,
      }));
    }

    // Only show loading spinner on initial fetch (when no cache is available)
    if (!cached) {
      setLoading(true);
    }

    try {
      const posts = await getPostsApi(communityId, sort);
      setNoMorePosts(true); // Assuming no pagination from backend yet

      setPostStateValue((prev) => {
        const newCache = {
          ...prev.feedCache,
          [cacheKey]: {
            posts: posts as Post[],
            fetchedAt: Date.now(),
          },
        };
        return {
          ...prev,
          posts: posts as Post[],
          feedCache: newCache,
        };
      });
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
  }, [communityId, sort]);

  return {
    loading,
    fetchPosts,
    ref,
    noMorePosts,
  };
};

export default usePostsFeed;

