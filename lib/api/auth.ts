/**
 * @deprecated
 * Direct API calls have been migrated to src/features/auth/api/authApi.ts
 * and src/shared/lib/apiClient.ts.
 *
 * This file re-exports for backward compatibility only.
 */
export {
  loginUser as login,
  registerUser as register,
  fetchCurrentUser as getCurrentUser,
  logoutUser as logout,
} from '@/src/features/auth/api/authApi';
