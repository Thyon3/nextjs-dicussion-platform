import { Community } from "@/types/community";
import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import useCommunityState from "@/hooks/community/useCommunityState";
import useCommunityMembershipActions from "@/hooks/community/useCommunityMembershipActions";
import { CommunityIcon } from "./CommunityIcon";
import CommunityName from "./CommunityName";
import JoinOrLeaveButton from "./JoinOrLeaveButton";
import CommunitySettings from "./CommunitySettings";
import CommunityMembersButton from "./CommunityMembersButton";
import ConfirmationDialog from "@/components/modal/ConfirmationDialog";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { HeaderProps } from "./AboutHeaderBar";

/**
 * Displays a community header which is responsive.
 * Community header contains:
 * - Community logo and name
 * - Subscribe and unsubscribe buttons
 * - Admin settings button if user is admin
 * @param {communityData} - Community data required to be displayed
 * @returns {React.FC<HeaderProps>} - Header component
 */
const CommunityHeader: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue } = useCommunityState();
  const [user] = useAuthState(auth);
  const [isJoined] = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );
  const [isMembersModalOpen, setMembersModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const { onJoinOrLeaveCommunity, loading } = useCommunityMembershipActions();
  const { canView, canPost } = useCommunityPermissions(communityData);

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
      <CommunityIcon />
      <Flex justify="space-between" align="center" color="white">
        <CommunityName id={communityData.id} />
        <Text fontSize="10pt" fontWeight={700}>
          About {communityData.id}
        </Text>
      </Flex>
      <Flex>
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
        {canView && (
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
