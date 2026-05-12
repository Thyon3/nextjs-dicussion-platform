import React from "react";
import { Text, Flex, Skeleton, Image } from "@chakra-ui/react";
import { Post } from "@/types/post";

type PostBodyProps = {
  post: Post;
  loadingImage: boolean;
  setLoadingImage: (value: React.SetStateAction<boolean>) => void;
};

/**
 * Renders post body preview and optional image with skeleton fallback.
 * @param post - Post content to show.
 * @param loadingImage - Whether image is still loading.
 * @param setLoadingImage - Setter triggered on image load.
 * @returns Text excerpt and image block.
 */
const PostBody: React.FC<PostBodyProps> = ({
  post,
  loadingImage,
  setLoadingImage,
}) => {
  return (
    <>
      {post.body && (
        <Text fontSize="11pt" color="gray.300" lineHeight="tall" mt={1}>
          {post.body.split(" ").slice(0, 50).join(" ")}
          {post.body.split(" ").length > 50 && "..."}
        </Text>
      )}
      {post.imageURL && (
        <Flex justify="center" align="center" mt={3}>
          {loadingImage && (
            <Skeleton height="300px" width="100%" borderRadius={12} />
          )}
          <Image
            src={post.imageURL}
            alt="Post image"
            maxHeight="500px"
            maxWidth="100%"
            borderRadius={12}
            border="1px solid"
            borderColor="whiteAlpha.100"
            display={loadingImage ? "none" : "unset"}
            onLoad={() => setLoadingImage(false)}
          />
        </Flex>
      )}
      {post.videoURL && (
        <Flex justify="center" align="center" mt={3}>
          <video 
            src={post.videoURL} 
            controls 
            style={{ 
              maxHeight: '500px', 
              maxWidth: '100%', 
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }} 
          />
        </Flex>
      )}
      {post.linkURL && (
        <Flex mt={3} p={2} bg="whiteAlpha.50" borderRadius="md" border="1px solid" borderColor="whiteAlpha.100">
          <Text as="a" href={post.linkURL} target="_blank" color="#FF8A65" fontSize="10pt" fontWeight={600} _hover={{ textDecoration: 'underline' }}>
            {post.linkURL}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default PostBody;
