'use client';

import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * AuthInitializer — mounts once at the app root.
 * Calls initAuth() to rehydrate the user session from the stored JWT.
 * Renders nothing — it's a side-effect-only component.
 */
const AuthInitializer: React.FC = () => {
  const { initAuth } = useAuth();

  useEffect(() => {
    initAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default AuthInitializer;
