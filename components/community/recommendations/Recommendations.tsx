import useCommunitiesFeed from "@/hooks/community/useCommunitiesFeed";
import useCommunityState from "@/hooks/community/useCommunityState";
import useCommunityMembershipActions from "@/hooks/community/useCommunityMembershipActions";
import React from "react";
import RecommendationRow from "./RecommendationRow";
import SuggestionsHeader from "./SuggestionsHeader";

const Recommendations: React.FC = () => {
  const { communityStateValue } = useCommunityState();
  const { onJoinOrLeaveCommunity } = useCommunityMembershipActions();
  const { communities, loading } = useCommunitiesFeed({ limit: 5 });

  return (
    <div className="flex flex-col bg-[#1A1D23] rounded-[12px] border border-white/10 overflow-hidden">
      <SuggestionsHeader />
      <div className="flex flex-col p-1">
        {loading ? (
          <div className="mt-2 p-3 space-y-3">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center gap-3 animate-pulse">
                  <div className="w-6 h-6 bg-white/10 rounded-full" />
                  <div className="h-4 bg-white/10 rounded flex-1" />
                </div>
              ))}
          </div>
        ) : (
          <>
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snippet) => snippet.communityId === item.id
              );
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
            <div className="p-3">
              <button
                className="w-full h-[32px] bg-white/10 text-white rounded-full text-[10pt] font-bold hover:bg-white/20 transition-colors"
              >
                View All
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
