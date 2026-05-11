import { useAuthStore } from '../store';

// =========================================
// useAuth — Convenience hook for auth state
// =========================================

/**
 * Primary hook for consuming auth state and actions.
 * Returns the current user, loading state, auth actions, and modal controls.
 *
 * Usage:
 *   const { user, login, logout, openModal } = useAuth();
 */
export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isLoadingUser = useAuthStore((s) => s.isLoadingUser);
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const logout = useAuthStore((s) => s.logout);
  const initAuth = useAuthStore((s) => s.initAuth);
  const openModal = useAuthStore((s) => s.openModal);
  const closeModal = useAuthStore((s) => s.closeModal);

  return {
    user,
    isLoadingUser,
    loading: isLoadingUser, // legacy alias
    isAuthenticated: !!user,
    login,
    register,
    logout,
    initAuth,
    checkAuth: initAuth, // legacy alias
    openModal,
    closeModal,
  };
}

// =========================================
// useAuthModal — Convenience hook for modal state
// =========================================

export function useAuthModal() {
  const modal = useAuthStore((s) => s.modal);
  const openModal = useAuthStore((s) => s.openModal);
  const closeModal = useAuthStore((s) => s.closeModal);
  const setModalView = useAuthStore((s) => s.setModalView);

  return { modal, openModal, closeModal, setModalView };
}
