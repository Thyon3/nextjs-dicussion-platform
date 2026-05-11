import { apiClient, setToken, clearToken } from '@/src/shared/lib/apiClient';
import type {
  LoginDTO,
  RegisterDTO,
  AuthResponseDTO,
  GetCurrentUserResponseDTO,
  AuthUser,
} from '../types';

// =========================================
// Auth API — All backend calls for auth
// =========================================

/**
 * POST /auth/register
 * Registers a new user and stores the JWT token.
 */
export async function registerUser(dto: RegisterDTO): Promise<AuthUser> {
  const response = await apiClient<AuthResponseDTO>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  setToken(response.token);
  return response.user;
}

/**
 * POST /auth/login
 * Authenticates a user and stores the JWT token.
 */
export async function loginUser(dto: LoginDTO): Promise<AuthUser> {
  const response = await apiClient<AuthResponseDTO>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  setToken(response.token);
  return response.user;
}

/**
 * GET /auth/me
 * Fetches the currently authenticated user using the stored JWT.
 * Returns null if no token exists or token is invalid.
 */
export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const response = await apiClient<GetCurrentUserResponseDTO>('/auth/me');
    return response.user;
  } catch {
    clearToken();
    return null;
  }
}

/**
 * Clears the stored JWT token (client-side logout).
 */
export function logoutUser(): void {
  clearToken();
}
