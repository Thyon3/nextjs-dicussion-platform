import { useState } from "react";
import { communityStateAtom } from "@/atoms/communitiesAtom";
import { Community } from "@/types/community";
import { useSetAtom } from "jotai";
import { useAuth } from "../useAuth";
import { useAuthStore } from "@/src/features/auth";
import useCustomToast from "../useCustomToast";
import { joinCommunity } from "@/lib/api/community";

/**
 * A custom hook that provides functionality for a user to join a community.
 * It handles backend join logic, updates user's membership snippets,
 * and increments the community's member count in local Jotai state.
 * Also keeps the Zustand auth store in sync so GlobalHooks doesn't reset snippets.
 * @returns An object containing `joinCommunity` function, loading state, and error state.
 */
const useJoinCommunity = () => {
  const { user } = useAuth();
  const setCommunityStateValue = useSetAtom(communityStateAtom);
  const setAuthUser = useAuthStore((s) => s.login); // We'll update user directly via set
  const showToast = useCustomToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinCommunity = async (communityData: Community) => {
    if (!user) return;
    setLoading(true);
    try {
      const newSnippet = await joinCommunity(
        user.id,
        communityData.id, // Now always the community NAME
        communityData.imageURL || "",
        user.id === communityData.creatorId ||
          (communityData.adminIds?.includes(user.id || "") ?? false)
      );

      // Update Jotai atom immediately (for real-time UI)
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

      // Also sync the Zustand auth store user snippets so GlobalHooks doesn't stale-reset
      useAuthStore.setState((s) => ({
        user: s.user
          ? {
              ...s.user,
              communitySnippets: [...(s.user.communitySnippets ?? []), newSnippet],
            }
          : null,
      }));

      showToast({
        title: `Joined r/${communityData.id}`,
        description: "You are now a member of this community",
        status: "success",
      });
    } catch (error: any) {
      // If already a member, silently ignore
      if (error?.message?.includes("Already a member")) return;
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
