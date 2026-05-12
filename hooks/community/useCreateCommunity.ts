import { useState } from "react";
import { useAuth } from "../useAuth";
import useCustomToast from "../useCustomToast";
import { createCommunity as apiCreateCommunity } from "@/lib/api/community";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { communityStateAtom } from "@/atoms/communitiesAtom";

export const useCreateCommunity = () => {
  const { user } = useAuth();
  const showToast = useCustomToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const setCommunityStateValue = useSetAtom(communityStateAtom);

  const createCommunity = async (communityName: string, communityType: string) => {
    if (!user) return false;
    setLoading(true);
    setError("");
    try {
      await apiCreateCommunity(communityName, communityType, user.id);
      
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [
          ...prev.mySnippets,
          { communityId: communityName, isAdmin: true },
        ],
      }));

      showToast({
        title: "Community created!",
        description: `Successfully created r/${communityName}`,
        status: "success",
      });
      
      router.push(`/community/${communityName}`);
      return true;
    } catch (err: any) {
      console.error("Error creating community", err);
      setError(err.message);
      showToast({
        title: "Error creating community",
        description: err.message,
        status: "error",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCommunity,
    loading,
    error,
  };
};
