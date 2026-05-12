import { Post } from "@/types/post";
import useCustomToast from "@/hooks/useCustomToast";
import useSavedPosts from "@/hooks/posts/useSavedPosts";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PostItemError from "../../ui/ErrorMessage";
import VoteSection from "./VoteSection";
import PostDetails from "./PostDetails";
import PostTitle from "./PostTitle";
import PostBody from "./PostBody";
import PostActions from "./PostActions";
import ConfirmationDialog from "@/components/modal/ConfirmationDialog";

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
  onSelectPost?: (post: Post) => void;
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
  showCommunityImage,
  votingDisabled,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [error, setError] = useState(false);
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
      const success: boolean = await onDeletePost(post);

      if (!success) {
        throw new Error("Post could not be deleted");
      }

      showToast({
        title: "Post Deleted",
        description: "Your post has been deleted",
        status: "success",
      });
      if (singlePostPage) {
        if (post.communityId) {
          router.push(`/community/${post.communityId}`);
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      setError(error.message);
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
    if (typeof window === 'undefined') return '';
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    return `${baseUrl}/community/${post.communityId}/comments/${post.id}`;
  };

  const handleSave = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    await onSavePost(post);
  };

  return (
    <div
      className={`flex bg-[#1A1D23] border border-white/10 rounded-[12px] transition-all hover:border-white/30 ${
        singlePostPage ? "cursor-default" : "cursor-pointer"
      }`}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      {/* Left Section: Voting */}
      <div className="flex flex-col items-center p-3 w-[48px] rounded-l-[12px]">
        <VoteSection
          userVoteValue={userVoteValue}
          onVote={onVote}
          post={post}
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col w-full min-w-0">
        <div className="flex flex-col gap-1 p-3">
          <PostDetails showCommunityImage={true} post={post} />
          <PostTitle post={post} />
          <PostBody
            post={post}
            loadingImage={loadingImage}
            setLoadingImage={setLoadingImage}
          />
        </div>
        <PostActions
          handleDelete={handleDeleteClick}
          loadingDelete={loadingDelete}
          userIsCreator={userIsCreator}
          userIsAdmin={userIsAdmin}
          postLink={getPostLink()}
          handleSave={handleSave}
          isSaved={isSaved}
          showToast={showToast}
        />
        <PostItemError
          error={error}
          message={"There was an error when loading this post"}
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
      </div>
    </div>
  );
};

export default PostItem;
