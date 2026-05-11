/**
 * Unsaves a post for a user by calling the backend API
 * @param userId - The ID of the user
 * @param postId - The ID of the post to unsave
 * @returns Promise resolving to the response data
 */
export async function unsavePost(
  userId: string,
  postId: string
): Promise<{ message: string; data?: any }> {
  try {
    const response = await fetch('/api/posts/unsave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        postId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to unsave post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error unsaving post:', error);
    throw error;
  }
}
