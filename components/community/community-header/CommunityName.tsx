import React from "react";

type CommunityNameProps = {
  id: string;
};

const CommunityName: React.FC<CommunityNameProps> = ({ id }) => {
  return (
    <div className="flex flex-col mr-6">
      <h1 className="font-extrabold text-[24px] text-white leading-tight">
        {id}
      </h1>
    </div>
  );
};

export default CommunityName;
