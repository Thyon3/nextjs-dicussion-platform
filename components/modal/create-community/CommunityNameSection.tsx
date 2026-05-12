import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CommunityNameSectionProps {
  charRemaining?: number;
  error?: string;
  register?: UseFormRegisterReturn;
}

const CommunityNameSection: React.FC<CommunityNameSectionProps> = ({
  charRemaining,
  error,
  register,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[15px] font-bold text-white">Name</p>
      <p className="text-[11px] text-gray-500">
        Community names cannot be changed
      </p>
      <div className="relative mt-2">
        <input
          placeholder="Community Name"
          className={`w-full h-[40px] px-4 text-[14px] bg-white/5 border rounded-full text-white placeholder:text-gray-500 focus:outline-none transition-all ${
            error 
              ? "border-red-500" 
              : "border-white/10 focus:border-[#FF5722] focus:bg-white/10"
          }`}
          {...register}
        />
      </div>
      <p
        className={`text-[9pt] pt-2 ${
          charRemaining === 0 ? "text-red-500" : "text-gray-500"
        }`}
      >
        {charRemaining} Characters remaining
      </p>
      {error && (
        <p className="text-[9pt] text-red-500 font-bold">
          {error}
        </p>
      )}
    </div>
  );
};

export default CommunityNameSection;
