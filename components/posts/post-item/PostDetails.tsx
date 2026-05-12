import React from "react";
import { Stack, Image, Icon, Link, Text, Flex } from "@chakra-ui/react";
import { IoPeopleCircleOutline } from "react-icons/io5";
import moment from "moment";
import { Post } from "@/types/post";

type PostDetailsProps = {
  showCommunityImage?: boolean;
  post: Post;
};

/**
 * Renders post meta line with community icon, author, and relative time.
 * @param showCommunityImage - Whether to show community avatar/link.
 * @param post - Post data for metadata fields.
 * @returns Stack of metadata elements for a post card.
 */
const PostDetails: React.FC<PostDetailsProps> = ({
  showCommunityImage,
  post,
}) => {
  return (
    <Stack
      direction="row"
      gap={2}
      align="center"
      fontSize="9pt"
      width="100%"
      mb={1}
    >
      {showCommunityImage && (
        <Flex align="center">
          {post.communityImageURL ? (
            <Image
              borderRadius="full"
              boxSize="20px"
              src={post.communityImageURL}
              mr={2}
              alt="Community logo"
              fallbackSrc="https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png"
            />
          ) : (
            <Icon
              as={IoPeopleCircleOutline}
              mr={2}
              fontSize="16pt"
              color="#FF5722"
            />
          )}
          <Link href={`/community/${post.communityId}`}>
            <Text
              fontWeight={700}
              color="white"
              _hover={{ textDecoration: "underline" }}
              mr={1}
              onClick={(event) => event.stopPropagation()}
            >
              r/{post.communityId}
            </Text>
          </Link>
        </Flex>
      )}
      <Flex align="center" color="gray.500" gap={1}>
        <Text>•</Text>
        <Text>By {post.creatorUsername}</Text>
        <Text>•</Text>
        <Text>{moment(post.createTime).fromNow()}</Text>
      </Flex>
    </Stack>
  );
};

export default PostDetails;

