import React from "react";
import { Community } from "@/types/community";
import { Flex, Icon, Image, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import { IoPeopleCircleOutline } from "react-icons/io5";

type RecommendationRowProps = {
  item: Community;
  index: number;
  isJoined: boolean;
  onJoinOrLeaveCommunity: (community: Community, isJoined: boolean) => void;
};

/**
 * Single recommendation row showing rank, avatar, and join/leave action.
 * @param item - Community to render.
 * @param index - Position in recommendation list for ranking.
 * @param isJoined - Whether the user is subscribed to the community.
 * @param onJoinOrLeaveCommunity - Callback to toggle membership.
 * @returns Link-wrapped row with action button.
 */
const RecommendationRow: React.FC<RecommendationRowProps> = ({
  item,
  index,
  isJoined,
  onJoinOrLeaveCommunity,
}) => {
  return (
    <Link key={item.id} href={`/community/${item.id}`}>
      <Flex
        align="center"
        fontSize="10pt"
        p="8px 16px"
        _hover={{ bg: "whiteAlpha.50" }}
        transition="all 0.2s"
      >
        <Flex align="center" gap={3} minWidth={0} flex={1}>
          <Text 
            fontWeight={700} 
            color="gray.500" 
            width="14px"
          >
            {index + 1}
          </Text>
          
          <Flex align="center" minWidth={0} gap={3}>
            {item.imageURL ? (
              <Image
                src={item.imageURL}
                borderRadius="full"
                boxSize="32px"
                alt="Community Icon"
                fallbackSrc="https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png"
              />
            ) : (
              <Icon
                as={IoPeopleCircleOutline}
                fontSize="24pt"
                color="#FF5722"
              />
            )}
            <Flex direction="column" minWidth={0}>
              <Text
                fontWeight={700}
                color="white"
                fontSize="10pt"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {item.id}
              </Text>
              <Text fontSize="8pt" color="gray.500">
                {item.numberOfMembers || 0} members
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Button
          height="30px"
          fontSize="9pt"
          px={6}
          bg={isJoined ? "transparent" : "white"}
          color={isJoined ? "white" : "black"}
          border={isJoined ? "1px solid" : "none"}
          borderColor={isJoined ? "whiteAlpha.300" : "transparent"}
          borderRadius="full"
          fontWeight={700}
          _hover={{ 
            bg: isJoined ? "whiteAlpha.100" : "gray.200",
            borderColor: isJoined ? "whiteAlpha.500" : "transparent"
          }}
          onClick={(event) => {
            event.preventDefault();
            onJoinOrLeaveCommunity(item, isJoined);
          }}
        >
          {isJoined ? "Joined" : "Join"}
        </Button>
      </Flex>
    </Link>
  );
};

export default RecommendationRow;
