import React from "react";
import { Community } from "@/types/community";
import Link from "next/link";
import { IoPeopleCircleOutline } from "react-icons/io5";

type RecommendationRowProps = {
  item: Community;
  index: number;
  isJoined: boolean;
  onJoinOrLeaveCommunity: (community: Community, isJoined: boolean) => void;
};

const RecommendationRow: React.FC<RecommendationRowProps> = ({
  item,
  index,
  isJoined,
  onJoinOrLeaveCommunity,
}) => {
  return (
    <Link key={item.id} href={`/community/${item.id}`}>
      <div className="flex items-center text-[10pt] p-2 px-4 hover:bg-white/5 transition-all cursor-pointer">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="font-bold text-gray-500 w-[14px]">
            {index + 1}
          </span>
          
          <div className="flex items-center min-w-0 gap-3">
            {item.imageURL ? (
              <img
                src={item.imageURL}
                className="rounded-full w-8 h-8 object-cover"
                alt="Community Icon"
              />
            ) : (
              <IoPeopleCircleOutline
                className="text-[24pt] text-[#FF5722]"
              />
            )}
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-white text-[10pt] overflow-hidden text-ellipsis whitespace-nowrap">
                {item.id}
              </span>
              <span className="text-[8pt] text-gray-500">
                {item.numberOfMembers || 0} members
              </span>
            </div>
          </div>
        </div>

        <button
          className={`h-[30px] text-[9pt] px-6 rounded-full font-bold transition-all ${
            isJoined 
            ? "bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50" 
            : "bg-white text-black hover:bg-gray-200"
          }`}
          onClick={(event) => {
            event.preventDefault();
            onJoinOrLeaveCommunity(item, isJoined);
          }}
        >
          {isJoined ? "Joined" : "Join"}
        </button>
      </div>
    </Link>
  );
};

export default RecommendationRow;
