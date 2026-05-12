import React from "react";
import { Clipboard, Button, Icon, Stack, Text } from "@chakra-ui/react";
import { FiShare2 } from "react-icons/fi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { LuTrash } from "react-icons/lu";

interface PostActionsProps {
  handleDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  loadingDelete: boolean;
  userIsCreator: boolean;
  userIsAdmin: boolean;
  postLink: string;
  handleSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isSaved: boolean;
  showToast: (options: any) => void;
}

/**
 * Action bar for post cards with share, save, and delete controls.
 * @param handleDelete - Delete handler (stops propagation internally).
 * @param loadingDelete - Whether deletion is in progress.
 * @param userIsCreator - Flag to allow delete.
 * @param userIsAdmin - Flag to allow delete via moderation.
 * @param postLink - Canonical link used for sharing.
 * @param handleSave - Save/unsave handler.
 * @param isSaved - Whether post is saved by the viewer.
 * @param showToast - Toast helper to display copy feedback.
 * @returns Button stack for post interactions.
 */
import { FaRegCommentAlt } from "react-icons/fa";

const PostActions: React.FC<PostActionsProps> = ({
  handleDelete,
  loadingDelete,
  userIsCreator,
  userIsAdmin,
  postLink,
  handleSave,
  isSaved,
  showToast,
}) => (
  <Stack
    ml={1}
    mb={1}
    color="gray.500"
    fontWeight={700}
    direction="row"
    gap={1}
    p={2}
  >
    <Button
      variant="ghost"
      height="32px"
      borderRadius="md"
      _hover={{ bg: "whiteAlpha.100", color: "white" }}
      gap={2}
      px={3}
    >
      <Icon as={FaRegCommentAlt} fontSize={16} />
      <Text fontSize="9pt">Comments</Text>
    </Button>

    <Clipboard.Root
      value={postLink}
      onStatusChange={(details: any) => {
        if (details.copied) {
          showToast({
            title: "Link Copied",
            description: "Link to the post has been saved to your clipboard",
            status: "info",
          });
        }
      }}
    >
      <Button
        as={Clipboard.Trigger as any}
        variant="ghost"
        height="32px"
        borderRadius="md"
        _hover={{ bg: "whiteAlpha.100", color: "white" }}
        gap={2}
        px={3}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.stopPropagation();
        }}
      >
        <Icon as={FiShare2} fontSize={18} />
        <Text fontSize="9pt">Share</Text>
      </Button>
    </Clipboard.Root>

    <Button
      variant="ghost"
      height="32px"
      borderRadius="md"
      _hover={{ bg: "whiteAlpha.100", color: "white" }}
      gap={2}
      px={3}
      onClick={handleSave}
    >
      <Icon
        as={isSaved ? BsBookmarkFill : BsBookmark}
        fontSize={18}
        color={isSaved ? "#FF8A65" : "inherit"}
      />
      <Text fontSize="9pt" color={isSaved ? "#FF8A65" : "inherit"}>
        {isSaved ? "Saved" : "Save"}
      </Text>
    </Button>

    {(userIsCreator || userIsAdmin) && (
      <Button
        variant="ghost"
        height="32px"
        borderRadius="md"
        _hover={{ bg: "red.900", color: "red.200" }}
        gap={2}
        px={3}
        onClick={handleDelete}
        loading={loadingDelete}
      >
        <Icon as={LuTrash} fontSize={18} />
        <Text fontSize="9pt">Delete</Text>
      </Button>
    )}
  </Stack>
);

export default PostActions;
