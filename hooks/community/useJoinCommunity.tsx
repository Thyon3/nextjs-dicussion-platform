import { useState } from "react";
import { communityStateAtom } from "@/atoms/communitiesAtom";
import { Community } from "@/types/community";
import { useSetAtom } from "jotai";
import { useAuth } from "../useAuth";
import useCustomToast from "../useCustomToast";
import { joinCommunity } from "@/lib/api/community";

/**
 * A custom hook that provides functionality for a user to join a community.
 * It handles backend join logic, updates user's membership snippets,
 * and increments the community's member count in local Jotai state.
 * @returns An object containing `joinCommunity` function, loading state, and error state.
 */
const useJoinCommunity = () => {
  const { user } = useAuth();
  const setCommunityStateValue = useSetAtom(communityStateAtom);
  const showToast = useCustomToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinCommunity = async (communityData: Community) => {
    if (!user) return;
    setLoading(true);
    try {
      const newSnippet = await joinCommunity(
        user.id,
        communityData.id,
        communityData.imageURL || "",
        user.id === communityData.creatorId ||
          (communityData.adminIds?.includes(user.id || "") ?? false)
      );

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
        currentCommunity:
          prev.currentCommunity?.id === communityData.id
            ? {
                ...prev.currentCommunity,
                numberOfMembers: prev.currentCommunity.numberOfMembers + 1,
              }
            : prev.currentCommunity,
      }));
    } catch (error: any) {
      console.log("Error: joinCommunity", error);
      showToast({
        title: "Could not Subscribe",
        description: "There was an error subscribing to community",
        status: "error",
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    joinCommunity: onJoinCommunity,
    joinLoading: loading,
    joinError: error,
  };
};

export default useJoinCommunity;

