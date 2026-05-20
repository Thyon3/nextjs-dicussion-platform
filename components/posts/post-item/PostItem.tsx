import { Post } from "@/types/post";
import useCustomToast from "@/hooks/useCustomToast";
import useSavedPosts from "@/hooks/posts/useSavedPosts";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ConfirmationDialog from "@/components/modal/ConfirmationDialog";
import PostCard from "./PostCard";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userIsAdmin?: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<any, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post, scrollToComments?: boolean) => void;
  showCommunityImage?: boolean;
  votingDisabled?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userIsAdmin = false,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const router = useRouter();
  const showToast = useCustomToast();
  const { onSavePost, isPostSaved } = useSavedPosts();
  const isSaved = isPostSaved(post.id!);
  const singlePostPage = !onSelectPost;

  const handleDeleteClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setDeleteConfirmationOpen(true);
  };

  const onConfirmDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);
      if (!success) throw new Error("Post could not be deleted");
      showToast({
        title: "Post Deleted",
        description: "Your post has been deleted",
        status: "success",
      });
      if (singlePostPage) {
        router.push(post.communityId ? `/community/${post.communityId}` : "/");
      }
    } catch (error: any) {
      showToast({
        title: "Post not Deleted",
        description: "There was an error deleting your post",
        status: "error",
      });
    } finally {
      setLoadingDelete(false);
      setDeleteConfirmationOpen(false);
    }
  };

  const getPostLink = () => {
    if (typeof window === "undefined") return "";
    return `${window.location.protocol}//${window.location.host}/community/${post.communityId}/comments/${post.id}`;
  };

  const handleSave = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    await onSavePost(post);
  };

  const handleShare = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard.writeText(getPostLink());
    showToast({
      title: "Link Copied",
      description: "Post link copied to clipboard",
      status: "info",
    });
  };

  return (
    <>
      <PostCard
        post={post}
        userIsCreator={userIsCreator}
        userIsAdmin={userIsAdmin}
        userVoteValue={userVoteValue}
        isSaved={isSaved}
        singlePostPage={singlePostPage}
        loadingImage={loadingImage}
        loadingDelete={loadingDelete}
        onVote={onVote}
        onSelectPost={onSelectPost}
        onSave={handleSave}
        onDelete={handleDeleteClick}
        onShare={handleShare}
        setLoadingImage={setLoadingImage}
      />

      <ConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={onConfirmDelete}
        title="Delete Post"
        body="Are you sure you want to delete this post? This action cannot be undone."
        confirmButtonText="Delete"
        isLoading={loadingDelete}
      />
    </>
  );
};

export default PostItem;
