import React, { useState } from "react";
import useCommunityPermissions from "@/hooks/community/useCommunityPermissions";
import { FiSettings } from "react-icons/fi";
import CommunitySettingsModal from "../../modal/community-settings/CommunitySettings";
import { Community } from "@/types/community";

type CommunitySettingsProps = {
  communityData: Community;
};

const CommunitySettings: React.FC<CommunitySettingsProps> = ({
  communityData,
}) => {
  const [isCommunitySettingsModalOpen, setCommunitySettingsModalOpen] =
    useState(false);
  const { isAdmin } = useCommunityPermissions(communityData);

  if (!isAdmin) return null;

  return (
    <>
      <CommunitySettingsModal
        open={isCommunitySettingsModalOpen}
        handleClose={() => setCommunitySettingsModalOpen(false)}
        communityData={communityData}
      />
      <button
        aria-label="Community settings"
        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
        onClick={() => setCommunitySettingsModalOpen(true)}
      >
        <FiSettings size={20} />
      </button>
    </>
  );
};

export default CommunitySettings;
