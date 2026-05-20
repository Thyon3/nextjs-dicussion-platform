import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CommunityNameSectionProps {
  error?: string;
  register?: UseFormRegisterReturn;
}

const CommunityNameSection: React.FC<CommunityNameSectionProps> = ({
  error,
  register,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[15px] font-bold text-foreground">Name</p>
      <p className="text-[11px] text-muted-foreground">
        Community names cannot be changed
      </p>
      <div className="relative mt-2">
        <input
          placeholder="Community Name"
          className={`w-full h-[40px] px-4 text-[14px] bg-muted border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
            error 
              ? "border-red-500" 
              : "border-border focus:border-[#FF5722] focus:bg-muted"
          }`}
          {...register}
        />
      </div>
      {error && (
        <p className="text-[9pt] text-red-500 font-bold">
          {error}
        </p>
      )}
    </div>
  );
};

export default CommunityNameSection;
