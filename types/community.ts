export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Date | string;
  imageURL?: string;
  bannerURL?: string;
  name?: string;
  description?: string;
  adminIds?: string[];
}

/**
 * Lightweight user-scoped record that links a user to a community.
 * Stored under `users/{uid}/communitySnippets/{communityId}` for menus and permissions.
 */
export interface CommunitySnippet {
  communityId: string;
  isAdmin?: boolean;
  imageURL?: string;
}
