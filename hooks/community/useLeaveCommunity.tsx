import { useState } from "react";
import { communityStateAtom } from "@/atoms/communitiesAtom";
import { useSetAtom } from "jotai";
import { useAuth } from "../useAuth";
import useCustomToast from "../useCustomToast";
import { leaveCommunity } from "@/lib/api/community";

/**
 * A custom hook that provides functionality for a user to leave a community.
 * It handles backend leave logic, removes the user's membership snippet,
 * and decrements the community's member count in local Jotai state.
 * @returns An object containing `leaveCommunity` function, loading state, and error state.
 */
const useLeaveCommunity = () => {
  const { user } = useAuth();
  const setCommunityStateValue = useSetAtom(communityStateAtom);
  const showToast = useCustomToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLeaveCommunity = async (communityId: string) => {
    if (!user) return;
    setLoading(true);
    try {
      await leaveCommunity(user.id, communityId);

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
        currentCommunity:
          prev.currentCommunity?.id === communityId
            ? {
                ...prev.currentCommunity,
                numberOfMembers: prev.currentCommunity.numberOfMembers - 1,
              }
            : prev.currentCommunity,
      }));
    } catch (error: any) {
      console.log("Error: leaveCommunity", error.message);
      setError(error.message);
      showToast({
        title: "Could not Unsubscribe",
        description: "There was an error unsubscribing from community",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    leaveCommunity: onLeaveCommunity,
    leaveLoading: loading,
    leaveError: error,
  };
};

export default useLeaveCommunity;

