/* eslint-disable react-hooks/exhaustive-deps */
import { authModalStateAtom } from "@/atoms/authModalAtom";
import { useSetAtom } from "jotai";
import useCustomToast from "../useCustomToast";
import React from "react";
import { Post, PostVote } from "@/types/post";
import { votePost, getPostById } from "@/lib/api/posts";
import { useAuth } from "../useAuth";

type SetPostState = React.Dispatch<
  React.SetStateAction<{
    selectedPost: Post | null;
    posts: Post[];
    postVotes: PostVote[];
  }>
>;

/**
 * A custom hook that manages voting logic for posts.
 * It processes upvotes and downvotes, and synchronizes local post state with backend voting results.
 */
const usePostVote = (
  postStateValue: {
    selectedPost: Post | null;
    posts: Post[];
    postVotes: PostVote[];
  },
  setPostStateValue: SetPostState
) => {
  const { user } = useAuth();
  const setAuthModalState = useSetAtom(authModalStateAtom);
  const showToast = useCustomToast();

  const onVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => {
    event.stopPropagation();

    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    try {
      const { voteChange, updatedVote } = await votePost({
        userId: user.id,
        postId: post.id!,
        voteValue: vote,
        communityId,
      });

      // Update local state
      const updatedPost = { ...post, voteStatus: post.voteStatus + voteChange };
      const updatedPosts = [...postStateValue.posts];
      const postIndex = postStateValue.posts.findIndex((p) => p.id === post.id);
      
      if (postIndex !== -1) {
        updatedPosts[postIndex] = updatedPost;
      }

      let updatedPostVotes = [...postStateValue.postVotes];
      const voteIndex = updatedPostVotes.findIndex((v) => v.postId === post.id);

      if (updatedVote) {
        if (voteIndex !== -1) {
          updatedPostVotes[voteIndex] = updatedVote;
        } else {
          updatedPostVotes.push(updatedVote);
        }
      } else {
        // Vote was removed
        if (voteIndex !== -1) {
          updatedPostVotes.splice(voteIndex, 1);
        }
      }

      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
        selectedPost: prev.selectedPost?.id === post.id ? updatedPost : prev.selectedPost,
      }));

    } catch (error: any) {
      console.log("Error: onVote", error);
      showToast({
        title: "Could not Vote",
        description: error.message || "There was an error voting on post",
        status: "error",
      });
    }
  };

  const getPost = async (postId: string) => {
    try {
      const response = await getPostById(postId);
      if (response.post) {
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: response.post,
        }));
        return response.post;
      }
      return null;
    } catch (error) {
      console.log("Error: getPost", error);
      return null;
    }
  };

  return { onVote, getPost };
};

export default usePostVote;

