import { Community } from "@/types/community";
import React, { useState } from "react";
import useCommunityState from "@/hooks/community/useCommunityState";
import useCommunityMembershipActions from "@/hooks/community/useCommunityMembershipActions";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import useCommunityPermissions from "@/hooks/community/useCommunityPermissions";
import { FaReddit } from "react-icons/fa";
import CommunitySettings from "@/components/modal/community-settings/CommunitySettings";

interface CommunityHeaderProps {
  communityData: Community;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ communityData }) => {
  const router = useRouter();
  const { communityStateValue } = useCommunityState();
  const { user } = useAuth();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const { onJoinOrLeaveCommunity, loading } = useCommunityMembershipActions();
  const { isAdmin } = useCommunityPermissions(communityData);

  return (
    <div className="flex flex-col w-full">
      {/* Banner Section */}
      <div 
        className={`h-[146px] w-full ${communityData.bannerURL ? "" : "bg-blue-500"}`}
        style={{
          backgroundImage: communityData.bannerURL ? `url(${communityData.bannerURL})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Profile Info Section */}
      <div className="flex justify-center bg-card flex-grow">
        <div className="flex w-[95%] max-w-[1000px] pb-4">
          {/* Overlapping Icon */}
          <div className="mt-[-20px] mr-4">
            {communityData.imageURL ? (
              <img 
                src={communityData.imageURL} 
                alt="Community Logo" 
                className="w-[84px] h-[84px] rounded-full border-[4px] border-[#1A1D23] object-cover bg-white"
              />
            ) : (
              <div className="w-[84px] h-[84px] rounded-full border-[4px] border-[#1A1D23] bg-white flex items-center justify-center">
                <FaReddit className="text-[60px] text-blue-500" />
              </div>
            )}
          </div>
          
          {/* Community Name & Actions */}
          <div className="flex flex-col sm:flex-row flex-1 justify-between items-start sm:items-center mt-2 gap-4">
            <div className="flex flex-col">
              <h1 className="text-[20px] sm:text-[28px] font-bold text-foreground">
                {communityData.name || communityData.id}
              </h1>
              <p className="text-[12px] sm:text-[14px] font-semibold text-muted-foreground">
                r/{communityData.id}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                className={`h-[32px] px-4 sm:px-6 rounded-full font-bold text-[12px] sm:text-[14px] transition-all flex-1 sm:flex-none ${
                  isJoined 
                  ? "bg-transparent text-foreground border border-white/30 hover:bg-muted" 
                  : "bg-white text-black hover:bg-gray-200"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
                disabled={loading}
              >
                {isJoined ? "Joined" : "Join"}
              </button>
              {isJoined && (
                <button
                  className="h-[32px] px-4 sm:px-6 rounded-full font-bold text-[12px] sm:text-[14px] border border-white/30 text-foreground hover:bg-muted transition-all flex-1 sm:flex-none"
                  onClick={() => router.push(`/community/${communityData.id}/submit`)}
                >
                  Create Post
                </button>
              )}
              {isAdmin && (
                <button
                  className="h-[32px] px-4 sm:px-6 rounded-full font-bold text-[12px] sm:text-[14px] border border-white/30 text-foreground hover:bg-muted transition-all flex-1 sm:flex-none"
                  onClick={() => setSettingsModalOpen(true)}
                >
                  Mod Tools
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <CommunitySettings
        open={isSettingsModalOpen}
        handleClose={() => setSettingsModalOpen(false)}
        communityData={communityData}
      />
    </div>
  );
};

export default CommunityHeader;
