import { useAuth } from "../useAuth";
import useJoinCommunity from "./useJoinCommunity";
import useLeaveCommunity from "./useLeaveCommunity";
import { Community } from "@/types/community";
import { useAuthStore } from "@/src/features/auth";

/**
 * A custom hook that centralizes logic for joining and leaving communities.
 * It handles authentication gating, triggering the auth modal if necessary, and
 * delegates the actual join/leave operations to specialized hooks.
 * @returns An object containing `onJoinOrLeaveCommunity` handler and a combined loading state.
 */
const useCommunityMembershipActions = () => {
  const { user } = useAuth();
  const isLoadingUser = useAuthStore((s) => s.isLoadingUser);
  const openModal = useAuthStore((s) => s.openModal);
  const { joinCommunity, joinLoading } = useJoinCommunity();
  const { leaveCommunity, leaveLoading } = useLeaveCommunity();

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // Don't show login modal while auth is still being checked —
    // wait until we're sure whether the user is logged in or not.
    if (isLoadingUser) return;

    if (!user) {
      openModal('login');
      return;
    }

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  return {
    onJoinOrLeaveCommunity,
    loading: joinLoading || leaveLoading,
    isLoadingUser,
  };
};

export default useCommunityMembershipActions;
