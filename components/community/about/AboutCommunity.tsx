import React from "react";
import { Community } from "@/types/community";
import moment from "moment";

interface AboutCommunityProps {
  communityData: Community;
}

const AboutCommunity: React.FC<AboutCommunityProps> = ({ communityData }) => {
  return (
    <div className="flex flex-col w-full p-2 text-[10pt] text-foreground">
      {communityData.description && (
        <p className="mb-4 text-[14px] leading-[1.5] text-gray-300">
          {communityData.description}
        </p>
      )}
      <div className="flex w-full">
        <div className="flex flex-col flex-grow">
          <span className="font-bold">Subscribers</span>
          <span className="text-muted-foreground">{communityData.numberOfMembers.toLocaleString()}</span>
        </div>
        <div className="flex flex-col flex-grow">
          <span className="font-bold">Created</span>
          <span className="text-muted-foreground">
            {communityData.createdAt &&
              moment(communityData.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutCommunity;
