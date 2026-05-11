import { SavedPost } from "@/types/savedPost";

/**
 * Fetches saved posts for a user from the backend API
 * @param userId - The ID of the user
 * @returns Promise resolving to an array of saved posts
 */
export async function getSavedPosts(userId: string): Promise<SavedPost[]> {
  try {
    const response = await fetch(`/api/users/saved/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch saved posts');
    }

    const data = await response.json();
    return data.savedPosts || [];
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    return [];
  }
}
