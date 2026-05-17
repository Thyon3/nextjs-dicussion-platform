export type PostType = 'text' | 'image' | 'video' | 'link';

export interface Post {
  id?: string;
  _id?: string;
  communityId: string;
  creatorId: string;
  creatorUsername: string;
  title: string;
  body?: string;
  postType: PostType;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  videoURL?: string;
  linkURL?: string;
  communityImageURL?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePostDTO {
  communityId: string;
  communityImageURL?: string;
  username: string;
  postData: {
    title: string;
    body?: string;
    postType: PostType;
    imageURL?: string;
    videoURL?: string;
    linkURL?: string;
  };
}

export interface TabItem {
  title: string;
  icon: any;
  type: PostType | 'poll';
}
