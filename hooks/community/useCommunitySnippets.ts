import { communityStateAtom } from "@/atoms/communitiesAtom";
import { useAtomValue } from "jotai";
import { useAuth } from "../useAuth";

/**
 * A custom hook that provides the current user's community membership snippets.
 * These snippets are used to determine which communities the user has joined and their roles within them.
 */
export const useCommunitySnippets = () => {
  const { user, loading: authLoading } = useAuth();
  const communityState = useAtomValue(communityStateAtom);

  return { 
    loading: authLoading || !communityState.snippetFetched, 
    error: "" 
  };
};

