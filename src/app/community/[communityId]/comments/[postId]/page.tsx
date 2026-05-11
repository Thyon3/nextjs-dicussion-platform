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
import { Stack } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";

/**
 * Detailed view of a single post, including voting, full content, and eventually comments.
 * Fetches both post and community data to provide full context.
 * @returns The post detail view with community-specific sidebar.
 */
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
          posts: [post as Post], // Add to posts array so PostItem can find it if needed
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
      <Stack gap={5}>
        {postStateValue.selectedPost && (
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
        )}
        {/* TODO: Add Comments Component here */}
      </Stack>

      {/* Right Content */}
      <Stack gap={5}>
        {communityData && <About communityData={communityData} />}
      </Stack>
    </PageContent>
  );
};

export default PostPage;
