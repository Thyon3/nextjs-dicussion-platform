// =========================================
// Auth Feature — Public API
// =========================================
// Import from here, never from deep sub-paths.
//
// Usage:
//   import { useAuth, AuthModal } from '@/src/features/auth';

// Hooks
export { useAuth, useAuthModal } from './hooks/useAuth';

// Store (for advanced use cases)
export { useAuthStore } from './store';

// Components
export { default as AuthModal } from './components/AuthModal';
export { default as AuthInitializer } from './components/AuthInitializer';
export { default as LoginForm } from './components/LoginForm';
export { default as RegisterForm } from './components/RegisterForm';
export { default as ResetPassword } from './components/ResetPassword';

// Types
export type {
  AuthUser,
  LoginDTO,
  RegisterDTO,
  AuthModalState,
  AuthModalView,
  CommunitySnippet,
  PostVote,
  SavedPost,
} from './types';

// Validators
export { loginSchema, registerSchema } from './validators';
export type { LoginFormValues, RegisterFormValues } from './validators';
