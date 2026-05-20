import { apiClient } from './client';

export const createCommunity = (communityName: string, communityType: string, userId: string) => {
  return apiClient('/communities/create', {
    method: 'POST',
    body: JSON.stringify({ communityName, communityType, userId }),
  });
};

export const getCommunities = (search?: string) => {
  const url = search ? `/communities/all?search=${encodeURIComponent(search)}` : '/communities/all';
  return apiClient(url);
};

export const getCommunityData = (communityName: string) => {
  return apiClient(`/communities/${encodeURIComponent(communityName)}`);
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
  return apiClient(`/communities/${encodeURIComponent(communityId)}`);
};

export const deleteCommunity = (communityId: string) => {
  return apiClient(`/communities/${encodeURIComponent(communityId)}`, {
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

export const updateCommunityProfile = (
  communityId: string, 
  description?: string, 
  imageFileString?: string, 
  bannerFileString?: string,
  deleteImage?: boolean,
  deleteBanner?: boolean
) => {
  const formData = new FormData();
  formData.append('communityId', communityId);
  if (description !== undefined) {
    formData.append('description', description);
  }
  if (deleteImage !== undefined) {
    formData.append('deleteImage', String(deleteImage));
  }
  if (deleteBanner !== undefined) {
    formData.append('deleteBanner', String(deleteBanner));
  }

  const appendFileFromB64 = (b64String: string, fieldName: string) => {
    const arr = b64String.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], `upload_${fieldName}.png`, { type: mime });
    formData.append(fieldName, file);
  };

  if (imageFileString && imageFileString.startsWith('data:')) {
    appendFileFromB64(imageFileString, 'image');
  }
  if (bannerFileString && bannerFileString.startsWith('data:')) {
    appendFileFromB64(bannerFileString, 'banner');
  }

  return apiClient('/communities/updateProfile', {
    method: 'POST',
    body: formData,
  });
};

export const updateCommunityPrivacy = (communityId: string, privacyType: string) => {
  return apiClient('/communities/updatePrivacy', {
    method: 'POST',
    body: JSON.stringify({ communityId, isPrivate: privacyType === 'private' }),
  });
};



