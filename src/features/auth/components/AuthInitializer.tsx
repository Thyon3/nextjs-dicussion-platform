'use client';

import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSetAtom } from 'jotai';
import { communityStateAtom, defaultCommunityState } from '@/atoms/communitiesAtom';

/**
 * AuthInitializer — mounts once at the app root.
 * Calls initAuth() to rehydrate the user session from the stored JWT.
 * Syncs the Jotai communityStateAtom with the authenticated user's snippets.
 */
const AuthInitializer: React.FC = () => {
  const { initAuth, user } = useAuth();
  const setCommunityState = useSetAtom(communityStateAtom);

  useEffect(() => {
    initAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      setCommunityState((prev) => ({
        ...prev,
        mySnippets: user.communitySnippets || [],
        snippetFetched: true,
      }));
    } else {
      setCommunityState(defaultCommunityState);
    }
  }, [user, setCommunityState]);

  return null;
};

export default AuthInitializer;
