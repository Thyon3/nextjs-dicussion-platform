"use client";

import React, { useEffect, useState } from "react";
import { CommunityMember } from "@/types/communityMember";
import { Community } from "@/types/community";
import useCommunityMembers from "@/hooks/community/useCommunityMembers";
import { LuTrash } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useAtomValue } from "jotai";
import useCommunityPermissions from "@/hooks/community/useCommunityPermissions";
import useRemoveCommunityMember from "@/hooks/community/useRemoveCommunityMember";
import ConfirmationDialog from "@/components/modal/ConfirmationDialog";
import { communityStateAtom } from "@/atoms/communitiesAtom";

type CommunityMembersModalProps = {
  open: boolean;
  handleClose: () => void;
  communityData: Community;
};

const CommunityMembersModal: React.FC<CommunityMembersModalProps> = ({
  open,
  handleClose,
  communityData,
}) => {
  const { members, loading, error, loadMembers } = useCommunityMembers();
  const memberCount = members?.length ?? 0;
  const communityStateValue = useAtomValue(communityStateAtom);
  const { isAdmin } = useCommunityPermissions(
    communityStateValue.currentCommunity || communityData
  );

  const { removeMember, loading: removeLoading } = useRemoveCommunityMember();
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    loadMembers(communityData.id);
  }, [open, communityData.id, loadMembers]);

  const handleRemoveMember = async (memberId: string) => {
    const success = await removeMember(communityData.id, memberId);
    if (success) {
      loadMembers(communityData.id);
    }
  };

  const confirmRemoveMember = async () => {
    if (!memberToRemove) return;
    await handleRemoveMember(memberToRemove);
    setMemberToRemove(null);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-card w-full max-w-[500px] rounded-[16px] border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[70vh]">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-xl font-bold text-foreground">
            {memberCount} Community Member{memberCount === 1 ? "" : "s"}
          </h2>
          <button 
            onClick={handleClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="px-6 pb-6 overflow-y-auto custom-scrollbar flex-1">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-white/20 border-t-[#FF5722] rounded-full animate-spin" />
            </div>
          ) : !members.length ? (
            <div className="flex justify-center py-10 px-4 text-center">
              <p className="text-muted-foreground">
                {error ? "Failed to load subscribers." : "No subscribers found."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {members.map((member: CommunityMember) => (
                <div
                  key={member.uid}
                  className="flex items-center justify-between p-4 border border-border rounded-[12px] bg-muted transition-all hover:bg-muted"
                >
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-foreground">
                      {member.displayName?.trim() ? member.displayName : "No Name"}
                    </span>
                    <span className="text-[12px] text-muted-foreground">
                      {member.email}
                    </span>
                  </div>
                  {isAdmin && (
                    <button
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                      onClick={() => setMemberToRemove(member.uid)}
                      title="Remove member"
                    >
                      <LuTrash size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        open={!!memberToRemove}
        onClose={() => setMemberToRemove(null)}
        onConfirm={confirmRemoveMember}
        title="Remove Member"
        body="Are you sure you want to remove this member from the community?"
        confirmButtonText="Remove"
        isLoading={removeLoading}
      />
    </div>
  );
};

export default CommunityMembersModal;
