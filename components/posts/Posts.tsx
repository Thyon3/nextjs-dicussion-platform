/* eslint-disable react-hooks/exhaustive-deps */
import { Community } from "@/types/community";
import useCommunityPermissions from "@/hooks/community/useCommunityPermissions";
import usePostState from "@/hooks/posts/usePostState";
import usePostSelection from "@/hooks/posts/usePostSelection";
import usePostVote from "@/hooks/posts/usePostVote";
import usePostDeletion from "@/hooks/posts/usePostDeletion";
import usePostVoteSync from "@/hooks/posts/usePostVoteSync";
import usePostsFeed from "@/hooks/posts/usePostsFeed";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import PostLoader from "../loaders/post-loader/PostLoader";
import PostItem from "./post-item/PostItem";

type PostsProps = {
  communityData?: Community;
  sort?: string;
};

const Posts: React.FC<PostsProps> = ({ communityData, sort }) => {
  const { user } = useAuth();
  const { postStateValue, setPostStateValue } = usePostState();
  const { onSelectPost } = usePostSelection(setPostStateValue);
  const { onVote } = usePostVote(postStateValue, setPostStateValue);
  const { onDeletePost } = usePostDeletion(setPostStateValue);
  usePostVoteSync(setPostStateValue);
  
  const { isAdmin, canPost } = useCommunityPermissions(
    communityData || ({} as Community)
  );

  const { loading, fetchPosts, ref, noMorePosts } = usePostsFeed({
    communityId: communityData?.id,
    sort,
  });

  useEffect(() => {
    fetchPosts();
  }, [communityData?.id, sort]);

  return (
    <div className="flex flex-col gap-4">
      {loading && postStateValue.posts.length === 0 ? (
        <PostLoader />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {postStateValue.posts.map((item) => (
              <PostItem
                key={item.id}
                post={item}
                userIsCreator={user?.id === item.creatorId}
                userIsAdmin={isAdmin}
                userVoteValue={
                  postStateValue.postVotes.find((vote) => vote.postId === item.id)
                    ?.voteValue
                }
                onVote={onVote}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                votingDisabled={!canPost}
              />
            ))}
          </div>
          {!noMorePosts ? (
            <div
              ref={ref}
              className="h-[20px] flex justify-center items-center"
            >
              {loading && (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              )}
            </div>
          ) : (
            <p className="text-center p-4 text-[10pt] text-gray-500">
              No more posts
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default Posts;
