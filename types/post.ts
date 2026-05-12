export type Post = {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorUsername: string;
  title: string;
  body?: string;
  postType?: 'text' | 'image' | 'video' | 'link';
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  videoURL?: string;
  linkURL?: string;
  communityImageURL?: string;
  createTime: Date | string;
};

/**
 * Represents a user's vote record on a post for syncing client and server state.
 * Lives under `users/{uid}/postVotes/{voteId}` to mirror aggregate voteStatus.
 */
export type PostVote = {
  id?: string;
  postId: string;
  communityId: string;
  voteValue: number;
};

