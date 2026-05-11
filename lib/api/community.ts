import { apiClient } from './client';

export const createCommunity = (communityName: string, communityType: string, userId: string) => {
  return apiClient('/communities/create', {
    method: 'POST',
    body: JSON.stringify({ communityName, communityType, userId }),
  });
};

export const getCommunities = () => {
  return apiClient('/communities/all');
};

export const getCommunityData = (communityName: string) => {
  return apiClient(`/communities/${communityName}`);
};

export const joinCommunity = (userId: string, communityId: string, imageURL: string, isAdmin: boolean) => {
  return apiClient('/communities/join', {
    method: 'POST',
    body: JSON.stringify({ communityId, userId, imageURL, isAdmin }),
  });
};

export const leaveCommunity = (userId: string, communityId: string) => {
  return apiClient('/communities/leave', {
    method: 'POST',
    body: JSON.stringify({ communityId, userId }),
  });
};

export const getCommunity = (communityId: string) => {
  return apiClient(`/communities/${communityId}`);
};

export const deleteCommunity = (communityId: string) => {
  return apiClient(`/communities/${communityId}`, {
    method: 'DELETE',
  });
};

export const fetchCommunityAdmins = (communityId: string) => {
  return apiClient(`/communities/${communityId}/admins`);
};

export const fetchCommunityMembers = (communityId: string) => {
  return apiClient(`/communities/${communityId}/members`);
};

export const updateCommunityImage = (communityId: string, imageURL: string) => {
  return apiClient('/communities/updateImage', {
    method: 'POST',
    body: JSON.stringify({ communityId, imageURL }),
  });
};

export const updateCommunityPrivacy = (communityId: string, privacyType: string) => {
  return apiClient('/communities/updatePrivacy', {
    method: 'POST',
    body: JSON.stringify({ communityId, isPrivate: privacyType === 'private' }),
  });
};



