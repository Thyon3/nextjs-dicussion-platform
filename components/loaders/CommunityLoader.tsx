import React from "react";

const CommunityLoader: React.FC = () => (
  <div className="flex items-center justify-between p-5 bg-card border border-border rounded-[12px] shadow-md animate-pulse">
    <div className="w-14 h-14 bg-muted rounded-full mr-4" />
    <div className="h-2.5 bg-muted rounded-full w-full max-w-[80%]" />
  </div>
);

export default CommunityLoader;
