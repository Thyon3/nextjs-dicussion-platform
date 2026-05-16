"use client";

import { PageContent, RecommendationRow } from "@/components";
import { getCommunities } from "@/lib/api/community";
import { Community } from "@/types/community";
import React, { useEffect, useState } from "react";
import useCommunityMembershipActions from "@/hooks/community/useCommunityMembershipActions";
import useCommunityState from "@/hooks/community/useCommunityState";
import { useAuth } from "@/hooks/useAuth";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";

const CommunitiesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const { onJoinOrLeaveCommunity, isLoadingUser } = useCommunityMembershipActions();
  const { communityStateValue } = useCommunityState();
  const { user } = useAuth();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const fetchCommunities = async () => {
        setLoading(true);
        try {
          const response = await getCommunities(searchQuery);
          setCommunities(response);
        } catch (err) {
          console.error("Error fetching all communities", err);
        } finally {
          setLoading(false);
        }
      };

      fetchCommunities();
    }, 250); // 250ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <PageContent>
      {/* Left Content */}
      <div className="flex flex-col gap-5">
        <div className="p-5 bg-[#1A1D23] rounded-[16px] border border-white/10 shadow-md">
          <h2 className="font-reddit text-xl font-bold text-white mb-4">
            Discover Communities
          </h2>

          {/* Premium Search Bar */}
          <div className="relative flex items-center mb-6">
            <IoSearchOutline className="absolute left-4 text-gray-400 text-[18px]" />
            <input
              type="text"
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="font-reddit w-full pl-11 pr-10 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/50 focus:border-[#FF5722] transition-all text-[14px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-gray-400 hover:text-white transition-colors"
              >
                <IoCloseOutline size={20} />
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center p-10">
              <div className="w-8 h-8 border-4 border-white/20 border-t-[#FF5722] rounded-full animate-spin" />
            </div>
          ) : communities.length === 0 ? (
            <div className="text-center py-10">
              <p className="font-reddit text-gray-500 text-sm">
                No communities found matching &quot;{searchQuery}&quot;
              </p>
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
                    joinDisabled={isLoadingUser}
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
