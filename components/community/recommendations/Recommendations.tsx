import useCommunitiesFeed from "@/hooks/community/useCommunitiesFeed";
import useCommunityState from "@/hooks/community/useCommunityState";
import useCommunityMembershipActions from "@/hooks/community/useCommunityMembershipActions";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import RecommendationRow from "./RecommendationRow";
import SuggestionsHeader from "./SuggestionsHeader";

const Recommendations: React.FC = () => {
  const { communityStateValue } = useCommunityState();
  const { onJoinOrLeaveCommunity, isLoadingUser } = useCommunityMembershipActions();
  const { communities, loading } = useCommunitiesFeed({ limit: 5 });
  const { user } = useAuth();

  return (
    <div className="flex flex-col bg-card rounded-[12px] border border-border overflow-hidden">
      <SuggestionsHeader />
      <div className="flex flex-col p-1">
        {loading ? (
          <div className="mt-2 p-3 space-y-3">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center gap-3 animate-pulse">
                  <div className="w-6 h-6 bg-muted rounded-full" />
                  <div className="h-4 bg-muted rounded flex-1" />
                </div>
              ))}
          </div>
        ) : (
          <>
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
            <div className="p-3">
              <button
                className="font-reddit w-full h-[32px] bg-muted text-foreground rounded-full text-[10pt] font-bold hover:bg-white/20 transition-colors"
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
