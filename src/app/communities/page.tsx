"use client";

import { PageContent, RecommendationRow } from "@/components";
import { getCommunities } from "@/lib/api/community";
import { Community } from "@/types/community";
import React, { useEffect, useState } from "react";
import { Box, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import useCommunityMembershipActions from "@/hooks/community/useCommunityMembershipActions";
import useCommunityState from "@/hooks/community/useCommunityState";

/**
 * Discovery page that lists all available communities on the platform.
 * Allows users to browse and join communities they aren't subscribed to.
 * @returns A feed of all community cards with membership toggles.
 */
const CommunitiesPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { onJoinOrLeaveCommunity } = useCommunityMembershipActions();
  const { communityStateValue } = useCommunityState();

  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      try {
        const response = await getCommunities();
        setCommunities(response);
      } catch (err) {
        console.error("Error fetching all communities", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <PageContent>
      {/* Left Content */}
      <Stack gap={5}>
        <Box p={4} bg={{ base: "white", _dark: "gray.800" }} borderRadius="xl" shadow="md">
          <Text fontSize="xl" fontWeight={700} mb={4}>
            Discover Communities
          </Text>
          {loading ? (
            <Flex justify="center" p={10}>
              <Spinner />
            </Flex>
          ) : (
            <Stack gap={3}>
              {communities.map((item, index) => {
                const isJoined = !!communityStateValue.mySnippets.find(
                  (snippet) => snippet.communityId === item.id
                );
                return (
                  <RecommendationRow
                    key={item.id}
                    item={item}
                    index={index}
                    isJoined={isJoined}
                    onJoinOrLeaveCommunity={onJoinOrLeaveCommunity}
                  />
                );
              })}
            </Stack>
          )}
        </Box>
      </Stack>

      {/* Right Content */}
      <Box>
        <Text color="gray.500" fontSize="sm">
          Browse all communities on the platform and join the discussions that matter to you.
        </Text>
      </Box>
    </PageContent>
  );
};

export default CommunitiesPage;
