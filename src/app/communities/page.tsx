"use client";

import { PageContent, RecommendationRow, CreateCommunityModal } from "@/components";
import { getCommunities } from "@/lib/api/community";
import { Community } from "@/types/community";
import React, { useEffect, useState, Suspense } from "react";
import useCommunityMembershipActions from "@/hooks/community/useCommunityMembershipActions";
import useCommunityState from "@/hooks/community/useCommunityState";
import { useAuth } from "@/hooks/useAuth";
import { IoSearchOutline, IoCloseOutline, IoAddOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";

const CommunitiesContent: React.FC = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const { onJoinOrLeaveCommunity, isLoadingUser } = useCommunityMembershipActions();
  const { communityStateValue } = useCommunityState();
  const { user } = useAuth();
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const fetchCommunities = async () => {
        setLoading(true);
        try {
          const response = await getCommunities(searchQuery) as any;
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
    <>
      <PageContent>
        {/* Left Content */}
        <div className="flex flex-col gap-5">
          <div className="p-5 bg-[#1A1D23] rounded-[16px] border border-white/10 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-reddit text-xl font-bold text-white">
                Discover Communities
              </h2>
              {user && (
                <button
                  onClick={() => setCreateOpen(true)}
                  className="font-reddit px-4 py-2 bg-[#FF5722] hover:bg-[#FF7043] text-white text-[12px] font-bold rounded-full transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <IoAddOutline size={16} />
                  <span>Create Community</span>
                </button>
              )}
            </div>

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
                      index={index}
                      item={item}
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
      {user && (
        <CreateCommunityModal
          open={createOpen}
          handleClose={() => setCreateOpen(false)}
        />
      )}
    </>
  );
};

const CommunitiesPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen bg-[#0B0E11]">
        <div className="w-8 h-8 border-4 border-white/20 border-t-[#FF5722] rounded-full animate-spin" />
      </div>
    }>
      <CommunitiesContent />
    </Suspense>
  );
};

export default CommunitiesPage;
