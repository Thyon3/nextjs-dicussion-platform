import { SavedPost } from "@/types/savedPost";

/**
 * Saves a post for a user by calling the backend API
 * @param userId - The ID of the user
 * @param postId - The ID of the post to save
 * @param communityId - The ID of the community
 * @param postTitle - The title of the post
 * @param communityImageURL - The image URL of the community
 * @returns Promise resolving to the response data
 */
export async function savePost(
  userId: string,
  postId: string,
  communityId: string,
  postTitle: string,
  communityImageURL: string
): Promise<{ message: string; data?: any }> {
  try {
    const response = await fetch('/api/posts/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        postId,
        communityId,
        postTitle,
        communityImageURL,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
}
