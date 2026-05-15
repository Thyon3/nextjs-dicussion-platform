import { apiClient } from '@/src/shared/lib/apiClient';
import { AuthUser } from '../types';

export async function updateProfileImage(file: File): Promise<AuthUser> {
  const formData = new FormData();
  formData.append('image', file);

  return apiClient<AuthUser>('/users/updateImage', {
    method: 'POST',
    body: formData,
  });
}

export async function updateDisplayName(newDisplayName: string): Promise<AuthUser> {
  return apiClient<AuthUser>('/users/updateDisplayName', {
    method: 'POST',
    body: JSON.stringify({ newDisplayName }),
  });
}

export async function updateUserSettings(settings: Partial<AuthUser['settings']>): Promise<AuthUser> {
  return apiClient<AuthUser>('/users/updateSettings', {
    method: 'POST',
    body: JSON.stringify({ settings }),
  });
}
