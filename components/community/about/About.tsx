import { Community } from "@/types/community";
import useCommunityState from "@/hooks/community/useCommunityState";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CommunityMembersModal from "../../modal/community-members/CommunityMembersModal";
import AboutCommunity from "./AboutCommunity";
import AboutHeaderBar from "./AboutHeaderBar";
import AdminSectionAbout from "./AdminSectionAbout";
import useCommunityPermissions from "@/hooks/community/useCommunityPermissions";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const router = useRouter();
  const { communityStateValue } = useCommunityState();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );
  const [isMembersModalOpen, setMembersModalOpen] = useState(false);
  const { canView } = useCommunityPermissions(communityData);

  if (!canView) {
    return null;
  }

  return (
    <div className="sticky top-[80px] rounded-[10px] shadow-md overflow-hidden">
      <AboutHeaderBar communityName={communityData.id} />
      <div className="flex flex-col p-3 bg-card rounded-b-[10px] border-x border-b border-border">
        <AboutCommunity communityData={communityData} />
        <div className="flex flex-col gap-3 mt-3">
          {isJoined && (
            <button
              className="w-full h-[32px] bg-white text-black font-bold text-[10pt] rounded-full hover:bg-gray-200 transition-colors"
              onClick={() => {
                router.push(`/community/${communityData.id}/submit`);
              }}
            >
              Create Post
            </button>
          )}
          {isJoined && (
            <button
              className="w-full h-[32px] font-bold text-[10pt] text-foreground border border-white/30 rounded-full hover:bg-muted transition-colors"
              onClick={() => setMembersModalOpen(true)}
            >
              View Subscribers
            </button>
          )}
          <AdminSectionAbout communityData={communityData} />
        </div>
      </div>
      <CommunityMembersModal
        open={isMembersModalOpen}
        handleClose={() => setMembersModalOpen(false)}
        communityData={communityData}
      />
    </div>
  );
};

export default About;
