import React from "react";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { Post } from "@/types/post";

type VoteSectionProps = {
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<any, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  post: Post;
  votingDisabled?: boolean;
};

const VoteSection: React.FC<VoteSectionProps> = ({
  userVoteValue,
  onVote,
  post,
  votingDisabled,
}) => {
  return (
    <>
      <button
        className={`p-1 rounded-md transition-all ${
          userVoteValue === 1 ? "text-[#FF4500]" : "text-muted-foreground hover:text-[#FF4500] hover:bg-muted"
        } ${votingDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        onClick={(event) =>
          !votingDisabled && onVote(event, post, 1, post.communityId)
        }
      >
        <IoChevronUpOutline className="text-[22px]" />
      </button>
      <span
        className={`text-[10pt] font-bold my-1 ${
          userVoteValue === 1 
          ? "text-[#FF4500]" 
          : userVoteValue === -1 
          ? "#7193FF" 
          : "text-foreground"
        }`}
      >
        {post.voteStatus || 0}
      </span>
      <button
        className={`p-1 rounded-md transition-all ${
          userVoteValue === -1 ? "text-[#7193FF]" : "text-muted-foreground hover:text-[#7193FF] hover:bg-muted"
        } ${votingDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        onClick={(event) =>
          !votingDisabled && onVote(event, post, -1, post.communityId)
        }
      >
        <IoChevronDownOutline className="text-[22px]" />
      </button>
    </>
  );
};

export default VoteSection;
