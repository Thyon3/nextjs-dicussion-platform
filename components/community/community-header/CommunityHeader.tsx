import { Community } from "@/types/community";
import { Box, Flex, Button, Text, Icon, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import useCommunityState from "@/hooks/community/useCommunityState";
import useCommunityMembershipActions from "@/hooks/community/useCommunityMembershipActions";
import CommunityIcon from "./CommunityIcon";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import useCommunityPermissions from "@/hooks/community/useCommunityPermissions";
import { FaReddit } from "react-icons/fa";

interface CommunityHeaderProps {
  communityData: Community;
}

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
    <Flex direction="column" width="100%" height="auto">
      {/* Banner Section */}
      <Box 
        height="146px" 
        bg={communityData.bannerURL ? "transparent" : "blue.500"}
        backgroundImage={communityData.bannerURL ? `url(${communityData.bannerURL})` : "none"}
        backgroundSize="cover"
        backgroundPosition="center"
      />
      
      {/* Profile Info Section */}
      <Flex 
        justify="center" 
        bg={{ base: "white", _dark: "#1a1a1b" }} 
        flexGrow={1}
      >
        <Flex width="95%" maxWidth="1000px" pb={4}>
          {/* Overlapping Icon */}
          <Box mt="-20px" mr={4}>
            {communityData.imageURL ? (
              <Image 
                src={communityData.imageURL} 
                alt="Community Logo" 
                boxSize="84px"
                borderRadius="full"
                border="4px solid"
                borderColor={{ base: "white", _dark: "#1a1a1b" }}
                objectFit="cover"
              />
            ) : (
              <Icon 
                as={FaReddit} 
                fontSize="84px" 
                color="blue.500" 
                border="4px solid"
                borderColor={{ base: "white", _dark: "#1a1a1b" }}
                borderRadius="50%"
                bg={{ base: "white", _dark: "#1a1a1b" }}
              />
            )}
          </Box>
          
          {/* Community Name & Actions */}
          <Flex flex={1} justify="space-between" align="center" mt={2}>
            <Flex direction="column">
              <Text fontSize="28px" fontWeight={700}>
                {communityData.name || communityData.id}
              </Text>
              <Text fontSize="14px" fontWeight={600} color="gray.500">
                r/{communityData.id}
              </Text>
            </Flex>
            
            <Flex gap={3}>
              <Button
                variant={isJoined ? "outline" : "solid"}
                height="32px"
                px={6}
                borderRadius="full"
                onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
                isLoading={loading}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
              {isJoined && (
                <Button
                  variant="outline"
                  height="32px"
                  px={6}
                  borderRadius="full"
                  onClick={() => router.push(`/community/${communityData.id}/submit`)}
                >
                  Create Post
                </Button>
              )}
              {isAdmin && (
                <Button
                  variant="outline"
                  height="32px"
                  px={6}
                  borderRadius="full"
                  onClick={() => setSettingsModalOpen(true)}
                >
                  Mod Tools
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommunityHeader;
