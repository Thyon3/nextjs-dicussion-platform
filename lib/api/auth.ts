import { apiClient } from './client';

export const register = async (userData: any) => {
  const response = await apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  if (response.token) {
    localStorage.setItem('token', response.token);
  }
  return response;
};

export const login = async (userData: any) => {
  const response = await apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  if (response.token) {
    localStorage.setItem('token', response.token);
  }
  return response;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const response = await apiClient('/auth/me', { // Corrected endpoint to /auth/me to match convention or /users/me
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.user;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

