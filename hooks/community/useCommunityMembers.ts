import { useState, useCallback } from "react";
import { fetchCommunityMembers } from "@/lib/api/community";
import { CommunityMember } from "@/types/communityMember";

const useCommunityMembers = () => {
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadMembers = useCallback(async (communityId: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchCommunityMembers(communityId) as any;
      // Assuming response is an array of members or an object containing members
      setMembers(response.members || response || []);
    } catch (err: any) {
      console.error("Error loading community members", err);
      setError(err.message || "Failed to load members");
    } finally {
      setLoading(false);
    }
  }, []);

  return { members, loading, error, loadMembers };
};

export default useCommunityMembers;
