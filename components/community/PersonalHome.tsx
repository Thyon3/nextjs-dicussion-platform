import useCallCreatePost from "@/hooks/posts/useCallCreatePost";
import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import CreateCommunityModal from "../modal/create-community/CreateCommunityModal";

/**
 * A sidebar card that provides quick actions for the user's personal home feed.
 * Allows users to initiate post creation or open the community creation modal.
 * @returns A themed card with action buttons for home feed management.
 */
const PersonalHome: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { onClick } = useCallCreatePost();

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Flex
        direction="column"
        bg="#1A1D23"
        borderRadius={12}
        border="1px solid"
        borderColor="whiteAlpha.100"
        position="sticky"
        top="60px"
      >
        <Flex
          align="center"
          p="12px 16px"
          bgGradient="linear(to-r, #FF8A65, #FF5722)"
          height="50px"
          borderRadius="12px 12px 0px 0px"
        >
          <Flex 
            bg="whiteAlpha.200" 
            p={2} 
            borderRadius="lg" 
            mr={3}
            border="1px solid"
            borderColor="whiteAlpha.300"
          >
            <Icon as={AiFillHome} color="white" fontSize={20} />
          </Flex>
          <Text fontWeight={700} color="white" fontSize="14pt">
            Home
          </Text>
        </Flex>
        
        <Flex direction="column" p="16px">
          <Text fontSize="10pt" color="gray.400" mb={6}>
            Home page personalized based on your subscribed communities. Circus represents a shift back to intentional spaces.
          </Text>
          
          <Stack gap={3}>
            <Button 
              height="38px" 
              bg="white" 
              color="black"
              _hover={{ bg: "gray.200" }}
              fontWeight={700}
              borderRadius="full"
              onClick={onClick}
            >
              Create Post
            </Button>
            <Button
              variant="outline"
              height="38px"
              color="white"
              borderColor="whiteAlpha.300"
              _hover={{ bg: "whiteAlpha.100" }}
              fontWeight={700}
              borderRadius="full"
              onClick={() => setOpen(true)}
            >
              Create Community
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};

export default PersonalHome;
