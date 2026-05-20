import React, { useState } from "react";
import CommunityMembersModal from "../../modal/community-members/CommunityMembersModal";
import { FiUsers } from "react-icons/fi";
import { Community } from "@/types/community";

type CommunityMembersButtonProps = {
  communityId: string;
  isJoined: boolean;
};

const CommunityMembersButton: React.FC<CommunityMembersButtonProps> = ({
  communityId,
  isJoined,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  if (!isJoined) {
    return null;
  }

  return (
    <>
      <CommunityMembersModal
        open={isModalOpen}
        handleClose={() => setModalOpen(false)}
        communityData={{ id: communityId } as Community}
      />
      <button
        aria-label="View community members"
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
        onClick={() => setModalOpen(true)}
      >
        <FiUsers size={20} />
      </button>
    </>
  );
};

export default CommunityMembersButton;
