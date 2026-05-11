import { communityStateAtom } from "@/atoms/communitiesAtom";
import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { Post, PostVote } from "@/types/post";
import { getCommunityPostVotes as getCommunityPostVotesApi } from "@/lib/api/posts";
import { useAuth } from "../useAuth";

type SetPostState = React.Dispatch<
  React.SetStateAction<{
    selectedPost: Post | null;
    posts: Post[];
    postVotes: PostVote[];
  }>
>;

/**
 * A custom hook that synchronizes local post vote cache with authenticated user's votes for current community.
 * It automatically fetches votes when user or current community changes.
 * @param setPostStateValue - A state setter function to update global post state with fetched votes.
 * @returns This hook does not return any values; it performs synchronization as a side effect.
 */
const usePostVoteSync = (setPostStateValue: SetPostState) => {
  const { user } = useAuth();
  const currentCommunity = useAtomValue(communityStateAtom).currentCommunity;

  const getCommunityPostVotes = async (communityId: string) => {
    if (!user) return;
    try {
      const response = await getCommunityPostVotesApi(user.id, communityId);
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: response.postVotes as PostVote[],
      }));
    } catch (error) {
      console.error("Error fetching community post votes", error);
    }
  };

  useEffect(() => {
    if (!user || !currentCommunity?.id) {
      return;
    }
    getCommunityPostVotes(currentCommunity?.id);
  }, [user, currentCommunity]);

  useEffect(() => {
    if (!user) {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    }
  }, [user, setPostStateValue]);
};

export default usePostVoteSync;

