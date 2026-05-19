import React from "react";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBackIos } from "react-icons/md";

interface BackToCommunityButtonProps {
  communityId?: string;
}

const BackToCommunityButton: React.FC<BackToCommunityButtonProps> = ({
  communityId,
}) => {
  const router = useRouter();
  const communityLink = `/community/${communityId}`;

  return (
    <button
      className="flex items-center w-fit px-4 h-[36px] mt-4 mx-4 text-[14px] font-bold text-foreground border border-white/30 rounded-full hover:bg-muted transition-all gap-2"
      onClick={() => router.push(communityLink)}
    >
      <MdOutlineArrowBackIos size={14} />
      <span>{`Back to r/${communityId}`}</span>
    </button>
  );
};

export default BackToCommunityButton;
