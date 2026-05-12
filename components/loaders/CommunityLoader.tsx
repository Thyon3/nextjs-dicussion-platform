import React from "react";

const CommunityLoader: React.FC = () => (
  <div className="flex items-center justify-between p-5 bg-[#1A1D23] border border-white/10 rounded-[12px] shadow-md animate-pulse">
    <div className="w-14 h-14 bg-white/10 rounded-full mr-4" />
    <div className="h-2.5 bg-white/10 rounded-full w-full max-w-[80%]" />
  </div>
);

export default CommunityLoader;
