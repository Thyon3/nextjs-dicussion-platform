import { useState, useEffect, useCallback } from "react";
import { Comment } from "@/types/comment";
import { getComments, createComment as createCommentApi, deleteComment as deleteCommentApi } from "../api/commentApi";
import { useAuth } from "@/hooks/useAuth";
import useCustomToast from "@/hooks/useCustomToast";

const useComments = (postId: string, communityId: string, postTitle: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const { user } = useAuth();
  const showToast = useCustomToast();

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getComments(postId);
      setComments(data);
    } catch (error) {
      console.error("fetchComments error", error);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId, fetchComments]);

  const onCreateComment = async (text: string, parentId?: string, depth: number = 0) => {
    if (!user) {
      showToast({
        title: "Login Required",
        description: "Please login to comment",
        status: "error",
      });
      return;
    }

    setCreateLoading(true);
    try {
      const newComment = await createCommentApi({
        creatorDisplayText: user.displayName,
        communityId,
        postId,
        postTitle,
        text,
        parentId,
        depth,
      });

      setComments((prev) => [newComment, ...prev]);
      return true;
    } catch (error) {
      console.error("onCreateComment error", error);
      showToast({
        title: "Error",
        description: "Could not create comment",
        status: "error",
      });
      return false;
    } finally {
      setCreateLoading(false);
    }
  };

  const onDeleteComment = async (comment: Comment) => {
    try {
      await deleteCommentApi(comment.id);
      setComments((prev) => prev.filter((item) => item.id !== comment.id));
      return true;
    } catch (error) {
      console.error("onDeleteComment error", error);
      showToast({
        title: "Error",
        description: "Could not delete comment",
        status: "error",
      });
      return false;
    }
  };

  return {
    comments,
    loading,
    createLoading,
    onCreateComment,
    onDeleteComment,
  };
};

export default useComments;
