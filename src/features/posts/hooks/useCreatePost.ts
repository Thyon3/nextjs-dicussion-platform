import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/features/auth';
import { createPost } from '../api/postApi';
import { CreatePostDTO, PostType } from '../types';
import useCustomToast from '@/hooks/useCustomToast';

export const useCreatePost = (communityId?: string, communityImageURL?: string) => {
  const { user, openModal } = useAuth();
  const router = useRouter();
  const toast = useCustomToast();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitPost = async (
    title: string,
    postType: PostType,
    body?: string,
    file?: File,
    linkURL?: string
  ) => {
    if (!user) {
      openModal('login');
      return;
    }

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const dto: CreatePostDTO = {
        communityId: communityId || '',
        communityImageURL: communityImageURL || '',
        username: user.displayName || user.email.split('@')[0],
        postData: {
          title,
          body,
          postType,
          linkURL: postType === 'link' ? linkURL : undefined,
        },
      };

      const newPost = await createPost(dto, file);
      
      toast({
        title: 'Post created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      } as any);

      // Redirect to the community page where the post was created, or home if global
      if (communityId) {
        router.push(`/community/${communityId}`);
      } else {
        router.push('/');
      }
    } catch (err: any) {
      console.error('Error creating post:', err);
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return { submitPost, loading, error };
};
