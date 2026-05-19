import { Community } from "@/types/community";
import { useRouter } from "next/navigation";
import React from "react";
import CommunityItemNameIconSection from "./CommunityItemNameIconSection";
import CommunityItemButtonMembersSection from "./CommunityItemButtonMembersSection";

interface CommunityItemProps {
  community: Community;
  isJoined: boolean;
  onJoinOrLeaveCommunity: (community: Community, isJoined: boolean) => void;
}

const CommunityItem: React.FC<CommunityItemProps> = ({
  community,
  isJoined,
  onJoinOrLeaveCommunity,
}) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center p-4 bg-card border border-border rounded-[12px] shadow-md hover:border-white/30 transition-all cursor-pointer"
      onClick={() => {
        router.push(`/community/${community.id}`);
      }}
    >
      <div className="flex flex-col md:flex-row flex-grow gap-4 md:items-center">
        <div className="flex-1">
          <CommunityItemNameIconSection community={community} />
        </div>
        <div className="md:ml-auto">
          <CommunityItemButtonMembersSection
            community={community}
            onJoinOrLeaveCommunity={onJoinOrLeaveCommunity}
            isJoined={isJoined}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityItem;
