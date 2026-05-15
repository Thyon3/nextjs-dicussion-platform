export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Date | string;
  parentId?: string;
  depth: number;
  creatorPhotoURL?: string;
};
