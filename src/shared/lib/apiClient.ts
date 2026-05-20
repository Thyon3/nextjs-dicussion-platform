import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function getToken(): string | null {
  const cookieToken = Cookies.get('authToken');
  if (cookieToken) return cookieToken;

  if (typeof window !== 'undefined') {
    const localToken = localStorage.getItem('authToken');
    if (localToken) {
      setToken(localToken);
      localStorage.removeItem('authToken');
      return localToken;
    }
  }
  return null;
}

export function setToken(token: string): void {
  Cookies.set('authToken', token, { expires: 30, path: '/' });
}

export function clearToken(): void {
  Cookies.remove('authToken', { path: '/' });
}

export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const token = getToken();

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      (errorData as any).message || `Request failed with status ${response.status}`,
      errorData
    );
  }

  return response.json() as Promise<T>;
}
