import React from "react";
import { Post } from "@/types/post";

type PostTitleProps = {
  post: Post;
};

const PostTitle: React.FC<PostTitleProps> = ({ post }) => {
  return (
    <h3 className="text-[14pt] font-bold text-white mb-2 leading-tight">
      {post.title}
    </h3>
  );
};

export default PostTitle;
