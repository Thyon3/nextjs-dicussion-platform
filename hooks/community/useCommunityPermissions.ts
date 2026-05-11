import { Community } from "@/types/community";
import { useAuth } from "../useAuth";
import useCommunityState from "./useCommunityState";

const useCommunityPermissions = (communityData: Community) => {
  const { user } = useAuth();
  const { communityStateValue } = useCommunityState();

  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  const isAdmin = 
    user?.id === communityData.creatorId || 
    (communityData.adminIds?.includes(user?.id || "") ?? false);

  const canPost = 
    communityData.privacyType === "public" || 
    isJoined || 
    isAdmin;

  const canView = 
    communityData.privacyType !== "private" || 
    isJoined || 
    isAdmin;

  return {
    isJoined,
    isAdmin,
    canPost,
    canView,
  };
};

export default useCommunityPermissions;
