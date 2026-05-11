import { apiClient } from '@/src/shared/lib/apiClient';

export async function createPost(postData: any) {
  return apiClient('/posts/create', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
}

export async function getPosts(communityId?: string) {
  const query = communityId ? `?communityId=${communityId}` : '';
  return apiClient<any[]>(`/posts/all${query}`);
}

export async function getPostById(postId: string) {
  return apiClient<any>(`/posts/${postId}`);
}

export async function deletePost(postId: string) {
  return apiClient(`/posts/${postId}`, {
    method: 'DELETE',
  });
}

export async function votePost(voteData: any) {
  return apiClient<any>('/posts/vote', {
    method: 'POST',
    body: JSON.stringify(voteData),
  });
}

export async function savePost(saveData: any) {
  return apiClient('/posts/save', {
    method: 'POST',
    body: JSON.stringify(saveData),
  });
}

export async function unsavePost(unsaveData: any) {
  return apiClient('/posts/unsave', {
    method: 'POST',
    body: JSON.stringify(unsaveData),
  });
}

export async function getSavedPosts(userId: string) {
  return apiClient<any[]>(`/posts/saved/${userId}`);
}

export async function getPostVotes(userId: string) {
  return apiClient<any[]>(`/posts/votes/${userId}`);
}

export async function getCommunityPostVotes(userId: string, communityId: string) {
  return apiClient<any[]>(`/posts/votes/${userId}/${communityId}`);
}
