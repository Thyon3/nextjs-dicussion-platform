import { useState } from "react";
import { leaveCommunity } from "@/lib/api/community";
import useCustomToast from "../useCustomToast";

const useRemoveCommunityMember = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useCustomToast();

  const removeMember = async (communityId: string, userId: string) => {
    setLoading(true);
    try {
      await leaveCommunity(userId, communityId);
      showToast({
        title: "Member Removed",
        status: "success",
      });
      return true;
    } catch (err: any) {
      console.error("Error removing member", err);
      showToast({
        title: "Error removing member",
        description: err.message,
        status: "error",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { removeMember, loading };
};

export default useRemoveCommunityMember;
