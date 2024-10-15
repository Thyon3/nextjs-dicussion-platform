import { Community } from "@/types/community";
import { Flex, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import CommunityItemNameIconSection from "./CommunityItemNameIconSection";
import CommunityItemButtonMembersSection from "./CommunityItemButtonMembersSection";

interface CommunityItemProps {
  community: Community;
  isJoined: boolean;
  onJoinOrLeaveCommunity: (community: Community, isJoined: boolean) => void;
}

/**
 * Card displaying a community (name and logo) with subscribe button and number of members.
 * The card is clickable and will redirect to the community page.
 * If screen size is mobile, name and logo will be on top of subscribe button and number of members.
 * If screen size is desktop, name and logo will be on the left side of card and subscribe button and number of members will be on the right side.
 * @param {Community} community - community object
 * @param {boolean} isJoined - whether user is joined to the community
 * @param {(community: Community, isJoined: boolean) => void} onJoinOrLeaveCommunity - function to join or leave a community
 * @returns {React.FC} - community item component
 */
const CommunityItem: React.FC<CommunityItemProps> = ({
  community,
  isJoined,
  onJoinOrLeaveCommunity,
}) => {
  const router = useRouter();

  return (
    <Flex
      align="center"
      fontSize="10pt"
      borderColor={{ base: "white", _dark: "gray.700" }}
      borderWidth="1px"
      p="14px 12px"
      borderRadius={10}
      bg={{ base: "white", _dark: "gray.800" }}
      _hover={{
        borderColor: { base: "gray.400", _dark: "gray.600" },
        boxShadow: "sm",
      }}
      cursor="pointer"
      onClick={() => {
        router.push(`/community/${community.id}`);
      }}
      shadow="md"
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        flexGrow={1}
        align="left"
      >
        <CommunityItemNameIconSection community={community} />
        <CommunityItemButtonMembersSection
          community={community}
          onJoinOrLeaveCommunity={onJoinOrLeaveCommunity}
          isJoined={isJoined}
        />
      </Stack>
    </Flex>
  );
};

export default CommunityItem;
