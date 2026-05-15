import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AuthUser, AuthModalState, LoginDTO, RegisterDTO } from './types';
import { loginUser, registerUser, fetchCurrentUser, logoutUser } from './api/authApi';

// =========================================
// Auth Store — Zustand (global client state)
// =========================================

interface AuthState {
  // --- User state ---
  user: AuthUser | null;
  isLoadingUser: boolean;

  // --- Auth modal state ---
  modal: AuthModalState;

  // --- Actions ---
  initAuth: () => Promise<void>;
  login: (dto: LoginDTO) => Promise<void>;
  register: (dto: RegisterDTO) => Promise<void>;
  logout: () => void;
  openModal: (view?: AuthModalState['view']) => void;
  closeModal: () => void;
  setModalView: (view: AuthModalState['view']) => void;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isLoadingUser: true,
      modal: { open: false, view: 'login' },

      /**
       * Called once on app mount to rehydrate session from stored JWT.
       */
      initAuth: async () => {
        set({ isLoadingUser: true }, false, 'auth/initAuth');
        const user = await fetchCurrentUser();
        set({ user, isLoadingUser: false }, false, 'auth/initAuth/done');
      },

      /**
       * Logs in the user and updates global state.
       */
      login: async (dto: LoginDTO) => {
        const user = await loginUser(dto);
        set({ user, modal: { open: false, view: 'login' } }, false, 'auth/login');
      },

      /**
       * Registers the user and updates global state.
       */
      register: async (dto: RegisterDTO) => {
        const user = await registerUser(dto);
        set({ user, modal: { open: false, view: 'login' } }, false, 'auth/register');
      },

      /**
       * Logs out the user, clears token and state.
       */
      logout: () => {
        logoutUser();
        set({ user: null }, false, 'auth/logout');
      },

      openModal: (view = 'login') =>
        set({ modal: { open: true, view } }, false, 'auth/openModal'),

      closeModal: () =>
        set((s) => ({ modal: { ...s.modal, open: false } }), false, 'auth/closeModal'),

      setModalView: (view) =>
        set((s) => ({ modal: { ...s.modal, view } }), false, 'auth/setModalView'),

      setUser: (user) => set({ user }, false, 'auth/setUser'),
    }),
    { name: 'AuthStore' }
  )
);
