import React from "react";
import { HiArrowCircleUp } from "react-icons/hi";

type CommunityIconProps = {
  imageURL?: string;
};

const CommunityIcon: React.FC<CommunityIconProps> = ({ imageURL }) => {
  return imageURL ? (
    <img
      src={imageURL}
      className="w-[66px] h-[66px] rounded-full border-[3px] border-[#1A1D23] shadow-md object-cover bg-white"
      alt="Community icon"
    />
  ) : (
    <div className="w-[66px] h-[66px] rounded-full border-[3px] border-[#1A1D23] bg-white flex items-center justify-center shadow-md">
      <HiArrowCircleUp className="text-[60px] text-[#FF5722]" />
    </div>
  );
};

export default CommunityIcon;
