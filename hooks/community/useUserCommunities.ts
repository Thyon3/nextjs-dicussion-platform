'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../useAuth';
import { apiClient } from '@/lib/api/client';

export interface CommunitySnippet {
  communityId: string;
  isAdmin?: boolean;
  imageURL?: string;
}

/**
 * Fetches the list of communities the current user has joined.
 * Uses the user's MongoDB _id from the auth state to call GET /api/users/:userId/communities.
 */
const useUserCommunities = () => {
  const { user } = useAuth();
  const [joinedCommunities, setJoinedCommunities] = useState<CommunitySnippet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.id) {
      setJoinedCommunities([]);
      return;
    }

    const fetchJoinedCommunities = async () => {
      setLoading(true);
      try {
        const data = await apiClient<CommunitySnippet[]>(`/users/${user.id}/communities`);
        setJoinedCommunities(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load communities');
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedCommunities();
  }, [user?.id]);

  return { joinedCommunities, loading, error };
};

export default useUserCommunities;
