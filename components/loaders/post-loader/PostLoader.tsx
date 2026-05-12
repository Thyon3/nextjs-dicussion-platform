import React from "react";
import PostLoaderItem from "./PostLoaderItem";

const PostLoader: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <PostLoaderItem height="250px" />
      <PostLoaderItem height="150px" />
      <PostLoaderItem height="300px" />
    </div>
  );
};

export default PostLoader;
