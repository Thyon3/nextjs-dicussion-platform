"use client";

import { PageContent, RecommendationRow } from "@/components";
import { getCommunities } from "@/lib/api/community";
import { Community } from "@/types/community";
import React, { useEffect, useState } from "react";
import useCommunityMembershipActions from "@/hooks/community/useCommunityMembershipActions";
import useCommunityState from "@/hooks/community/useCommunityState";
import { useAuth } from "@/hooks/useAuth";

const CommunitiesPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { onJoinOrLeaveCommunity } = useCommunityMembershipActions();
  const { communityStateValue } = useCommunityState();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      try {
        const response = await getCommunities();
        setCommunities(response);
      } catch (err) {
        console.error("Error fetching all communities", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <PageContent>
      {/* Left Content */}
      <div className="flex flex-col gap-5">
        <div className="p-4 bg-[#1A1D23] rounded-[16px] border border-white/10 shadow-md">
          <h2 className="text-xl font-bold text-white mb-4">
            Discover Communities
          </h2>
          {loading ? (
            <div className="flex justify-center p-10">
              <div className="w-8 h-8 border-4 border-white/20 border-t-[#FF5722] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {communities.map((item, index) => {
              const isJoined =
                !!communityStateValue.mySnippets.find(
                  (snippet) => snippet.communityId === item.id
                ) || item.creatorId === user?.id;
                return (
                  <RecommendationRow
                    key={item.id}
                    item={item}
                    index={index}
                    isJoined={isJoined}
                    onJoinOrLeaveCommunity={onJoinOrLeaveCommunity}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div>
        <p className="text-gray-500 text-sm">
          Browse all communities on the platform and join the discussions that matter to you.
        </p>
      </div>
    </PageContent>
  );
};

export default CommunitiesPage;
