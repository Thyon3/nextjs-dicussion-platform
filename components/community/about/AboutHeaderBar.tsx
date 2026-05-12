import React from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";

interface AboutHeaderBarProps {
  communityName: string;
}

const AboutHeaderBar: React.FC<AboutHeaderBarProps> = ({ communityName }) => {
  return (
    <div className="flex justify-between items-center bg-[#FF5722] text-white p-3 rounded-t-[10px]">
      <span className="text-[10pt] font-bold">
        About {communityName}
      </span>
      <HiEllipsisHorizontal className="text-[14pt]" />
    </div>
  );
};

export default AboutHeaderBar;
