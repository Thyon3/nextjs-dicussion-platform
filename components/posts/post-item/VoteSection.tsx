import React from "react";
import { Icon, Text } from "@chakra-ui/react";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { Post } from "@/types/post";

type VoteSectionProps = {
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
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
      <Icon
        as={IoChevronUpOutline}
        color={userVoteValue === 1 ? "#FF4500" : "gray.400"}
        fontSize={22}
        cursor={votingDisabled ? "not-allowed" : "pointer"}
        _hover={votingDisabled ? undefined : { color: "#FF4500", bg: "whiteAlpha.100" }}
        borderRadius="md"
        transition="all 0.2s"
        onClick={(event) =>
          !votingDisabled && onVote(event, post, 1, post.communityId)
        }
      />
      <Text 
        fontSize="10pt" 
        fontWeight={700}
        color={
          userVoteValue === 1 
          ? "#FF4500" 
          : userVoteValue === -1 
          ? "#7193FF" 
          : "white"
        }
        my={1}
      >
        {post.voteStatus || 0}
      </Text>
      <Icon
        as={IoChevronDownOutline}
        color={userVoteValue === -1 ? "#7193FF" : "gray.400"}
        _hover={votingDisabled ? undefined : { color: "#7193FF", bg: "whiteAlpha.100" }}
        fontSize={22}
        cursor={votingDisabled ? "not-allowed" : "pointer"}
        borderRadius="md"
        transition="all 0.2s"
        onClick={(event) =>
          !votingDisabled && onVote(event, post, -1, post.communityId)
        }
      />
    </>
  );
};

export default VoteSection;
