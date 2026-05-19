import React from "react";

type PostLoaderItemProps = {
  height: string;
};

const PostLoaderItem: React.FC<PostLoaderItemProps> = ({ height }) => {
  return (
    <div className="p-4 bg-card rounded-[12px] border border-border shadow-md flex flex-col gap-4 animate-pulse">
      <div className="h-4 bg-muted rounded-full w-[40%]" />
      <div className="space-y-3">
        <div className="h-3 bg-muted rounded-full w-full" />
        <div className="h-3 bg-muted rounded-full w-[90%]" />
        <div className="h-3 bg-muted rounded-full w-[95%]" />
        <div className="h-3 bg-muted rounded-full w-[80%]" />
      </div>
      <div 
        className="bg-muted rounded-[12px]" 
        style={{ height }}
      />
    </div>
  );
};

export default PostLoaderItem;
