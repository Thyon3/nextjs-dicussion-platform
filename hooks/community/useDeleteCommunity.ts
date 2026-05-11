import { useState } from "react";
import { deleteCommunity as deleteCommunityApi } from "@/lib/api/community";
import useCustomToast from "../useCustomToast";
import { useRouter } from "next/navigation";

const useDeleteCommunity = () => {
  const [loading, setLoading] = useState(false);

  const showToast = useCustomToast();
  const router = useRouter();

  const deleteCommunity = async (communityId: string) => {
    setLoading(true);
    try {
      await deleteCommunityApi(communityId);
      showToast({
        title: "Community Deleted",
        status: "success",
      });
      router.push("/");
      return true;
    } catch (err: any) {
      console.error("Error deleting community", err);
      showToast({
        title: "Error deleting community",
        description: err.message,
        status: "error",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCommunity, loading };
};

export default useDeleteCommunity;
