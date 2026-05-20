import React from "react";
import Link from "next/link";

const CommunityNotFound: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
      <h2 className="text-2xl font-bold text-muted-foreground">
        Sorry, this community does not exist!
      </h2>
      <div className="flex gap-4">
        <Link href="/">
          <button className="w-[150px] h-[36px] bg-[#FF5722] text-white font-bold rounded-full hover:bg-[#E64A19] transition-all">
            Home
          </button>
        </Link>
        <Link href="/communities">
          <button className="w-[150px] h-[36px] border border-white/30 text-foreground font-bold rounded-full hover:bg-muted transition-all">
            All Communities
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CommunityNotFound;
