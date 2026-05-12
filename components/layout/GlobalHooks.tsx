import { communityStateAtom } from "@/atoms/communitiesAtom";
import { postStateAtom } from "@/atoms/postsAtom";
import { savedPostStateAtom } from "@/atoms/savedPostsAtom";
import { useAuth } from "@/hooks/useAuth";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";

/**
 * A headless component that initializes global data based on the user's authentication state.
 * Bootstraps community subscriptions and saved posts into global state atoms.
 * @returns null, as this component only performs side effects.
 */
const GlobalHooks: React.FC = () => {
  const { user, loading, checkAuth } = useAuth();
  const setCommunityState = useSetAtom(communityStateAtom);
  const setSavedPostState = useSetAtom(savedPostStateAtom);
  const setPostState = useSetAtom(postStateAtom);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      // Bootstrap community snippets from user object returned by the API.
      // After the backend fix, both login and /auth/me now return communitySnippets.
      setCommunityState((prev) => ({
        ...prev,
        mySnippets: user.communitySnippets ?? [],
        snippetFetched: true,
      }));

      // Bootstrap saved posts
      setSavedPostState((prev) => ({
        ...prev,
        savedPosts: user.savedPosts ?? [],
        fetched: true,
      }));

      // Bootstrap post votes
      setPostState((prev) => ({
        ...prev,
        postVotes: user.postVotes ?? [],
      }));
    } else if (!loading && !user) {
      // Clear all state when logged out
      setCommunityState((prev) => ({
        ...prev,
        mySnippets: [],
        snippetFetched: false,
      }));
      setSavedPostState((prev) => ({
        ...prev,
        savedPosts: [],
        fetched: false,
      }));
      setPostState((prev) => ({
        ...prev,
        postVotes: [],
      }));
    }
  }, [user, loading, setCommunityState, setSavedPostState, setPostState]);

  return null;
};

export default GlobalHooks;
