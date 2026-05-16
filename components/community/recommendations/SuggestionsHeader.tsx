import React from "react";
import { FaChartLine } from "react-icons/fa";

const SuggestionsHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 pb-2">
      <span className="font-reddit text-[8pt] font-bold text-gray-500 tracking-wider">
        TOP COMMUNITIES
      </span>
      <FaChartLine className="text-gray-500 text-[10pt]" />
    </div>
  );
};

export default SuggestionsHeader;
