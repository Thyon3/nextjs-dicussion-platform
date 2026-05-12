import React from "react";
import { FaLock } from "react-icons/fa";

type RestrictedCommunityBannerProps = {
  title?: string;
  description?: string;
};

const RestrictedCommunityBanner: React.FC<RestrictedCommunityBannerProps> = ({
  title = "This community is private",
  description = "Posts are only shown to subscribers.",
}) => {
  return (
    <div className="flex flex-col justify-center items-center p-10 bg-[#1A1D23] border border-white/10 rounded-[16px] shadow-md">
      <FaLock className="text-[50px] text-gray-600 mb-4" />
      <h3 className="text-lg font-bold text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-500 text-center">
        {description}
      </p>
    </div>
  );
};

export default RestrictedCommunityBanner;
