import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import useSavedPosts from '@/hooks/posts/useSavedPosts';
import { FaReddit } from 'react-icons/fa';
import { BsBookmarkFill } from 'react-icons/bs';

const SavedPostsWidget: React.FC = () => {
  const { user } = useAuth();
  const { savedPostState } = useSavedPosts();
  
  if (!user || savedPostState.savedPosts.length === 0) return null;

  // Show the 5 most recently saved posts
  const visiblePosts = [...savedPostState.savedPosts].reverse().slice(0, 5);

  return (
    <div className="bg-[#1A1D23] rounded-[16px] border border-white/10 shadow-md overflow-hidden">
      <div className="font-reddit p-4 flex items-center gap-2 border-b border-white/5">
        <BsBookmarkFill className="text-[#FF8A65]" />
        <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">
          Saved Posts
        </span>
      </div>
      
      <div className="flex flex-col">
        {visiblePosts.map((post) => (
          <Link
            key={post.postId}
            href={`/community/${post.communityId}/comments/${post.postId}`}
            className="p-4 hover:bg-white/5 transition-all flex flex-col gap-1 border-b border-white/5 last:border-0"
          >
            <div className="flex items-center gap-2 mb-1">
              {post.communityImageURL ? (
                <img src={post.communityImageURL} alt="" className="w-5 h-5 rounded-full object-cover" />
              ) : (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">
                  <FaReddit size={12} />
                </div>
              )}
              <span className="font-reddit text-[12px] font-bold text-white">r/{post.communityId}</span>
            </div>
            <h4 className="font-reddit text-[14px] font-medium text-white line-clamp-2 leading-tight">
              {post.postTitle}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SavedPostsWidget;
