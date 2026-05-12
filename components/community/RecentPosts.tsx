import React from "react";
import Link from "next/link";
import { FaReddit } from "react-icons/fa";

const RecentPosts: React.FC = () => {
  // Sample data to match the visual style of the image
  const recentPosts = [
    {
      id: "1",
      title: "Monty Python and The Holy Grail",
      community: "r/movies",
      upvotes: "754",
      comments: "359",
      time: "9y ago",
      image: null
    },
    {
      id: "2",
      title: "Which one and why?",
      community: "r/Piracy",
      upvotes: "2.7k",
      comments: "310",
      time: "23h ago",
      image: null
    }
  ];

  return (
    <div className="bg-[#1A1D23] rounded-[16px] border border-white/10 shadow-md overflow-hidden
    ">
      <div className="p-4 flex items-center justify-between border-b border-white/5">
        <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">
          Recent Posts
        </span>
        <button className="text-[12px] font-bold text-blue-400 hover:text-blue-300 transition-colors">
          Clear
        </button>
      </div>

      <div className="flex flex-col">
        {recentPosts.map((post) => (
          <Link
            key={post.id}
            href={`/community/${post.community.substring(2)}/comments/${post.id}`}
            className="p-4 hover:bg-white/5 transition-all flex flex-col gap-1 border-b border-white/5 last:border-0"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">
                <FaReddit size={12} />
              </div>
              <span className="text-[12px] font-bold text-white">{post.community}</span>
              <span className="text-[12px] text-gray-500">• {post.time}</span>
            </div>
            <h4 className="text-[14px] font-medium text-white line-clamp-2 leading-tight">
              {post.title}
            </h4>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[11px] text-gray-500">{post.upvotes} upvotes</span>
              <span className="text-[11px] text-gray-500">{post.comments} comments</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
