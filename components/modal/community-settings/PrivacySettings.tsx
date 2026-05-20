import { Community } from "@/types/community";
import React from "react";
import { FiCheck } from "react-icons/fi";

type PrivacySettingsProps = {
  currentCommunity: Community | null;
  selectedPrivacyType: string;
  handlePrivacyTypeChange: (details: { value: string }) => void;
};

const PRIVACY_TYPES = [
  {
    value: "public",
    label: "Public",
    description: "Everyone can view and post",
  },
  {
    value: "restricted",
    label: "Restricted",
    description: "Everyone can view, only members can post",
  },
  {
    value: "private",
    label: "Private",
    description: "Only members can view and post",
  },
];

const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  currentCommunity,
  selectedPrivacyType,
  handlePrivacyTypeChange,
}) => {
  const currentType =
    selectedPrivacyType || currentCommunity?.privacyType || "public";

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[12pt] font-bold text-foreground">
        Community Type
      </h3>
      <div className="flex flex-col gap-3">
        {PRIVACY_TYPES.map((type) => {
          const isSelected = currentType === type.value;
          return (
            <div
              key={type.value}
              className={`p-4 rounded-[12px] border cursor-pointer transition-all ${
                isSelected 
                  ? "border-[#FF5722] bg-muted" 
                  : "border-border hover:border-white/30"
              }`}
              onClick={() => handlePrivacyTypeChange({ value: type.value })}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-foreground">
                    {type.label}
                  </span>
                  <span className="text-[12px] text-muted-foreground">
                    {type.description}
                  </span>
                </div>
                {isSelected && (
                  <FiCheck className="text-[#FF5722] text-xl" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrivacySettings;
