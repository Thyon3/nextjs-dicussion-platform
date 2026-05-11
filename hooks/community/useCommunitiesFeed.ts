import { useState, useEffect } from "react";
import { Community } from "@/types/community";
import { getCommunities } from "@/lib/api/community";

const useCommunitiesFeed = ({ limit }: { limit?: number } = {}) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      try {
        const response = await getCommunities();
        // Assuming response is an array of communities
        let fetchedCommunities = response as Community[];
        if (limit) {
          fetchedCommunities = fetchedCommunities.slice(0, limit);
        }
        setCommunities(fetchedCommunities);
      } catch (error) {
        console.error("Error fetching communities feed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [limit]);

  return { communities, loading };
};

export default useCommunitiesFeed;
