import React, { FC } from "react";
import type { IconType } from "react-icons";

type CommunityTypeOptionProps = {
  name: string;
  icon: IconType;
  label: string;
  description: string;
  isChecked: boolean;
  onChange: (value: string) => void;
};

const CommunityTypeOption: FC<CommunityTypeOptionProps> = ({
  name,
  icon: Icon,
  label,
  description,
  isChecked,
  onChange,
}) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-[12px] border cursor-pointer transition-all ${
        isChecked 
          ? "border-[#FF5722] bg-muted" 
          : "border-border hover:border-white/20 hover:bg-muted"
      }`}
      onClick={() => onChange(name)}
    >
      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
        isChecked ? "border-[#FF5722] bg-[#FF5722]" : "border-white/30"
      }`}>
        {isChecked && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
      
      <Icon className="text-[20px] text-muted-foreground" />
      
      <div className="flex flex-col flex-1">
        <span className="text-[14px] font-bold text-foreground leading-tight">
          {label}
        </span>
        <span className="text-[11px] text-muted-foreground">
          {description}
        </span>
      </div>
    </div>
  );
};

export default CommunityTypeOption;
