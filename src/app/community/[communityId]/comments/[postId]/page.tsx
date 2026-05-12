"use client";

import { About, PageContent, PostItem } from "@/components";
import usePostState from "@/hooks/posts/usePostState";
import usePostVote from "@/hooks/posts/usePostVote";
import usePostDeletion from "@/hooks/posts/usePostDeletion";
import { getPostById } from "@/lib/api/posts";
import { getCommunity } from "@/lib/api/community";
import { Community } from "@/types/community";
import { Post } from "@/types/post";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const PostPage: React.FC = () => {
  const { communityId, postId } = useParams();
  const { user } = useAuth();
  const { postStateValue, setPostStateValue } = usePostState();
  const [communityData, setCommunityData] = useState<Community | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { onVote } = usePostVote(postStateValue, setPostStateValue);
  const { onDeletePost } = usePostDeletion(setPostStateValue);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [post, community] = await Promise.all([
          getPostById(postId as string),
          getCommunity(communityId as string),
        ]);
        
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: post as Post,
          posts: [post as Post],
        }));
        setCommunityData(community);
      } catch (err) {
        console.error("Error fetching post data", err);
      } finally {
        setLoading(false);
      }
    };

    if (postId && communityId) {
      fetchData();
    }
  }, [postId, communityId, setPostStateValue]);

  return (
    <PageContent>
      {/* Left Content */}
      <div className="flex flex-col gap-5">
        {loading ? (
          <div className="animate-pulse flex flex-col gap-5">
            <div className="h-[200px] bg-white/5 rounded-[12px]" />
          </div>
        ) : postStateValue.selectedPost ? (
          <PostItem
            post={postStateValue.selectedPost}
            userIsCreator={user?.id === postStateValue.selectedPost.creatorId}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
                postStateValue.postVotes.find((vote) => vote.postId === postStateValue.selectedPost?.id)
                  ?.voteValue
              }
          />
        ) : null}
        {/* TODO: Add Comments Component here */}
      </div>

      {/* Right Content */}
      <div className="flex flex-col gap-5">
        {communityData && <About communityData={communityData} />}
      </div>
    </PageContent>
  );
};

export default PostPage;
