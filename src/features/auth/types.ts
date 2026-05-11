// =========================================
// Auth Feature — Domain Types
// =========================================

export interface CommunitySnippet {
  communityId: string;
  isAdmin?: boolean;
  imageURL?: string;
}

export interface PostVote {
  postId: string;
  communityId: string;
  voteValue: number;
}

export interface SavedPost {
  postId: string;
  communityId: string;
  postTitle: string;
  communityImageURL: string;
}

/** The authenticated user returned from the backend */
export interface AuthUser {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  communitySnippets: CommunitySnippet[];
  postVotes: PostVote[];
  savedPosts: SavedPost[];
}

// =========================================
// Auth DTOs (what we send/receive over HTTP)
// =========================================

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  displayName?: string;
}

export interface AuthResponseDTO {
  message: string;
  token: string;
  user: AuthUser;
}

export interface GetCurrentUserResponseDTO {
  message: string;
  user: AuthUser;
}

// =========================================
// Auth UI State Types
// =========================================

export type AuthModalView = 'login' | 'signup' | 'resetPassword';

export interface AuthModalState {
  open: boolean;
  view: AuthModalView;
}
