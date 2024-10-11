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
  const router = useRouter();

  return (
    <Flex
      direction="column"
      position="relative"
      bg={{ base: "white", _dark: "gray.800" }}
      borderRadius="lg"
      border="1px solid"
      borderColor={{ base: "gray.300", _dark: "gray.700" }}
      shadow="md"
    >
      <SuggestionsHeader />
      <Flex direction="column">
        {loading ? (
          <Stack mt={2} p={3}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <SkeletonCircle key={index} size="10px" />
              ))}
          </Stack>
        ) : (
          communities.map((item, index) => {
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
          })
        )}
      </Flex>
    </Flex>
  );
};

export default Recommendations;
