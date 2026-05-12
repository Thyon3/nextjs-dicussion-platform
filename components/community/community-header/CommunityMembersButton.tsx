import React, { useState } from "react";
import CommunityMembersModal from "../../modal/community-members/CommunityMembersModal";
import { FiUsers } from "react-icons/fi";

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
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        communityId={communityId}
      />
      <button
        aria-label="View community members"
        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
        onClick={() => setModalOpen(true)}
      >
        <FiUsers size={20} />
      </button>
    </>
  );
};

export default CommunityMembersButton;
