import { apiClient } from '@/src/shared/lib/apiClient';

export async function createCommunity(communityName: string, communityType: string) {
  return apiClient('/communities/create', {
    method: 'POST',
    body: JSON.stringify({ communityName, communityType }),
  });
}

export async function getCommunities() {
  return apiClient<any[]>('/communities/all');
}

export async function getCommunityData(communityName: string) {
  return apiClient<any>(`/communities/${communityName}`);
}

export async function joinCommunity(communityId: string) {
  return apiClient('/communities/join', {
    method: 'POST',
    body: JSON.stringify({ communityId }),
  });
}

export async function leaveCommunity(communityId: string) {
  return apiClient('/communities/leave', {
    method: 'POST',
    body: JSON.stringify({ communityId }),
  });
}

export async function getCommunity(communityId: string) {
  return apiClient<any>(`/communities/${communityId}`);
}

export async function deleteCommunity(communityId: string) {
  return apiClient(`/communities/${communityId}`, {
    method: 'DELETE',
  });
}

export async function fetchCommunityAdmins(communityId: string) {
  return apiClient<any[]>(`/communities/${communityId}/admins`);
}

export async function fetchCommunityMembers(communityId: string) {
  return apiClient<any[]>(`/communities/${communityId}/members`);
}

export async function updateCommunityImage(communityId: string, imageURL: string) {
  return apiClient('/communities/updateImage', {
    method: 'POST',
    body: JSON.stringify({ communityId, imageURL }),
  });
}

export async function updateCommunityPrivacy(communityId: string, privacyType: string) {
  return apiClient('/communities/updatePrivacy', {
    method: 'POST',
    body: JSON.stringify({ communityId, isPrivate: privacyType === 'private' }),
  });
}

export async function getUserCommunities(userId: string) {
  return apiClient<any[]>(`/users/${userId}/communities`);
}
