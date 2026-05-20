import React from "react";
import { Community } from "@/types/community";
import { IoPeopleCircleOutline } from "react-icons/io5";

type CommunityItemNameIconSectionProps = {
  community: Community;
};

const CommunityItemNameIconSection: React.FC<
  CommunityItemNameIconSectionProps
> = ({ community }) => {
  return (
    <div className="flex items-center w-full gap-4">
      {community.imageURL ? (
        <img
          src={community.imageURL}
          className="rounded-full w-[35px] h-[35px] object-cover"
          alt="Community Icon"
        />
      ) : (
        <IoPeopleCircleOutline
          className="text-[38px] text-[#FF5722]"
        />
      )}
      <span className="text-[16px] font-bold text-foreground">
        {community.id}
      </span>
    </div>
  );
};

export default CommunityItemNameIconSection;
