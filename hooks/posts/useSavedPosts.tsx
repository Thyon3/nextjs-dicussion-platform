import { authModalStateAtom } from "@/atoms/authModalAtom";
import { savedPostStateAtom } from "@/atoms/savedPostsAtom";
import { Post } from "@/types/post";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import useCustomToast from "../useCustomToast";
import { savePost, unsavePost } from "@/lib/api/posts";
import { useAuth } from "../useAuth";

/**
 * A custom hook that manages user's saved posts.
 * It provides functionality for toggling saved status of a post,
 * and removing posts from saved collection.
 * @returns An object containing saved posts state, loading state, and associated handlers.
 */
const useSavedPosts = () => {
  const { user } = useAuth();
  const [savedPostState, setSavedPostState] = useAtom(savedPostStateAtom);
  const setAuthModalState = useSetAtom(authModalStateAtom);
  const [loading, setLoading] = useState(false);
  const showToast = useCustomToast();

  const onSavePost = async (post: Post) => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    try {
      const isSaved = savedPostState.savedPosts.find(
        (item) => item.postId === post.id
      );

      if (isSaved) {
        await unsavePost({
          userId: user.id,
          postId: post.id!,
        });
        setSavedPostState((prev) => ({
          ...prev,
          savedPosts: prev.savedPosts.filter((item) => item.postId !== post.id),
        }));
        showToast({
          title: "Post removed from saved",
          status: "success",
        });
      } else {
        await savePost({
          userId: user.id,
          postId: post.id!,
          communityId: post.communityId,
          postTitle: post.title,
          communityImageURL: post.communityImageURL || "",
        });
        
        const newSavedPost = {
          postId: post.id!,
          communityId: post.communityId,
          postTitle: post.title,
          communityImageURL: post.communityImageURL || "",
        };

        setSavedPostState((prev) => ({
          ...prev,
          savedPosts: [...prev.savedPosts, newSavedPost],
        }));
        showToast({
          title: "Post saved",
          status: "success",
        });
      }
    } catch (error: any) {
      console.log("onSavePost error", error);
      showToast({
        title: "Error saving post",
        description: error.message,
        status: "error",
      });
    }
  };

  const onRemoveSavedPost = async (postId: string) => {
    if (!user) return;
    try {
      await unsavePost({
        userId: user.id,
        postId,
      });
      setSavedPostState((prev) => ({
        ...prev,
        savedPosts: prev.savedPosts.filter((item) => item.postId !== postId),
      }));
      showToast({
        title: "Post removed from saved",
        status: "success",
      });
    } catch (error: any) {
      console.log("onRemoveSavedPost error", error);
      showToast({
        title: "Error removing saved post",
        description: error.message,
        status: "error",
      });
    }
  };

  const isPostSaved = (postId: string) => {
    return !!savedPostState.savedPosts.find((item) => item.postId === postId);
  };

  return {
    savedPostState,
    setSavedPostState,
    onSavePost,
    onRemoveSavedPost,
    isPostSaved,
    loading,
  };
};

export default useSavedPosts;

