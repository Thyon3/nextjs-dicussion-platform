import React, { useState } from "react";
import { Community } from "@/types/community";
import useCommunityPermissions from "@/hooks/community/useCommunityPermissions";
import CommunitySettingsModal from "@/components/modal/community-settings/CommunitySettings";

interface AdminSectionAboutProps {
  communityData: Community;
}

const AdminSectionAbout: React.FC<AdminSectionAboutProps> = ({
  communityData,
}) => {
  const [isCommunitySettingsModalOpen, setCommunitySettingsModalOpen] =
    useState(false);
  const { isAdmin } = useCommunityPermissions(communityData);

  return (
    <>
      {isAdmin && (
        <>
          <CommunitySettingsModal
            open={isCommunitySettingsModalOpen}
            handleClose={() => setCommunitySettingsModalOpen(false)}
            communityData={communityData}
          />
          <button
            className="w-full h-[32px] text-[10pt] font-bold border border-border text-foreground rounded-full hover:bg-muted transition-colors"
            onClick={() => setCommunitySettingsModalOpen(true)}
          >
            Community Settings
          </button>
        </>
      )}
    </>
  );
};

export default AdminSectionAbout;
