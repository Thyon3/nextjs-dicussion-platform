import { apiClient } from './client';

export const createPost = (postData: any) => {
  return apiClient('/posts/create', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
};

export const getPosts = (communityId?: string) => {
  const query = communityId ? `?communityId=${communityId}` : '';
  return apiClient(`/posts/all${query}`);
};

export const getPostById = (postId: string) => {
  return apiClient(`/posts/${postId}`);
};

export const deletePost = (postId: string) => {
  return apiClient(`/posts/${postId}`, {
    method: 'DELETE',
  });
};

export const votePost = (voteData: any) => {
  return apiClient('/posts/vote', {
    method: 'POST',
    body: JSON.stringify(voteData),
  });
};

export const savePost = (saveData: any) => {
  return apiClient('/posts/save', {
    method: 'POST',
    body: JSON.stringify(saveData),
  });
};

export const unsavePost = (unsaveData: any) => {
  return apiClient('/posts/unsave', {
    method: 'POST',
    body: JSON.stringify(unsaveData),
  });
};

export const getSavedPosts = (userId: string) => {
  return apiClient(`/posts/saved/${userId}`);
};

export const getPostVotes = (userId: string) => {
  return apiClient(`/posts/votes/${userId}`);
};

export const getCommunityPostVotes = (userId: string, communityId: string) => {
  return apiClient(`/posts/votes/${userId}/${communityId}`);
};
