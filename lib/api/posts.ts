import { apiClient } from './client';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getToken(): string | null {
  const cookieToken = Cookies.get('authToken');
  if (cookieToken) return cookieToken;
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

export const createPost = async (postData: any) => {
  if (postData.selectedFile) {
    const formData = new FormData();
    formData.append('communityId', postData.communityId);
    formData.append('communityImageURL', postData.communityImageURL || '');
    formData.append('username', postData.username);
    formData.append('postData', JSON.stringify(postData.postData));
    
    // Convert base64 or Data URI back to File/Blob if necessary, 
    // or assume selectedFile is already a File object.
    // In original code, selectedFile was a string (Data URI)
    if (typeof postData.selectedFile === 'string' && postData.selectedFile.startsWith('data:')) {
      const arr = postData.selectedFile.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], 'upload.png', { type: mime });
      formData.append('file', file);
    } else if (postData.selectedFile instanceof File || postData.selectedFile instanceof Blob) {
      formData.append('file', postData.selectedFile);
    }

    const token = getToken();
    const headers: any = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/posts/create`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
  }

  // Fallback to regular json request if no file
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
