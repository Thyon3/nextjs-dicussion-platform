import React from "react";

type PostLoaderItemProps = {
  height: string;
};

const PostLoaderItem: React.FC<PostLoaderItemProps> = ({ height }) => {
  return (
    <div className="p-4 bg-[#1A1D23] rounded-[12px] border border-white/10 shadow-md flex flex-col gap-4 animate-pulse">
      <div className="h-4 bg-white/5 rounded-full w-[40%]" />
      <div className="space-y-3">
        <div className="h-3 bg-white/5 rounded-full w-full" />
        <div className="h-3 bg-white/5 rounded-full w-[90%]" />
        <div className="h-3 bg-white/5 rounded-full w-[95%]" />
        <div className="h-3 bg-white/5 rounded-full w-[80%]" />
      </div>
      <div 
        className="bg-white/5 rounded-[12px]" 
        style={{ height }}
      />
    </div>
  );
};

export default PostLoaderItem;
