import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaReddit } from "react-icons/fa";
import { getFollowingPosts } from "@/src/features/posts/api/postApi";
import { Post } from "@/types/post";
import { useAuth } from "@/hooks/useAuth";
import moment from "moment";

const RecentPosts: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecent = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const posts = await getFollowingPosts();
        setRecentPosts(posts);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
  }, [user]);

  if (!user) {
    return (
      <div className="bg-card rounded-[16px] border border-border shadow-md p-6 text-center">
        <p className="text-[13px] text-muted-foreground italic">Log in to see recent posts from your communities</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-[16px] border border-border shadow-md overflow-hidden">
      <div className="font-reddit p-4 flex items-center justify-between border-b border-border">
        <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
          From your communities
        </span>
        <button 
          onClick={() => setRecentPosts([])}
          className="text-[12px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-col">
        {loading ? (
          <div className="p-10 flex justify-center">
            <div className="w-6 h-6 border-2 border-border border-t-[#FF5722] rounded-full animate-spin" />
          </div>
        ) : recentPosts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[12px] text-muted-foreground">No recent posts found from your communities</p>
          </div>
        ) : (
          recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/community/${post.communityId}/comments/${post.id}`}
              className="p-4 hover:bg-muted transition-all flex flex-col gap-1 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-2 mb-1">
                {post.communityImageURL ? (
                  <img src={post.communityImageURL} className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-foreground text-[8px] font-bold">
                    <FaReddit size={12} />
                  </div>
                )}
                <span className="font-reddit text-[12px] font-bold text-foreground">r/{post.communityId}</span>
                <span className="text-[12px] text-muted-foreground">• {moment(post.createTime).fromNow(true)}</span>
              </div>
              <h4 className="font-reddit text-[14px] font-medium text-foreground line-clamp-2 leading-tight">
                {post.title}
              </h4>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[11px] text-muted-foreground">{post.voteStatus || 0} upvotes</span>
                <span className="text-[11px] text-muted-foreground">{post.numberOfComments || 0} comments</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentPosts;
