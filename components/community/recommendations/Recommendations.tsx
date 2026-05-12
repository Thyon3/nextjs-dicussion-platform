import useCommunitiesFeed from "@/hooks/community/useCommunitiesFeed";
import useCommunityState from "@/hooks/community/useCommunityState";
import useCommunityMembershipActions from "@/hooks/community/useCommunityMembershipActions";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import RecommendationRow from "./RecommendationRow";
import SuggestionsHeader from "./SuggestionsHeader";

/**
 * Displays the top 5 communities with most members.
 * @returns {React.FC} - recommendations component.
 */
const Recommendations: React.FC = () => {
  const { communityStateValue } = useCommunityState();
  const { onJoinOrLeaveCommunity } = useCommunityMembershipActions();
  const { communities, loading } = useCommunitiesFeed({ limit: 5 });

  return (
    <Flex
      direction="column"
      bg="#1A1D23"
      borderRadius={12}
      border="1px solid"
      borderColor="whiteAlpha.100"
      overflow="hidden"
    >
      <SuggestionsHeader />
      <Flex direction="column" p="4px">
        {loading ? (
          <Stack mt={2} p={3}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Flex key={index} align="center" gap={3} mb={2}>
                  <SkeletonCircle size="24px" />
                  <Skeleton height="15px" flex={1} />
                </Flex>
              ))}
          </Stack>
        ) : (
          <>
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
            <Box p="12px">
              <Button
                width="100%"
                height="32px"
                bg="whiteAlpha.100"
                color="white"
                borderRadius="full"
                fontSize="10pt"
                fontWeight={700}
                _hover={{ bg: "whiteAlpha.200" }}
              >
                View All
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Recommendations;
