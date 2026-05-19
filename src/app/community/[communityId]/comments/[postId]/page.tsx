'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageContent } from '@/components';
import PostItem from '@/components/posts/post-item/PostItem';
import { Post } from '@/src/features/posts/types';
import { getPostById, votePost, deletePost } from '@/src/features/posts/api/postApi';
import { getCommunityData } from '@/lib/api/community';
import { Community } from '@/types/community';
import About from '@/components/community/about/About';
import Recommendations from '@/components/community/recommendations/Recommendations';
import CommentSection from '@/src/features/comments/components/CommentSection';
import { useAuth } from '@/hooks/useAuth';
import useCommunityState from '@/hooks/community/useCommunityState';

const PostDetailPage: React.FC = () => {
  const { postId, communityId } = useParams() as { postId: string; communityId: string };
  const { user } = useAuth();
  const { communityStateValue } = useCommunityState();
  
  const [post, setPost] = useState<any>(null);
  const [communityData, setCommunityData] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postRes, communityRes] = await Promise.all([
          getPostById(postId),
          getCommunityData(communityId)
        ]) as [any, any];
        setPost(postRes);
        setCommunityData(communityRes);
      } catch (error) {
        console.error("Error fetching post detail data", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId && communityId) {
      fetchData();
    }
  }, [postId, communityId]);

  const onVote = async (event: React.MouseEvent, post: any, vote: number, communityId: string) => {
    // Re-use existing vote logic if possible or implement here
    // For now, let's just update local state if we want real-time feel
  };

  const onDeletePost = async (post: any) => {
    try {
      await deletePost(post.id!);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen pt-5 pb-10 px-4">
      <div className="flex w-full max-w-[1080px] gap-6">
        {/* ── Left: Post & Comments ──────────────────────── */}
        <div className="flex flex-col flex-1 min-w-0">
          {loading ? (
             <div className="bg-card rounded-[4px] p-10 flex justify-center">
               <div className="w-8 h-8 border-4 border-white/20 border-t-[#FF5722] rounded-full animate-spin" />
             </div>
          ) : post ? (
            <>
              <PostItem
                post={post}
                userIsCreator={user?.id === post.creatorId}
                onVote={onVote}
                onDeletePost={onDeletePost}
                userVoteValue={0}
              />
              
              <div className="p-4 lg:p-6 mt-4">
                 <CommentSection 
                   postId={post.id!} 
                   communityId={post.communityId} 
                   postTitle={post.title} 
                 />
              </div>
            </>
          ) : (
            <div className="text-foreground text-center py-20">Post not found</div>
          )}
        </div>

        {/* ── Right: Community Info Sidebar ────────────────── */}
        <div className="hidden lg:flex flex-col w-[312px] shrink-0 gap-5">
          {communityData && <About communityData={communityData} />}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
