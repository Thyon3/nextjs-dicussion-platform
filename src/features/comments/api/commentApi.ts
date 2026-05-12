import { apiClient } from "@/src/shared/lib/apiClient";
import { Comment } from "@/types/comment";

export const getComments = async (postId: string): Promise<Comment[]> => {
  const response = await apiClient<Comment[]>(`/comments/${postId}`);
  return response;
};

export const createComment = async (data: {
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  parentId?: string;
  depth?: number;
}): Promise<Comment> => {
  const response = await apiClient<Comment>("/comments/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const deleteComment = async (commentId: string): Promise<{ message: string }> => {
  const response = await apiClient<{ message: string }>(`/comments/${commentId}`, {
    method: "DELETE",
  });
  return response;
};
