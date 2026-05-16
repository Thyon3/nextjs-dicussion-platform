"use client";

import { PageContent, PostItem, Recommendations, SidebarFooter } from "@/components";
import React, { useEffect, useState } from "react";
import { getSavedPosts } from "@/src/features/posts/api/postApi";
import { useAuth } from "@/hooks/useAuth";
import usePostState from "@/hooks/posts/usePostState";
import usePostSelection from "@/hooks/posts/usePostSelection";
import usePostVote from "@/hooks/posts/usePostVote";
import usePostDeletion from "@/hooks/posts/usePostDeletion";
import { BsBookmarkFill } from "react-icons/bs";

export default function SavedPostsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { postStateValue, setPostStateValue } = usePostState();
  const { onSelectPost } = usePostSelection(setPostStateValue);
  const { onVote } = usePostVote(postStateValue, setPostStateValue);
  const { onDeletePost } = usePostDeletion(setPostStateValue);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) {
         setLoading(false);
         return;
      }
      setLoading(true);
      try {
        const posts = await getSavedPosts(user.id);
        setPostStateValue(prev => ({ ...prev, posts }));
      } catch (err) {
        console.error("Failed to fetch saved posts", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [user, setPostStateValue]);

  return (
    <PageContent>
      {/* Center Content */}
      <div className="flex flex-col gap-5">
        <div className="p-5 bg-[#1A1D23] rounded-[16px] border border-white/10 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <BsBookmarkFill className="text-[#FF8A65] text-2xl" />
            <h2 className="font-reddit text-xl font-bold text-white">
              Saved Posts
            </h2>
          </div>
          
          {loading ? (
             <div className="flex justify-center p-10">
               <div className="w-8 h-8 border-4 border-white/20 border-t-[#FF5722] rounded-full animate-spin" />
             </div>
          ) : !user ? (
             <p className="font-reddit text-gray-500 text-center py-10">Please log in to see your saved posts.</p>
          ) : postStateValue.posts.length === 0 ? (
             <p className="font-reddit text-gray-500 text-center py-10">You haven&apos;t saved any posts yet.</p>
          ) : (
             <div className="flex flex-col gap-4">
               {postStateValue.posts.map((item) => (
                 <PostItem
                   key={item.id}
                   post={item}
                   userIsCreator={user?.id === item.creatorId}
                   userVoteValue={
                     postStateValue.postVotes.find((vote) => vote.postId === item.id)
                       ?.voteValue
                   }
                   onVote={onVote}
                   onSelectPost={onSelectPost}
                   onDeletePost={onDeletePost}
                 />
               ))}
             </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="flex flex-col gap-5">
        <Recommendations />
        <SidebarFooter />
      </div>
    </PageContent>
  );
}
