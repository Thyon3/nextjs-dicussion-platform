import useCallCreatePost from "@/hooks/posts/useCallCreatePost";
import { Flex, Icon, Input } from "@chakra-ui/react";
import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";
import useCommunityState from "@/hooks/community/useCommunityState";
import useCommunityPermissions from "@/hooks/community/useCommunityPermissions";
import { Community } from "@/types/community";

type CreatePostProps = {};


/**
 * A call-to-action bar that provides a shortcut to the post creation page.
 * Automatically handles authentication checks and community-specific posting permissions.
 * @returns A styled input-like component that triggers navigation or the auth modal.
 */
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
    <Flex
      align="center"
      bg="#1A1D23"
      height="56px"
      borderRadius={12}
      border="1px solid"
      borderColor="whiteAlpha.100"
      p={3}
      mb={4}
    >
      <Flex 
        bg="gray.600" 
        height="36px" 
        width="36px" 
        borderRadius="full" 
        align="center" 
        justify="center" 
        mr={3}
      >
        <Icon as={FaReddit} fontSize={22} color="whiteAlpha.800" />
      </Flex>
      <Input
        placeholder="Create Post"
        fontSize="10pt"
        bg="whiteAlpha.100"
        borderColor="transparent"
        height="38px"
        borderRadius="lg"
        mr={4}
        onClick={onClick}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "whiteAlpha.200",
          border: "1px solid",
          borderColor: "whiteAlpha.300",
        }}
        _focus={{
          outline: "none",
          bg: "whiteAlpha.200",
          border: "1px solid",
          borderColor: "#FF5722",
        }}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
        _hover={{ color: "white" }}
      />
      <Icon 
        as={BsLink45Deg} 
        fontSize={24} 
        color="gray.400" 
        cursor="pointer"
        _hover={{ color: "white" }}
      />
    </Flex>
  );
};

export default CreatePostLink;
