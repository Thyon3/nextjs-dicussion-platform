import React from "react";
import { Post } from "@/types/post";

type PostBodyProps = {
  post: Post;
  loadingImage: boolean;
  setLoadingImage: (value: React.SetStateAction<boolean>) => void;
};

const PostBody: React.FC<PostBodyProps> = ({
  post,
  loadingImage,
  setLoadingImage,
}) => {
  return (
    <>
      {post.body && (
        <p className="text-[11pt] text-gray-300 leading-relaxed mt-1">
          {post.body.split(" ").slice(0, 50).join(" ")}
          {post.body.split(" ").length > 50 && "..."}
        </p>
      )}
      {post.imageURL && (
        <div className="flex justify-center items-center mt-3 relative min-h-[100px]">
          {loadingImage && (
            <div className="absolute inset-0 bg-white/5 animate-pulse rounded-[12px]" />
          )}
          <img
            src={post.imageURL}
            alt="Post image"
            className={`max-h-[500px] max-w-full rounded-[12px] border border-white/10 ${
              loadingImage ? "invisible" : "visible"
            }`}
            onLoad={() => setLoadingImage(false)}
          />
        </div>
      )}
      {post.videoURL && (
        <div className="flex justify-center items-center mt-3">
          <video 
            src={post.videoURL} 
            controls 
            className="max-h-[500px] max-w-full rounded-[12px] border border-white/10"
          />
        </div>
      )}
      {post.linkURL && (
        <div className="mt-3 p-2 bg-white/5 rounded-md border border-white/10">
          <a 
            href={post.linkURL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#FF8A65] text-[10pt] font-semibold hover:underline"
          >
            {post.linkURL}
          </a>
        </div>
      )}
    </>
  );
};

export default PostBody;
