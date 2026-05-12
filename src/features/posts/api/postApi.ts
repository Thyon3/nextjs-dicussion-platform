import { apiClient } from '@/src/shared/lib/apiClient';
import { CreatePostDTO, Post } from '../types';

export async function uploadToCloudinary(file: File, resourceType: 'image' | 'video' = 'image'): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'discussion_platform');

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Upload failed');
  }

  const data = await response.json();
  return data.secure_url;
}

export async function createPost(dto: CreatePostDTO, file?: File): Promise<Post> {
  if (file) {
    const formData = new FormData();
    formData.append('communityId', dto.communityId || '');
    formData.append('communityImageURL', dto.communityImageURL || '');
    formData.append('username', dto.username);
    formData.append('postData', JSON.stringify(dto.postData));
    formData.append('file', file);

    return apiClient<Post>('/posts/create', {
      method: 'POST',
      body: formData,
    });
  }

  return apiClient<Post>('/posts/create', {
    method: 'POST',
    body: JSON.stringify(dto),
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
