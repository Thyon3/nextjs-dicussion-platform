import { Community } from "@/types/community";
import useCommunityState from "@/hooks/community/useCommunityState";
import { useRouter } from "next/navigation";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import CommunityMembersModal from "../../modal/community-members/CommunityMembersModal";
import AboutCommunity from "./AboutCommunity";
import AboutHeaderBar from "./AboutHeaderBar";
import AdminSectionAbout from "./AdminSectionAbout";
import useCommunityPermissions from "@/hooks/community/useCommunityPermissions";

type AboutProps = {
  communityData: Community;
};

/**
 * This about component is used for displaying general information about a community.
 * It displays the following data:
 *  - The number of subscribers in community
 *  - Date when community was created
 *  - Button for creating a new post
 *  - Additional elements are displayed if the current user is an admin:
 *  - Button for opening the community settings modal
 * @param {communityData} - Data required to be displayed
 * @returns (React.FC<AboutProps>) - About component
 * @requires AboutHeaderBar - Header bar for about section.
 * @requires AboutCommunity - Displays number of subscribers and date when community was created.
 * @requires AdminSectionAbout - Displays some additional elements if the current user is an admin.
 */
const About: React.FC<AboutProps> = ({ communityData }) => {
  const router = useRouter();
  const { communityStateValue } = useCommunityState();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );
  const [isMembersModalOpen, setMembersModalOpen] = useState(false);
  const { canView, canPost } = useCommunityPermissions(communityData);

  if (!canView) {
    return null;
  }

  return (
    // sticky position for about section
    <Box position="sticky" top="80px" borderRadius={10} shadow="md">
      <AboutHeaderBar communityName={communityData.id} />
      {/* about section */}
      <Flex
        direction="column"
        p={3}
        bg={{ base: "white", _dark: "gray.800" }}
        borderRadius="0px 0px 10px 10px"
      >
        <AboutCommunity communityData={communityData} />
        <Stack>
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
              View Subscribers
            </Button>
          )}
          <AdminSectionAbout communityData={communityData} />
        </Stack>
      </Flex>
    </Box>
  );
};

export default About;
