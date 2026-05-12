import Link from "next/link";
import React from "react";

const PageNotFound: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-400 mb-6">
        Sorry, this page does not exist!
      </h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <button className="w-[180px] h-[40px] bg-[#FF5722] text-white font-bold rounded-full hover:bg-[#E64A19] transition-all">
            Go Home
          </button>
        </Link>
        <Link href="/communities">
          <button className="w-[180px] h-[40px] border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all">
            All Communities
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
