import React from "react";
import { Community } from "@/types/community";
import { BsFillPeopleFill } from "react-icons/bs";

type CommunityItemButtonMembersSectionProps = {
  community: Community;
  onJoinOrLeaveCommunity: (community: Community, isJoined: boolean) => void;
  isJoined: boolean;
};

const CommunityItemButtonMembersSection: React.FC<
  CommunityItemButtonMembersSectionProps
> = ({ community, onJoinOrLeaveCommunity, isJoined }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center text-muted-foreground gap-1.5">
        <BsFillPeopleFill className="text-[18px]" />
        <span className="text-[14px] font-medium">{community.numberOfMembers}</span>
      </div>
      <button
        className={`h-[32px] w-[130px] text-[10pt] font-bold rounded-full transition-all ${
          isJoined 
            ? "border border-white/30 text-foreground hover:bg-muted" 
            : "bg-[#FF5722] text-white hover:bg-[#E64A19]"
        }`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onJoinOrLeaveCommunity(community, isJoined);
        }}
      >
        {isJoined ? "Unsubscribe" : "Subscribe"}
      </button>
    </div>
  );
};

export default CommunityItemButtonMembersSection;
