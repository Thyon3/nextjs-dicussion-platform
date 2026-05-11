import { Community } from "@/types/community";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import useCommunityState from "@/hooks/community/useCommunityState";
import useCommunityMembershipActions from "@/hooks/community/useCommunityMembershipActions";
import CommunityIcon from "./CommunityIcon";
import CommunityName from "./CommunityName";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import useCommunityPermissions from "@/hooks/community/useCommunityPermissions";

interface CommunityHeaderProps {
  communityData: Community;
}

/**
 * Displays a community header which is responsive.
 * Community header contains:
 * - Community logo and name
 * - Subscribe and unsubscribe buttons
 * - Admin settings button if user is admin
 */
const CommunityHeader: React.FC<CommunityHeaderProps> = ({ communityData }) => {
  const router = useRouter();
  const { communityStateValue } = useCommunityState();
  const { user } = useAuth();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );
  const [isMembersModalOpen, setMembersModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const { onJoinOrLeaveCommunity, loading } = useCommunityMembershipActions();
  const { isAdmin } = useCommunityPermissions(communityData);

  return (
    <Flex
      direction="column"
      bg={{ base: "red.500", _dark: "red.600" }}
      color="white"
      p={3}
      borderRadius="10px 10px 0px 0px"
      height="120px"
      position="relative"
    >
      <Box position="absolute" top="-33px" left="15px">
        <CommunityIcon imageURL={communityData.imageURL} />
      </Box>
      <Flex justify="space-between" align="center" color="white" mt={10}>
        <CommunityName id={communityData.id} />
        <Text fontSize="10pt" fontWeight={700}>
          About {communityData.id}
        </Text>
      </Flex>
      <Flex mt={2} gap={2}>
        {isJoined && (
          <Button
            width="100%"
            onClick={() => {
              router.push(`/community/${communityData.id}/submit`);
            }}
          >
            Create Post
          </Button>
        )}
        {isJoined && (
          <Button
            width="100%"
            variant="outline"
            onClick={() => setMembersModalOpen(true)}
          >
            View Members
          </Button>
        )}
        {isAdmin && (
          <Button
            width="100%"
            variant="outline"
            onClick={() => setSettingsModalOpen(true)}
          >
            Community Settings
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default CommunityHeader;
