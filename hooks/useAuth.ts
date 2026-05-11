/**
 * @deprecated
 * This hook has been migrated to the auth feature.
 * Import from '@/src/features/auth' instead:
 *
 *   import { useAuth } from '@/src/features/auth';
 *
 * This file is kept for backward compatibility with components
 * that have not yet been migrated to the new feature-based structure.
 */

export { useAuth, useAuthModal } from '@/src/features/auth';

// Legacy compat: replicate useAuthState for any components still using it
import { useAuthStore } from '@/src/features/auth';
export const useAuthState = () => {
  const user = useAuthStore((s) => s.user);
  const isLoadingUser = useAuthStore((s) => s.isLoadingUser);
  return [user, isLoadingUser] as const;
};
