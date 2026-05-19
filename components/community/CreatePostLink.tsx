import useCallCreatePost from "@/hooks/posts/useCallCreatePost";
import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";
import useCommunityState from "@/hooks/community/useCommunityState";
import useCommunityPermissions from "@/hooks/community/useCommunityPermissions";
import { Community } from "@/types/community";

type CreatePostProps = {};

const CreatePostLink: React.FC<CreatePostProps> = () => {
  const { onClick } = useCallCreatePost();
  const { communityStateValue } = useCommunityState();
  const { user } = useAuth();
  const { canPost } = useCommunityPermissions(
    communityStateValue.currentCommunity || ({} as Community)
  );

  if (communityStateValue.currentCommunity && !canPost) {
    return null;
  }

  return (
    <div className="flex items-center bg-card h-[56px] rounded-[12px] border border-border p-3 mb-4">
      <div className="bg-gray-600 h-[36px] w-[36px] rounded-full flex items-center justify-center mr-3 shrink-0">
        <FaReddit className="text-[22px] text-foreground/80" />
      </div>
      <input
        placeholder="Create Post"
        className="w-full text-[10pt] bg-muted border border-transparent h-[38px] rounded-lg mr-4 px-4 text-white placeholder:text-muted-foreground hover:bg-white/20 hover:border-white/30 focus:outline-none focus:bg-white/20 focus:border-[#FF5722] transition-all cursor-pointer"
        onClick={onClick}
      />
      <IoImageOutline
        className="text-[24px] mr-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors shrink-0"
      />
      <BsLink45Deg
        className="text-[24px] text-muted-foreground cursor-pointer hover:text-foreground transition-colors shrink-0"
      />
    </div>
  );
};

export default CreatePostLink;
