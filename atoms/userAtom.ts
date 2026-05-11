import { atom } from "jotai";

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

export interface User {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  communitySnippets: CommunitySnippet[];
  postVotes: PostVote[];
  savedPosts: SavedPost[];
}

export interface UserState {
  user: User | null;
  loading: boolean;
}

const defaultUserState: UserState = {
  user: null,
  loading: true,
};

export const userStateAtom = atom<UserState>(defaultUserState);
